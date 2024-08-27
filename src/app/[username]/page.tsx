'use client'

import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/logo.png'

const ListDeviceComponent = dynamic(() => import('@/components/LinkComponent'), { ssr: false })

type LinkType = {
    id: string,
    url: string,
    name: string
}

export default function CardUser() {
    const pathname = usePathname()
    const path = pathname.split('/')[1]
    const [pathLink, setPathLink] = useState(() => ({ username: path }))
    const [listLinks, setListLinks] = useState<LinkType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/listlinks`, { params: { username: pathLink.username } })
                setListLinks(response)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [pathLink.username])

    return (
        <div className='w-full h-screen overflow-hidden bg-black/70 flex justify-center items-center'>
            <div className='size-full flex flex-col justify-center items-center'>
                <div className='size-full overflow-auto pb-20 md:pb-0 shadow-xl shadow-gray-400 relative flex flex-col justify-start items-center'>
                    <div className='text-white p-4 flex justify-center items-center'>
                        <div className='rounded-full bg-white w-20 h-20 flex justify-center items-center'>
                            <h1 className='text-black'>{pathLink.username.split('')[0].toUpperCase()}</h1>
                        </div>
                    </div>
                    {listLinks?.map((value) => (
                        <ListDeviceComponent key={value.id} url={value.url} name={value.name} />
                    ))}
                    <Link
                        href={'/'}
                        className='fixed md:relative bottom-0 md:m-10 p-4 text-sm bg-white md:bg-white/70 hover:bg-white w-full md:w-1/3 md:rounded-3xl flex justify-center items-center duration-150 ease-in-out'
                    >
                        <Image
                            alt='Logo'
                            src={logo}
                            width={25}
                            height={25}
                            className='mx-2'
                        />
                        Join on Sharetree
                    </Link>
                </div>
            </div>
        </div>
    )
}
