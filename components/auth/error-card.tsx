import React from 'react'
import CardWrapper from './card-wrapper'
import { BsExclamationTriangle } from 'react-icons/bs'
const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Something went wrong'
      backButtonLabel='Back to Login'
      backButtonHref='/auth/login'
    >
      <div className='w-full flex justify-center items-center'>
        <BsExclamationTriangle className='w-20 h-20 text-destructive' />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard