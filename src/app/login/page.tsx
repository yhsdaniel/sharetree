'use client'

import bgLogin from '../../../public/images/bg-login.webp'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Loginform = dynamic(() => import('./LoginForm'), { ssr: false })

export default function LoginPage() {
  return (
    <div className='w-auto h-full my-auto relative flex-center'>
      <div className='z-5 circle-bg'></div>
      <div className='size-full flex-center lg:gap-x-12 z-10'>
        <div className='bg-ct-blue-600 flex-center flex-col flex-1 z-10 mt-10 px-5 xl:px-[8rem]'>
          <Loginform />
        </div>
        <div className='w-6/12 h-full flex-center max-md:hidden max-md:w-0'>
          <Image
            src={bgLogin}
            alt="background-login"
            className='w-full h-full object-cover max-md:hidden'
            width={500}
            height={800}
            priority={true}
          />
        </div>
      </div>
    </div>
  )
}
