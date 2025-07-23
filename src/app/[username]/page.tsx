'use client'

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import logo from '/images/logo.png'
import { getUserLinks } from '@/lib/getuserlinks'
import { lazy, Suspense, useEffect, useState } from 'react'
import axios from 'axios'

const ListDeviceComponent = lazy(() => import('@/components/LinkComponent'))

interface Props {
    params: { username: string }
}

const UserForPublic = ({ params }: Props) => {
    const username = params.username
    const [linkUser, setLinkUser] = useState([])
    // const listLinks = await getUserLinks(username)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (username) {
                    const { data: response } = await axios.get(`/api/linkuser`, { params: { username: username } })
                    setLinkUser(response)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [username])

    if (!username) {
        notFound()
    }

    return (
        <div className='size-full overflow-auto bg-gray-700 flex justify-center items-center'>
            <div className='h-full w-[80%] md:w-[40%] mb-40 mt-12 flex flex-col justify-center items-center'>
                <div className='w-full relative flex flex-col justify-start items-center'>
                    <div className='text-white p-4 flex flex-col justify-center items-center'>
                        <div className='rounded-full bg-white w-20 h-20 flex justify-center items-center'>
                            <h1 className='text-black'>{username.charAt(0).toUpperCase()}</h1>
                        </div>
                        <h1 className='text-xl font-bold my-4'>{`@${username}`}</h1>
                    </div>
                    <Suspense fallback={<div className='w-full h-full flex justify-center items-center'><div className='loader'></div></div>}>
                        <ListDeviceComponent listLinks={linkUser} />
                    </Suspense>
                </div>

                {/* FOOTER */}
                <div className='w-full fixed flex justify-center items-center bottom-0 bg-gradient-to-t from-gray-950 to-transparent shadow-lg shadow-gray-500'>
                    <Link
                        href={'/'}
                        className='md:relative bottom-0 m-8 p-4 text-sm bg-white w-7/12 md:w-2/12 rounded-3xl -translate-y-12 flex justify-center items-center duration-150 ease-in-out animate-bounce'
                    >
                        <Image src={logo} alt='Logo' width={25} height={25} className='mx-2' />
                        Join on Sharetree
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserForPublic
