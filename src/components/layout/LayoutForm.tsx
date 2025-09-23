import Image from 'next/image'
import React from 'react'
import bgLogin from '@/assets/images/bg-login.webp'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'

export default function LayoutForm({ children }: { children: React.ReactNode }) {
  return (
    <div className='size-full my-auto relative flex-center'>
      {/* MAIN FORM */}
      <div className='z-5 circle-bg'></div>
      <div className='size-full flex-center z-10'>
        {/* LEFT SIDE */}
        <div className='size-full bg-ct-blue-600 flex-center flex-col flex-1 z-10 mt-10 px-5'>
          {/* HEADER */}
          <header className="flex justify-center md:justify-start items-center top-0 z-50 w-full md:w-auto">
            <nav aria-label="Global" className="w-full py-4 px-4">
              <div className="w-full flex justify-center lg:justify-start items-center">
                <Link href="/" className='w-auto flex justify-center items-center'>
                  <Image
                    src={logo}
                    alt="Logo"
                    width={200}
                    height={200}
                    className="size-10 mx-2"
                  />
                  <span className='text-green-700 font-bold'>Sharetree</span>
                </Link>
              </div>
            </nav>
          </header>
          {children}
        </div>
        {/* RIGHT SIDE */}
        <div className='w-6/12 h-full flex-center max-md:hidden max-md:w-0'>
          <Image
            src={bgLogin}
            alt="Image"
            width={800}
            height={1000}
            className='w-full h-full object-cover max-md:hidden'
          />
        </div>
      </div>
    </div>
  )
}
