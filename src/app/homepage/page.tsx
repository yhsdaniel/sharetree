'use client'

import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import social from '@/assets/images/social.png'
import social2 from '@/assets/images/social2.png'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function HomePage() {
  const { status } = useSession()

  return (
    <>
      <Navbar status={status} />

      {/* First Banner */}
      <div id='home' className="min-h-screen h-[calc(100%-(-5rem))] size-full animate-gradientx flex justify-center items-center">
        <div className="relative size-full mx-10 lg:mx-14 my-10 flex items-start justify-center flex-col md:flex-row">
          <div className="size-full md:w-1/2 text-left flex flex-col justify-center items-start">
            <motion.h1
              initial={{ opacity: 0, translateX: -100 }}
              animate={{ opacity: 1.2, translateX: 1 }}
              transition={{ duration: 1 }}
              className="my-0 text-4xl text-shadow-2xs text-shadow-sky-300 font-bold tracking-wide text-gray-800 uppercase">
              Everything what you want.
            </motion.h1>
            <motion.hr
              initial={{ opacity: 0, translateX: 100 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1.2, delay: .5 }}
              className='border-[1px] w-full my-4'></motion.hr>
            <motion.h1
              initial={{ opacity: 0, translateX: -100 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1.2, delay: .8 }}
              className="my-0 text-right text-4xl text-shadow-2xs text-shadow-sky-300 font-bold tracking-wide text-white uppercase">
              All in one in simple link for bio
            </motion.h1>
            <motion.hr
              initial={{ opacity: 0, translateX: 100 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1.2, delay: 1.3 }}
              className='border-[1px] w-full my-4'></motion.hr>
            <motion.p
              initial={{ opacity: 0, translateX: 100 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mt-4 lg:mt-10 text-sm lg:text-base font-bold text-yellow-200">
              Join people using Sharetree for their link in bio. One link to help you share everything you create and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              href='login'
              className="rounded-2xl mt-10 bg-pink-200 px-8 py-3 md:py-4 text-left text-xs lg:text-base text-black/80 font-bold hover:bg-pink-300 duration-150 ease-in-out"
            >
              Get Started for free
            </motion.a>
          </div>
          <div className="hidden h-full md:w-1/2 text-center md:flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, translateX: 100 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className='w-8/12'
            >
              <Image
                src={social}
                alt='Social Image 1'
                width={500}
                height={500}
                className='size-full'
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Second Banner */}
      <div id='features' className="animate-gradientx2 min-h-screen size-full animate-gradientx flex justify-center items-center">
        <div className="text-center mx-[5%] flex flex-col md:flex-row justify-evenly items-center">
          <div className='w-full text-left'>
            <motion.h1
              initial={{ opacity: 0, translateX: 100 }}
              whileInView={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1 }}
              className='text-3xl lg:text-4xl font-bold uppercase tracking-wide'>
              Create, Customize and Share your Sharetree in bio</motion.h1>
            <motion.hr
              initial={{ opacity: 0, translateX: 100 }}
              whileInView={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1, delay: .5 }}
              className='border-[1px] w-full my-4 border-b-blue-700'></motion.hr>
            <motion.h1
              initial={{ opacity: 0, translateX: -100 }}
              whileInView={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1, delay: .8 }}
              className='text-sm lg:text-base my-6 font-bold text-blue-700'>
              Connect your Instagram, Tiktok, Facebook, Blog, Website store and even more. It all come together in one simple link in your bio.</motion.h1>
            <motion.p
              initial={{ opacity: 0, translateX: 100 }}
              whileInView={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className='mt-10'
            >
              <Link
                href='/login'
                className="rounded-2xl bg-green-300 px-8 py-3 md:py-4 text-left text-xs md:text-base text-black/80 font-bold hover:bg-green-400 duration-150 ease-in-out"
              >
                Get Started for free
              </Link>
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, translateX: 100 }}
            whileInView={{ opacity: 1, translateX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className='hidden w-full md:flex justify-center items-center'>
            <Image
              src={social2}
              alt='Social Image 2'
              width={500}
              height={500}
              className='mix-blend-multiply'
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}