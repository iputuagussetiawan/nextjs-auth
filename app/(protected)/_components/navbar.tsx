"use client"
import UserButton from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname()
  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-full max-w-[600px]  shadow-sm'>
      <div className='flex gap-x-2'>
        <Button 
          variant={pathname==='/server'?"default":"outline"}
          size={"sm"}
          asChild
        >
          <Link href='/server'>Server</Link>
        </Button>
        <Button 
          variant={pathname==='/client'?"default":"outline"}
          size={"sm"}
          asChild
        >
          <Link href='/client'>Client</Link>
        </Button>
        <Button 
          variant={pathname==='/admin'?"default":"outline"}
          size={"sm"}
          asChild
        >
          <Link href='/server'>Admin</Link>
        </Button>
        <Button 
          variant={pathname==='/settings'?"default":"outline"}
          size={"sm"}
          asChild
        >
          <Link href='/settings'>Setting</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  )
}

export default Navbar