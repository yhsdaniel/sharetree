'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if(status === 'authenticated'){
      router.push(`${session?.user.username}/admin`)
    }
  }, [status, session])
  
  return (
    <div className='h-screen relative overflow-y-auto overflow-x-hidden'>
      <Navbar />
      <div className="lg:size-full bg-blue-800 pt-[8rem]">
        <div className="sm:p-10">
          <div className="relative mx-auto w-full sm:static sm:px-6 lg:px-8 flex md:gap-x-12">
            <motion.div 
              initial={{ opacity: 0, translateX: -100}}
              animate={{ opacity: 1, translateX: 1}}
              transition={{ duration: .5}}
              className="sm:w-full lg:w-6/12 flex flex-col justify-start items-start"
            >
              <h1 className="text-4xl font-bold tracking-tight text-blue-100 sm:text-6xl">
                Everything what you want. All in one in simple link for bio
              </h1>
              <p className="mt-10 text-xl text-blue-100">
                Join people using Sharetree for their link in bio. One link to help you share everything you create and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
              </p>
              <Link
                href={`${session?.user.username}/admin`}
                className="inline-block rounded-md border border-transparent mt-10 bg-pink-300 px-8 py-3 text-center font-medium text-black hover:bg-pink-200"
              >
                Get Started for free
              </Link>
            </motion.div>
            
            {/* Image Grid */}
            <motion.div 
              initial={{ opacity: 0, translateX: 100}}
              animate={{ opacity: 1, translateX: 1}}
              transition={{ duration: .5}}
              className="md:mt-0 mt-10 md:w-6/12 flex flex-col justify-center items-center"
            >
              <div
                aria-hidden="true"
                className="w-9/12 pointer-events-none lg:mx-auto"
              >
                <div className="relative transform top-0">
                  <div className="flex items-center justify-center space-x-6 lg:space-x-4">
                    <div className="grid grid-cols-1 gap-y-2 lg:gap-y-3">
                      <div className="overflow-hidden rounded-lg lg:opacity-100">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-y-2 lg:gap-y-3">
                      <div className="overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-y-2 lg:gap-y-3">
                      <div className="overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <section>

      </section>
    </div>
  )
}
