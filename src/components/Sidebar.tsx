'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '../../public/images/logo.png'
import Link from 'next/link'
import '@/app/navbar.css'
import toast from 'react-hot-toast'
import { Suspense } from 'react'


const Sidebar = () => {
    const { data: session } = useSession()
    const user = session?.user
    console.log(user?.image)
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
        // {
        //     url: `/admin/${username}/settings`,
        //     icon:
        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
        //             <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        //             <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        //         </svg>,
        //     title: 'Settings'
        // }
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
                    <Image
                        alt='Logo'
                        src={logo}
                        width={40}
                        height={40}
                        className='mx-4'
                    />
                    <ul className='flex justify-center items-center'>
                        <li className='w-full flex'>
                            <span className='h-12 w-full text-sm flex items-center px-4 py-3 mx-4 rounded-3xl bg-black/20'>
                                <img
                                    src={`${user?.image}`}
                                    alt='Profile Poc'
                                    referrerPolicy='no-referrer'
                                    loading='lazy'
                                    className='rounded-full w-9 mr-3'
                                />
                                {`${username}`}
                            </span>
                        </li>
                        <li className='flex flex-col justify-center items-center mx-4'>
                            <Button onClick={handleSignOut} className='flex flex-col focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 my-4 p-0 md:flex-none text-gray-700 bg-white hover:bg-gray-100 rounded-xl duration-300 ease- mx-4in-out text-start'>
                                <span className='h-12 w-full flex justify-start items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 mr-1'><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                                </span>
                            </Button>
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <div className='w-full flex'>
                            <span className='h-12 w-full flex items-center px-3 mx-4 rounded-3xl bg-black/20'>
                                <img
                                    src={`${user?.image}`}
                                    alt='Profile Poc'
                                    referrerPolicy='no-referrer'
                                    loading='lazy'
                                    className='rounded-full w-9 mr-3'
                                />
                                {`${username}`}
                            </span>
                        </div>
                    </Suspense>
                    <section className='w-full flex'>
                        <Button onClick={handleSignOut} className='flex focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 my-4 p-0 md:flex-none text-gray-700 bg-white hover:bg-gray-100 rounded-xl duration-300 ease-in-out text-start'>
                            <span className='h-12 w-full flex justify-start items-center px-3 mx-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-7 mr-3'><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                                <span>Sign out</span>
                            </span>
                        </Button>
                    </section>
                </div>
            </motion.nav>
        </>
    )
}

export default Sidebar