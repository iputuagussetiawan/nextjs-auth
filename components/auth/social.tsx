"use client"

import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'
import { useSearchParams } from 'next/navigation'

const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl=searchParams.get('callbackUrl')
  const onClick=(provider:"google" | "github")=>{
    signIn(provider,{
      callbackUrl:callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <div className='grid grid-cols-2 gap-x-2 w-full'>
      <Button 
        size={"lg"} 
        className='w-full'
        variant={"outline"}
        onClick={() =>onClick("google")}
      >
        <FcGoogle className='h-5 w-5' />
        Google
      </Button>
      <Button 
        size={"lg"} 
        className='w-full'
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <FaGithub className='h-5 w-5' />
        Github
      </Button>
    </div>
  )
}

export default Social