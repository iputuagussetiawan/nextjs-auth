import {v4 as uuidv4} from 'uuid'
import { getVerificationTokenByEmail } from '@/data/verification-token'
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { db } from './db'
import crypto from "crypto"

export const generatePasswordResetToken =async (email: string) => {
    const token=uuidv4()
    const expires=new Date(new Date().getTime() + 3600 * 1000) // 1 hour from now

    const existingToken=await getPasswordResetTokenByEmail(email)
    if(existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        });
    }
    const passwordResetToken=await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return passwordResetToken
}
export const generateVerificationToken =async (email: string) => {
    const token=uuidv4()
    const expires=new Date(new Date().getTime() + 3600 * 1000) // 1 hour from now

    getVerificationTokenByEmail(email).then(async(existingToken) => {
        if (existingToken) {
            await db.verificationToken.delete({
                where: {
                    id: existingToken.id
                }
            });
        }
    });


    const verificationToken=await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
} 


export const generateTwoFactorToken=async(email:string)=>{
    const token=crypto.randomInt(100_000, 1_000_000).toString();

    //TODO - Letter change to 5 minutes
    const expires=new Date(new Date().getTime() + 5 * 60 * 1000) // 5 minute from now
    const existingToken=await getTwoFactorTokenByEmail(email)
    if(existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const twoFactorToken=await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return twoFactorToken
}