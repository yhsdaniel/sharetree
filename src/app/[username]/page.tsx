'use client'

import LinkDeviceComponent from '@/components/LinkComponent'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
    const [listLinks, setListLinks] = useState<LinkType[][]>([])

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
            >
                <div className='size-full rounded-2xl overflow-hidden flex justify-center items-center'>
                    <div className='w-[18rem] h-[35rem] bg-black/60 shadow-2xl shadow-black px-4 rounded-3xl relative flex flex-col justify-start items-center'>
                        <div className='text-white'><h1>Sharetree</h1></div>
                        {listLinks[0]?.map((value, index) => (
                            <LinkDeviceComponent key={index} url={value.url} name={value.name}/>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
