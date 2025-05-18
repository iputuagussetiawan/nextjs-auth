import React from 'react'
import {ExtendedSession} from '@/next-auth';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface UserInfoProps {
  user?:ExtendedSession;
  label:string;
}

const UserInfo = ({user,label}:UserInfoProps) => {
  return (
    <Card className='max-w-[600px] w-full shadow-md'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold text-center'>{label}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* {user?.user.name} */}
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>ID</p>
          <p className='truncate text-sx mwx-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user?.id}</p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>Name</p>
          <p className='truncate text-sx mwx-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user?.name}</p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>Email</p>
          <p className='truncate text-sx mwx-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user?.email}</p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>Role</p>
          <p className='truncate text-sx mwx-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>{user?.role}</p>
        </div>
          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>Two Factor Authentication</p>
        
            <Badge 
              variant={user?.isTwoFactorEnabled?"success":"destructive"}

            >{user?.isTwoFactorEnabled ? "ON" : "OFF"}</Badge>
          
        </div>
      </CardContent>
    </Card>
  )
}

export default UserInfo