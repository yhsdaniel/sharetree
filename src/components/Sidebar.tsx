'use client'

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '../../public/images/logo.png'
import Link from 'next/link'
import '@/app/navbar.css'

const Sidebar = React.memo(() => {
    const [showSession, setShowSession] = useState('')
    const { data: session } = useSession()
    const router = useRouter()
    const pathName = usePathname()
    const user = session?.user
    const username = (user && 'username' in user ? user?.username : undefined) || session?.user?.name

    useEffect(() => {
        if (session && username) {
            setShowSession(username as string)
        } else {
            setShowSession('')
        }
    }, [router, session, username])

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false })
            router.refresh()
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
                    <Image
                        alt='Logo'
                        src={logo}
                        width={50}
                        height={50}
                        className='mx-4'
                    />
                    <ul className='flex'>
                        <li className='flex flex-col justify-center items-center mx-4'>
                            <Button onClick={handleSignOut} className='flex flex-col focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 my-4 p-0 md:flex-none text-gray-700 bg-white hover:bg-gray-100 rounded-xl duration-300 ease- mx-4in-out text-start'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                                </svg>
                                <span>Log out</span>
                            </Button>
                        </li>
                    </ul>
                </div>
                <ul className='size-full flex justify-center items-center'>
                    <li className='flex flex-col justify-center items-center p-2 mx-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                        <span className='text-sm'>Links</span>
                    </li>
                    <li className='flex flex-col justify-center items-center p-2 mx-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <span className='text-sm'>Settings</span>
                    </li>
                </ul>
            </nav>


            {/* DESKTOP version */}
            <nav className='size-full bg-transparent hidden md:block md:p-2 shadow-lg h-full w-full md:max-w-xs md:fixed md:left-0 top-0' aria-label='desktop navigation' tabIndex={-1} data-testid="ReactNavigation">
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
                            <li className='relative my-4'>
                                <Link href={`/${username}/admin/links`} className={pathName === `/${username}/admin/links` ? 'active' : 'flex focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 md:flex-none my-4 duration-200 ease-in-out rounded-xl text-start justify-start hover:bg-gray-100'}>
                                    <span className='h-12 w-full flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                        </svg>
                                        <span>Links</span>
                                    </span>
                                </Link>
                            </li>
                            <li className='relative my-4'>
                                <Link href={`/${username}/admin/settings`} className={pathName === `/${username}/admin/settings` ? 'active' : 'flex focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 md:flex-none duration-200 ease-in-out rounded-xl text-start justify-start hover:bg-gray-100'}>    
                                    <span className='h-12 w-full flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <span>Settings</span>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <div className='w-full flex'>
                        <span className='h-12 w-full flex items-center px-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            {showSession}
                        </span>
                    </div>
                    <section className='w-full flex'>
                        <Button onClick={handleSignOut} className='flex focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 my-4 p-0 md:flex-none text-gray-700 bg-white hover:bg-gray-100 rounded-xl duration-300 ease-in-out text-start'>
                            <span className='h-12 w-full flex items-center px-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                                </svg>
                                <span>Log out</span>
                            </span>
                        </Button>
                    </section>
                </div>
            </nav>
        </>
    )
})

export default Sidebar