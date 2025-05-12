import React from 'react'
import { auth, signOut } from '@/auth'
const SettingPage = async() => {
    const session = await auth()
    return (
        <div>
            {JSON.stringify(session)}
            <form action={async()=>{
                "use server"
                await signOut()
            }}>
                <button className='cursor-pointer p-4 bg-primary text-white hover:bg-primary/90 transition-all' type="submit">Sign Out</button>
            </form>
        </div>
    )
}

export default SettingPage