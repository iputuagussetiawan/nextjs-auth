import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

export const { 
    auth, 
    handlers, 
    signIn, 
    signOut
} = NextAuth({
    pages:{
        signIn:"/auth/login",
        error:"/auth/error", //for error routing page
    },
    events:{
        async linkAccount({ user }) {
            await db.user.update({
                where:{id:user.id},
                data:{emailVerified:new Date()}
            })
        }
    },
    callbacks:{
        async signIn({ user, account }) {
            //allow OAuth without email verification
            if(account?.provider !=="credentials") return true

            //check if email is verified
            if (!user?.id) return false
            const existingUser=await getUserById(user.id)

            // console.log(existingUser)

            //prevent sign in if email is not verified
            if(!existingUser?.emailVerified)return false

            //TODO [SCRUM-4] :ADD 2FA CHECK
            if(existingUser.isTwoFactorEnabled){
                const twoFactorConfirmation=await getTwoFactorConfirmationByUserId(existingUser.id)
                console.log("twoFactorConfirmation", twoFactorConfirmation)
                if(!twoFactorConfirmation)return false

                await db.twoFactorConfirmation.delete({
                    where:{id:twoFactorConfirmation.id}
                })
            }

            return true
        },
        async session({token, session}){
            // console.log({
            //     SessionToken: token,
            // })
            if(token.sub && session.user){
                session.user.id=token.sub
            }

            // session.user.customField="custom value"

            if(token.role && session.user){
                session.user.role=token.role as UserRole
            }
            if(token.isTwoFactorEnabled && session.user){
                session.user.isTwoFactorEnabled=token.isTwoFactorEnabled as boolean
            }

            if(session.user){
                session.user.name=token.name as string
                session.user.email=token.email as string
                session.user.isOauth=token.isOAuth as boolean
            }

            // console.log(session)
            return session
        },
        async jwt({token}){
            // console.log("from Token",token)
            if(!token.sub){
                return token
            }

            const existingUser=await getUserById(token.sub)

            if(!existingUser){
                return token
            }

            const existingAccount=await getAccountByUserId(existingUser.id)
            token.isOAuth=!!existingAccount
            token.name=existingUser.name
            token.email=existingUser.email
            token.role=existingUser.role
            token.isTwoFactorEnabled=existingUser.isTwoFactorEnabled
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})