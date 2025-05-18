"use client"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { settings } from '@/actions/setting'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Settings2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useTransition, useState } from 'react'
import { SettingsSchema } from '@/schemas'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCurrentUser } from '@/hooks/use-current-user'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error' 
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserRole } from '@prisma/client'



const SettingPage = () => {
    // const update =useSession()
    const [error,setError]=useState<string | undefined>("") 
    const [success,setSuccess]=useState<string | undefined>("") 
    const [isPending, startTransition] = useTransition()  
    const user=useCurrentUser()
    // console.log(update)

    const form=useForm<z.infer<typeof SettingsSchema>>({
        resolver:zodResolver(SettingsSchema),
        defaultValues:{
            name:user?.name || undefined,
            email:user?.email || undefined,
            password:undefined,
            newPassword:undefined,
            role:user?.role || undefined,
            isTwoFactorEnabled:user?.isTwoFactorEnabled || undefined
        }
    })
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
            .then((data)=>{
                if(data.error){
                    setError(data.error)
                }

                if(data.success){
                    // update();
                    setSuccess(data.success)
                }
            })
            .catch(()=>{
                setError("something went wrong")
            })
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Jhon Doe" 
                                                {...field} 
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {user?.isOauth ===false && (      
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Email</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="jhondoe@gmail.com" 
                                                        type='email'
                                                        {...field} 
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Password</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="******" 
                                                        type='password'
                                                        {...field} 
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="******" 
                                                        type='password'
                                                        {...field} 
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                                <SelectItem value={UserRole.USER}>User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {user?.isOauth ===false && (  
                                <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                                            <div className="space-y-0.5">
                                                <FormLabel>Is Two Factor Enable?</FormLabel>
                                                <FormDescription>
                                                Enable two factor authentication
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )} 
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button
                            disabled={isPending}
                            type='submit'
                        >
                            {isPending ? (
                                <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                                </>
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SettingPage