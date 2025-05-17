"use client"
import { logout } from '@/actions/logout'
import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'
const SettingPage = () => {
    const user =useCurrentUser()
    const onClick=()=>{
        logout()
    }
    return (
        <div className='bg-white p-10 rounded-xl'> 
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