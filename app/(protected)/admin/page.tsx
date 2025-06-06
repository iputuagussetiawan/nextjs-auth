"use client"

import { admin } from '@/actions/admin';
import RoleGate from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

const AdminPage =  () => {
  const onAPIRouteClick = () => {
    fetch("/api/admin")
    .then((response) => {
      if(response.ok){
        toast.success("Allowed API Route")
      }else{
        toast.error("FORBIDDEN API Route")
      }
    })
  }

  const onServerActionClick = () => {
    admin().then((data) => {
      if(data.error){
        toast.error("FORBIDDEN API Route")
      }
      if(data.success){
        toast.success("Allowed API Route")
      }
    })
  }
  return (
    <Card className='max-w-[600px] w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold text-center'>Admin</CardTitle>
        <CardDescription>admin</CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are authorized to access this content" />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium text-muted-foreground'>Admin Only API Route</p>
          <Button 
            onClick={onAPIRouteClick}
            variant={"default"} 
            size={"sm"}
          >Get Data</Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium text-muted-foreground'>Admin Only Server Action</p>
          <Button 
            onClick={onServerActionClick}
            variant={"default"} 
            size={"sm"}
          >Get Data</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage