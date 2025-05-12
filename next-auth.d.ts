import { UserRole } from "@prisma/client"
import {type DefaultSession} from "next-auth"


export type ExtendedSession=DefaultSession["user"] &{
    id:string;
    // customField:string;
    role:UserRole;
}

declare module "next-auth"{
    interface Session{
        user:ExtendedSession
    }
}
