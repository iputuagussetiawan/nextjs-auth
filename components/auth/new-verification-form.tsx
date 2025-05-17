"use client";

import CardWrapper from './card-wrapper'
import {BeatLoader} from 'react-spinners'
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Form } from 'react-hook-form';

export const NewVerificationForm = () => {
  const [error,seError]=useState<string|undefined>()
  const [success,seSuccess]=useState<string|undefined>()
  const searchParams=useSearchParams()
  const token=searchParams.get('token')

  const onSubmit=useCallback(()=>{
    // console.log(token)

    if(success || error) return

    if(!token){
      seError("Missing Token");
      return
    }
    newVerification(token).then((data)=>{
      if(data.error){
        seError(data.error)
      }else if(data.success){
        seSuccess(data.success)
      }
    }).catch(()=>{
      seError("Something went wrong")
    })
  },[token, success, error])

  useEffect(()=>{
    onSubmit()
  },[onSubmit])
  return (
    <CardWrapper 
      headerLabel='New Verification' 
      backButtonLabel='Back to login' 
      backButtonHref='/auth/login' 
      showSocial={false} >
        <div className='flex-col items-center w-full justify-center text-center'>
          <BeatLoader className='m-4' color='#3b82f6' size={10} />
          <FormSuccess message={success} />
          {!success &&(
            <FormError message={error} />
          )}
        </div>
    </CardWrapper>
  )
};  