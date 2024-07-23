'use client'

import bgLogin from '../../../public/images/bg-login.jpg'
import Image from 'next/image'
import RegisterForm from './RegisterForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RegisterPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if(status === 'authenticated'){
      router.push('/admin')
    }
  }, [status])
  return (
    <div className='w-auto h-full my-auto relative flex-center'>
      <div className='z-5 circle-bg'></div>
      <div className='size-full flex-center gap-12 z-10'>
        <div className='bg-ct-blue-600 flex-center flex-col flex-1 z-10 mt-10'>
          <RegisterForm />
        </div>
        <div className='w-6/12 h-full flex-center max-md:hidden max-md:w-0'>
          <Image src={bgLogin} alt="background-login" className='w-full h-full object-cover max-md:hidden' loading='lazy' />
        </div>
      </div>
    </div>
  )
}
