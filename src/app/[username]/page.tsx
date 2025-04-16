import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'

import logo from '/public/images/logo.png'
import { getUserLinks } from '@/lib/getuserlinks'
import { Suspense } from 'react'

const ListDeviceComponent = dynamic(() => import('@/components/LinkComponent'), { ssr: false })

interface Props {
    params: { username: string }
}

const UserForPublic = async ({ params }: Props) => {
    const username = params.username
    const listLinks = await getUserLinks(username)

    if (!username) {
        notFound()
    }

    return (
        <div className='size-full overflow-auto bg-blue-200 flex justify-center items-center'>
            <div className='w-full h-auto pb-40 flex flex-col justify-center items-center'>
                <div className='size-full pt-40 relative flex flex-col justify-start items-center'>
                    <div className='text-white p-4 flex flex-col justify-center items-center'>
                        <div className='rounded-full bg-white w-20 h-20 flex justify-center items-center'>
                            <h1 className='text-black'>{username.charAt(0).toUpperCase()}</h1>
                        </div>
                        <h1 className='text-xl font-bold my-4'>{`@${username}`}</h1>
                    </div>
                    <Suspense fallback={<div className='w-full h-full flex justify-center items-center'>Loading...</div>}>
                        <ListDeviceComponent listLinks={listLinks} />
                    </Suspense>
                </div>

                {/* FOOTER */}
                <div className='w-full fixed flex justify-center items-center bottom-0 bg-gradient-to-t from-gray-950 to-transparent shadow-lg shadow-gray-500'>
                    <Link
                        href={'/'}
                        className='md:relative bottom-0 m-8 p-4 text-sm bg-white w-7/12 md:w-2/12 rounded-3xl -translate-y-12 flex justify-center items-center duration-150 ease-in-out'
                    >
                        <Image alt='Logo' src={logo} width={25} height={25} className='mx-2' />
                        Join on Sharetree
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserForPublic
