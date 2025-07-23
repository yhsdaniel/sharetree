'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../../public/images/logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogIn, NotebookPen } from 'lucide-react'

type StatusProps = {
  status: string
}

export default function Navbar({ status }: StatusProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true })
      router.push('/login')
    } catch (error) {
      console.error("Error Signing out", error)
    }
  }

  return (
    <motion.header
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 1 }}
      transition={{ duration: .8 }}
      className="bg-white absolute top-0 w-full z-50"
    >
      {/* Desktop Responsive */}
      <nav aria-label="Global" className="mx-auto flex items-center justify-between p-4 lg:px-8">
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
              <Button onClick={handleSignOut} className="text-sm font-semibold leading-6 text-gray-900 bg-red-300 hover:bg-red-400 transition-all rounded-full px-5 py-3">
                Log Out <span aria-hidden="true">&rarr;</span>
              </Button>
            )
            :
            (
              <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 bg-blue-300 hover:bg-blue-400 transition-all rounded-full px-5 py-3">
                Sign In <span aria-hidden="true">&rarr;</span>
              </Link>
            )
          }
        </div>
      </nav>

      {/* Mobile Responsive */}
      <AnimatePresence initial={false}>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0" }}
            exit={{ x: '100%' }}
            transition={{ ease: 'linear', duration: 0.2 }}
            className="fixed inset-y-0 right-0 z-50 w-8/12 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 duration-150 ease-linear"
          >
            <header className="flex items-center justify-between">
              <div className="-m-1.5 p-1.5 flex justify-center items-center gap-2">
                <Image
                  alt="Logo"
                  width={200}
                  height={200}
                  src={logo}
                  className="h-8 w-auto"
                />
                <span className='text-green-700 font-bold'>Sharetree</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-gray-500 hover:text-black duration-150 ease-linear" />
              </button>
            </header>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <>
                    <Link
                      href="/login"
                      className="-mx-3 my-4 flex gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-green-200 duration-150 ease-linear"
                    >
                      <LogIn className='text-sm' />
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="-mx-3 my-4 flex gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-green-200 duration-150 ease-linear"
                    >
                      <NotebookPen className='text-sm' />
                      Register
                    </Link>
                  </>
                </div>
              </div>
            </div>
          </motion.div>
        </Dialog>
      </AnimatePresence>
    </motion.header>
  )
}
