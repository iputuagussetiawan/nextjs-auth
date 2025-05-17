"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
const SettingPage = () => {
    const session =useSession()
    return (
        <div>
            {JSON.stringify(session)}
            <form>
                <button className='cursor-pointer p-4 bg-primary text-white hover:bg-primary/90 transition-all' type="submit">Sign Out</button>
            </form>
        </div>
    )
}

export default SettingPage