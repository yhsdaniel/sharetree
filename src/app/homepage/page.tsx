'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Image from 'next/image'
import Tiktok from '../../../public/images/Tiktok.png'
import Instagram from '../../../public/images/Instagram.png'

import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const user = session?.user
  const username = (user && 'username' in user ? user?.username : undefined) || session?.user?.name

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/${username}/admin/links`)
    }
  }, [router, status, username])

  return (
    <div className='size-full relative overflow-y-auto overflow-x-hidden scroll-smooth'>
      <Navbar />
      <div id='home' className="sm:p-10 min-h-screen bg-green-800 flex justify-center items-center md:pt-[6rem] xl:pt-[8rem]">
        <motion.div
          initial={{ opacity: 0, translateX: -100 }}
          animate={{ opacity: 1, translateX: 1 }}
          transition={{ duration: .5 }}
          className='absolute w-[7rem] h-[7rem] lg:w-[300px] lg:h-[300px] top-24 lg:top-32 left-0 mix-blend-screen animate-bounce'
        >
          <Image
            src={Tiktok}
            alt='Tiktok Logo'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 1 }}
          transition={{ duration: .5 }}
          className='absolute w-[8rem] h-[8rem] lg:w-[300px] lg:h-[300px] bottom-10 lg:bottom-32 -right-8 mix-blend-screen animate-bounce'
        >
          <Image
            src={Instagram}
            alt='Instagram Logo'
          />
        </motion.div>
        <div className="relative mx-auto size-full sm:static px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
          <motion.div
            initial={{ opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, translateY: 1 }}
            transition={{ duration: .5 }}
            className="text-center flex flex-col justify-center items-center md:mx-32 lg:mx-56 xl:mx-72"
          >
            <h1 className="text-4xl font-bold tracking-tight text-yellow-100 sm:text-6xl">
              Everything what you want. All in one in simple link for bio
            </h1>
            <p className="mt-4 lg:mt-10 text-md lg:text-xl text-yellow-100">
              Join people using Sharetree for their link in bio. One link to help you share everything you create and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </p>
            <Link
              href={`${username}/admin/links`}
              className="inline-block rounded-3xl border border-transparent mt-10 bg-blue-300 px-8 py-3 text-center font-medium text-black hover:bg-blue-400 duration-150 ease-in-out"
            >
              Get Started for free
            </Link>
          </motion.div>
        </div>
      </div>
      <div id='features' className="sm:p-10 min-h-screen bg-pink-200 flex justify-center items-center md:pt-[6rem] xl:pt-[8rem]">
        <div className="relative mx-auto sm:static px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
          <motion.div
            initial={{ opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, translateY: 1 }}
            transition={{ duration: .5 }}
            className="text-center flex flex-col md:flex-row justify-center items-center text-purple-800"
          >
            <div className='md:w-6/12 w-full text-left'>
              <h1 className='text-4xl sm:text-5xl'>Create, Customize and Share your Sharetree in bio</h1>
              <p className='text-md lg:text-xl'>Connect your Instagram, Tiktok, Facebook, Blog, Website store and even more. It all come together in one simple link in your bio.</p>
              <Link
                href={`${username}/admin/links`}
                className="inline-block rounded-3xl border border-transparent mt-10 bg-purple-800 px-8 py-3 text-center font-medium text-white hover:bg-purple-700 duration-150 ease-in-out"
              >
                Get Started for free
              </Link>
            </div>
            <div className='w-6/12 mt-8 flex justify-center items-center'>
              <video controls={false} autoPlay muted loop playsInline width={250} height={'100%'} className='rounded-3xl md:w-[50%] lg:w-[40%] aspect-auto'>
                <source src='/videos/social.mp4' type='video/mp4' />
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
