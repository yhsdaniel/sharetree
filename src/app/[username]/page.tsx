'use client'

import axios from 'axios'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import logo from '../../../public/images/logo.png'
import Link from 'next/link'
import Image from 'next/image'

const ListDeviceComponent = dynamic(() => import('@/components/LinkComponent'), { ssr: false })

type LinkType = {
    url: string,
    name: string
}

export default function CardUser() {
    const pathname = usePathname()
    const path = pathname.split('/')[1]
    const [pathLink, setPathLink] = useState(() => ({
        username: path
    }))
    const [listLinks, setListLinks] = useState<LinkType[]>([])

    useEffect(() => {
        const resp = async () => {
            try {
                const { data: response } = await axios.get(`/api/listlinks`, { params: { username: pathLink.username } })
                setListLinks(response)
            } catch (error) {
                console.error(error)
            }
        }

        resp()

    }, [pathLink.username])

    return (
        <div className='w-full h-screen fixed bg-blue-100 overflow-hidden flex justify-center items-center'>
            <motion.div
                initial={{ opacity: 0, translateX: 100 }}
                animate={{ opacity: 1, translateX: 1 }}
                transition={{ duration: .5 }}
                className='size-full'
            >
                <div className='size-full overflow-hidden flex justify-center items-center'>
                    <div className='w-[20rem] h-[90%] bg-black/70 shadow-xl shadow-gray-400 px-4 rounded-3xl relative flex flex-col justify-start items-center'>
                        <div className='text-white p-4 flex justify-center items-center'>
                            <div className='rounded-full bg-white w-20 h-20 flex justify-center items-center'>
                                <h1 className='text-black'>{pathLink.username.split('')[0].toUpperCase()}</h1>
                            </div>
                        </div>
                        {listLinks.map((value, index) => (
                            <ListDeviceComponent key={index} url={value.url} name={value.name} />
                        ))}
                        <Link 
                            href={'/'}
                            className='absolute bottom-0 m-4 p-3 text-sm bg-white/70 hover:bg-white w-11/12 rounded-3xl flex justify-center items-center duration-150 ease-in-out'
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
            </motion.div>
        </div>
    )
}
