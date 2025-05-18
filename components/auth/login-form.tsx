'use client'
import * as z from 'zod'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'


const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl=searchParams.get('callbackUrl')
  const urlError=searchParams.get('error')==="OAuthAccountNotLinked" ? 'Email is already in use with different provider' : '';
  const [isPending, startTransition] = useTransition()
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")


  const form =useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit=(values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      login(values, callbackUrl)
      .then((data)=>{

          if(data?.error){
            form.reset()
            setError(data?.error)
          }
          if(data?.success){
            form.reset()
            setSuccess(data?.success)
          }
          if(data?.twoFactor){
            setShowTwoFactor(true)
          }
      })
      .catch((error) => {
        console.log(error)
        setError("something went wrong")
      })
    })
  }

  return (
    <CardWrapper 
      headerLabel='Welcome Back'
      backButtonLabel='Dont have an account?'
      backButtonHref='/auth/register'
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            {
              showTwoFactor &&(
                <>
                  <FormField
                    control={form.control}
                    name='code'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isPending}
                            type='text'
                            placeholder='123456' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )
            }
            {!showTwoFactor &&(
              <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          disabled={isPending}
                          type='email'
                          placeholder='johndoe@gmail.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          disabled={isPending}
                          type='password'
                          placeholder='******' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )
            }
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button 
            disabled={isPending}
            type='submit' 
            className='w-full'
          >
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
      <Button
        size={"sm"}
        variant={"link"}
        className='px-0 font-normal text-muted-foreground'
        asChild
      >
        <Link href='/auth/reset'>Forgot Password</Link>
      </Button>
    </CardWrapper>
  )
}

export default LoginForm