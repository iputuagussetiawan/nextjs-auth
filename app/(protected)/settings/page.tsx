"use client"
import { logout } from '@/actions/logout'
import { useSession } from 'next-auth/react'
import React from 'react'
const SettingPage = () => {
    const session =useSession()
    const onClick=()=>{
        logout()
    }
    return (
        <div>
            {JSON.stringify(session)}
            <button 
                onClick={onClick} 
                className='cursor-pointer p-4 bg-primary text-white hover:bg-primary/90 transition-all' 
                type="submit"
            >
                Sign Out
            </button>
        </div>
    )
}

export default SettingPage