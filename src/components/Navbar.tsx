'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import logo from '../../public/images/logo.png'
import Link from 'next/link'
import Image from 'next/image'

type StatusProps = {
  status: string,
  username: string
}

export default function Navbar({ status, username }: StatusProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white fixed w-[95%] left-0 translate-x-[2%] rounded-full mt-4 z-50">
      {/* Desktop Responsive */}
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:p-6 lg:px-8">
        <div className="flex lg:flex-1 justify-start items-center">
          <a href="#home" className="-m-1.5 p-1.5">
            <Image
              alt="Logo"
              width={200}
              height={200}
              src={logo}
              className="h-8 w-auto"
            />
          </a>
          <span className='ml-2 text-green-700 font-bold'>Sharetree</span>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {status === 'authenticated'
            ?
            (
              <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 bg-red-300 hover:bg-red-400 transition-all rounded-full px-5 py-3">
                Log Out <span aria-hidden="true">&rarr;</span>
              </Link>
            )
            :
            (
              <>
                <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 bg-blue-300 hover:bg-blue-400 transition-all rounded-full px-5 py-3">
                  Log In <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/register" className="text-sm font-semibold leading-6 text-gray-900 bg-green-300 hover:bg-green-400 transition-all rounded-2xl px-5 py-3">
                  Register
                </Link>
              </>
            )
          }
        </div>
      </nav>

      {/* Mobile Responsive */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-8/12 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#home" className="-m-1.5 p-1.5 flex justify-center items-center">
              <Image
                alt="Logo"
                width={200}
                height={200}
                src={logo}
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                {status === 'authenticated'
                  ?
                  (
                    <>
                      <h1>Hi, {username}</h1>
                      <Link
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Log Out
                      </Link>
                    </>
                  )
                  :
                  (
                    <>
                      <Link
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </Link>
                      <Link
                        href="/register"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Register
                      </Link>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
