import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
    <div className='h-screen relative overflow-y-auto overflow-x-hidden'>
      <Navbar />
      <div className="lg:size-full bg-blue-800 pt-[5rem]">
        <div className="sm:pt-24">
          <div className="relative mx-auto max-w-7xl w-full px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:w-full lg:max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-blue-100 sm:text-6xl">
                Everything what you want. All in one in simple link for bio
              </h1>
              <p className="mt-10 text-xl text-blue-100">
                Join people using Sharetree for their link in bio. One link to help you share everything you create and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
              </p>
              <Link
                href="/admin"
                className="inline-block rounded-md border border-transparent mt-10 bg-pink-300 px-8 py-3 text-center font-medium text-black hover:bg-pink-200"
              >
                Get Started for free
              </Link>
            </div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="lg:absolute relative mt-16 transform left-0 sm:top-0 translate-x-0 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center justify-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg lg:opacity-100">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
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
            </div>
          </div>
        </div>
      </div>
      <section>

      </section>
    </div>
  )
}
