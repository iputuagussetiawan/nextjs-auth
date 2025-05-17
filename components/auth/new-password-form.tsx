'use client'
import * as z from 'zod'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewPasswordSchema} from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/actions/new-password'


const NewPasswordForm = () => {

  const searchParams = useSearchParams()
  const token = searchParams.get('token')




  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")


  const form =useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    }
  })

  if(token === null) return;

  const onSubmit=(values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")

    console.log(values)
    startTransition(() => {
      newPassword(values, token)
      .then((data)=>{
          setError(data?.error)
          setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper 
      headerLabel='Enter New Password'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isPending}
                      type='password'
                      placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
            disabled={isPending}
            type='submit' 
            className='w-full'
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default NewPasswordForm