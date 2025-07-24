'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'
import '@/app/navbar.css'
import toast from 'react-hot-toast'
import { DropdownMenuComponent } from './DropdownMenu'


const Sidebar = () => {
    const { data: session } = useSession()
    const user = session?.user
    const username = (user && 'username' in user ? user?.username : undefined) || session?.user?.name
    const router = useRouter()
    const pathName = usePathname()

    const items = [
        {
            url: `/admin/${username}/links`,
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>,
            title: 'Links'
        },
    ]

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false })
            toast.success('Log Out successfully')
            router.push('/login')
        } catch (error) {
            console.error("Error Signing out", error)
        }
    }

    return (
        <>
            {/* MOBILE version */}
            <nav className='w-full bg-white border-b h-auto md:hidden'>
                <div className='flex justify-between items-center'>
                    <div className='flex justify-center items-center'>
                        <Image
                            src={logo}
                            alt='Logo'
                            width={40}
                            height={40}
                            className='mx-4'
                        />
                        <span className='text-green-700 font-bold'>Sharetree</span>

                    </div>
                    <ul className='flex justify-center items-center'>
                        <li className='w-full flex'>
                            <DropdownMenuComponent
                                username={username}
                                image={user?.image}
                                signout={handleSignOut}
                            />
                        </li>
                    </ul>
                </div>
                <ul className='size-full flex justify-center items-center'>
                    {items.map((item, index) => (
                        <li key={index} className={pathName === item.url ? 'active-mobile' : 'relative flex flex-col justify-center items-center p-2 mx-2'}>
                            <Link href={item.url}>
                                <span className='h-12 w-full flex items-center'>
                                    {item.icon}
                                    <span className='text-sm mx-1'>{item.title}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>


            {/* DESKTOP version */}
            <motion.nav
                initial={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 1 }}
                transition={{ duration: 1 }}
                className='size-full bg-transparent hidden md:block md:p-2 shadow-lg h-full w-full md:max-w-xs md:fixed md:left-0 top-0' aria-label='desktop navigation' tabIndex={-1} data-testid="ReactNavigation">
                <div className='flex flex-col size-full bg-white md:rounded-3xl'>
                    <section className='w-full flex justify-start items-center p-4'>
                        <Link href="#home" className="-m-1.5 p-1.5">
                            <Image
                                alt="Logo"
                                width={200}
                                height={200}
                                src={logo}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <span className='ml-2 text-2xl text-green-700 font-bold'>Sharetree</span>
                    </section>
                    <section className='w-full flex flex-col flex-auto h-0 my-3'>
                        <ul className='w-full'>
                            {items.map((item, index) => (
                                <li key={index} className='relative my-4'>
                                    <Link href={item.url} className={pathName === item.url ? 'active' : 'flex focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 md:flex-none duration-200 ease-in-out rounded-xl text-start justify-start hover:bg-gray-100'}>
                                        <span className='h-12 w-full flex items-center'>
                                            {item.icon}
                                            <span className='text-sm'>{item.title}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <div className='w-full flex'>
                        <DropdownMenuComponent
                            username={username}
                            image={user?.image}
                            signout={handleSignOut}
                        />
                    </div>
                </div>
            </motion.nav>
        </>
    )
}

export default Sidebar