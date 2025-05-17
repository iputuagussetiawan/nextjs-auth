"use client"


import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { FaUser } from 'react-icons/fa'
import { useCurrentUser } from '@/hooks/use-current-user'
import LogoutButton from './logout-button'
import { LogOutIcon } from 'lucide-react'

const UserButton = () => {
  const user=useCurrentUser()
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
            <AvatarFallback className='bg-sky-500'>
              <FaUser className='text-white' />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-40' align='end'>
          <LogoutButton>
            <DropdownMenuItem>
              <LogOutIcon className='mr-2 h-4 w-4' />
              Logout
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserButton