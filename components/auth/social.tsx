"use client"

import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'

const Social = () => {
  return (
    <div className='grid grid-cols-2 gap-x-2 w-full'>
      <Button 
        size={"lg"} 
        className='w-full'
        variant={"outline"}
        onClick={() => {}}
      >
        <FcGoogle className='h-5 w-5' />
        Google
      </Button>
      <Button 
        size={"lg"} 
        className='w-full'
        variant={"outline"}
        onClick={() => {}}
      >
        <FaGithub className='h-5 w-5' />
        Github
      </Button>
    </div>
  )
}

export default Social