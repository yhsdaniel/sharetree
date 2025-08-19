'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogIn, LogOut, User } from 'lucide-react'
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from './ui/sidebar'
import { DropdownMenuComponent } from './DropdownMenu'

type StatusProps = {
  status: string
}

export default function Navbar({ status }: StatusProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true })
      router.push('/login')
    } catch (error) {
      console.error("Error Signing out", error)
    }
  }

  return (
    <header className="sticky lg:fixed flex justify-between top-0 w-full z-50">
      {/* Desktop Responsive */}
      <nav aria-label="Global" className="w-full mx-0 md:mx-8 mt-0 md:mt-8 bg-white rounded-none md:rounded-[50px] flex items-center justify-between px-3 py-2 lg:p-5 lg:px-8">
        <div className="w-2/5 lg:w-1/2 flex justify-center lg:justify-start items-center gap-2">
          <a href="#home" className='w-auto flex justify-center items-center'>
            <Image  
              src={logo}
              alt="Logo"
              width={200}
              height={200}
              className="size-10"
            />
          </a>
          <span className='text-green-700 font-bold'>Sharetree</span>
        </div>
        {/* <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div> */}
        <div className='flex lg:hidden'>
          {status === 'authenticated'
            ?
            <AnimatePresence>
              <SidebarFooter className='py-0'>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <DropdownMenuComponent
                      username={session?.user?.username}
                      image={session?.user?.image}
                      signout={handleSignOut}
                    />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </AnimatePresence>
            :
            <Link href="/login" className="text-xs font-semibold leading-6 text-gray-900 bg-blue-300 hover:bg-blue-400 transition-all rounded-full px-4 py-2 my-2">
              Sign In <span aria-hidden="true">&rarr;</span>
            </Link>
          }
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {status === 'authenticated'
            ?
            (
              <>
                <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 bg-blue-300 hover:bg-blue-400 transition-all rounded-full px-5 py-3 flex gap-1">
                  Admin <User />
                </Link>
                <Button onClick={handleSignOut} className="text-sm font-semibold leading-6 text-gray-900 bg-red-300 hover:bg-red-400 opacity-80 hover:opacity-100 transition-all rounded-full px-5 py-3 flex gap-1">
                  Log Out <LogOut className='w-4' />
                </Button>
              </>
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
    </header>
  )
}
