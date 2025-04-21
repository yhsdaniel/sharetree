import bgLogin from '../../../public/images/bg-login.webp'
import Image from 'next/image'
import RegisterForm from './RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className='w-auto h-full my-auto relative flex-center'>
      <div className='z-5 circle-bg'></div>
      <div className='size-full flex-center gap-12 z-10'>
        <div className='bg-ct-blue-600 flex-center flex-col flex-1 z-10 mt-10'>
          <RegisterForm />
          <div className='mt-5 text-sm'>
            <span>Already have an account? <Link href='/login' className='text-blue-600 hover:text-blue-800 transition-all'>Login</Link></span>
          </div>
        </div>
        <div className='w-6/12 h-full flex-center max-md:hidden max-md:w-0'>
          <Image
            src={bgLogin}
            alt="background-login"
            className='w-full h-full object-cover max-md:hidden'
            priority={true}
          />
        </div>
      </div>
    </div>
  )
}
