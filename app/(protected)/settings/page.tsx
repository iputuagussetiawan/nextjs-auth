"use client"

import { settings } from '@/actions/setting'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useTransition } from 'react'
const SettingPage = () => {
    const {update}=useSession()
    const [isPending, startTransition] = useTransition()  
    const onClick = () => {
        startTransition(() => {
            settings({
                name:"New Name!"
            })
            .then(()=>update())
        })
    }    
    return (
        <Card className='max-w-[600px] w-full'>
            <CardHeader>
                <CardTitle className='text-2xl font-semibold'>
                    <span className='flex items-center'>
                        <Settings2 className='mr-2'/> Settings
                    </span>
                </CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <Button
                    disabled={isPending}
                    onClick={onClick} 
                    className='w-full'
                >Change Password</Button>
            </CardContent>
        </Card>
    )
}

export default SettingPage