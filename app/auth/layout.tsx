import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-full flex items-center justify-center bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600'>{children}</div>
  )
}

export default AuthLayout