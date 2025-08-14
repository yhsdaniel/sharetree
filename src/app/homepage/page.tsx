'use client'

import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import social from '@/assets/images/social.jpg'
import Tiktok from '@/assets/images/Tiktok.png'
import Instagram from '@/assets/images/Instagram.png'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const { data: session, status } = useSession()

  return (
    <div className='size-full relative overflow-y-auto overflow-x-hidden scroll-smooth'>
      <Navbar status={status} />

      {/* First Banner */}
      <div id='home' className="sm:p-10 min-h-screen animate-gradientx flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, translateX: -100 }}
          animate={{ opacity: 1, translateX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className='absolute w-36 lg:w-[300px] top-24 lg:top-32 left-0 mix-blend-screen'
        >
          <Image
            src={Tiktok}
            alt='Tiktok Logo'
            width={200}
            height={200}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='absolute w-36 lg:w-[300px] bottom-10 lg:bottom-32 -right-8 mix-blend-screen'
        >
          <Image
            src={Instagram}
            alt='Instagram Logo'
            width={200}
            height={200}
          />
        </motion.div>
        <div className="relative mx-auto size-full sm:static px-4 flex flex-col lg:flex-row">
          <div className="text-center flex flex-col justify-center items-center md:mx-32 lg:mx-56 xl:mx-72">
            <motion.h1
              initial={{ opacity: 0, translateX: -100 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1 }}
              className="my-0 text-2xl md:text-6xl text-shadow-2xs text-shadow-sky-300 font-bold tracking-tight text-white uppercase">
              Everything what you want. 
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, translateX: -100 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1 }}
              className="my-0 text-2xl md:text-6xl text-shadow-2xs text-shadow-sky-300 font-bold tracking-tight text-white uppercase">
              All in one in simple link for bio
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, translateX: 100 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1 }}
              className="mt-4 lg:mt-10 text-xs md:text-xl font-bold text-yellow-200">
              Join people using Sharetree for their link in bio. One link to help you share everything you create and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 1 }}
              transition={{ duration: 1 }}
              href='login'
              className="rounded-2xl mt-10 bg-pink-200 px-8 py-3 md:py-4 text-center text-xs md:text-base text-black/80 font-bold hover:bg-pink-300 duration-150 ease-in-out"
            >
              Get Started for free
            </motion.a>
          </div>
        </div>
      </div>

      {/* Second Banner */}
      {/* <div id='features' className="sm:p-10 bg-[#fafafc] min-h-screen flex justify-center items-center md:pt-[6rem] xl:pt-[8rem]">
        <div className="container">
          <div
            className="text-center flex flex-col md:flex-row justify-evenly items-center text-purple-800"
          >
            <motion.div
              initial={{ opacity: 0, translateX: -100 }}
              whileInView={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1 }}
              className='w-full text-left'
            >
              <h1 className='text-4xl sm:text-5xl'>Create, Customize and Share your Sharetree in bio</h1>
              <p className='text-md lg:text-xl'>Connect your Instagram, Tiktok, Facebook, Blog, Website store and even more. It all come together in one simple link in your bio.</p>
              <Link
                href='/login'
                className="inline-block rounded-3xl border border-transparent mt-10 bg-purple-800 px-8 py-3 text-center font-medium text-white hover:bg-purple-700 duration-150 ease-in-out"
              >
                Get Started for free
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateX: 100 }}
              whileInView={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1 }}
              className='w-full flex justify-center items-center'>
              <Image
                src={social}
                alt='Social Media Icons'
                width={200}
                height={200}
              />
            </motion.div>
          </div>
        </div>
      </div> */}
    </div>
  )
}