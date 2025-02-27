'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import axios from 'axios'

type LinkType = {
    id: string,
    url: string,
    name: string
}

const LinkDeviceComponent = React.memo(() => {
    const { data: session } = useSession()
    const pathName = usePathname()
    const user = session?.user
    const username = (user && 'username' in user ? user?.username : undefined) || user?.name

    const [listLinks, setListLinks] = useState<LinkType[]>([])

    useEffect(() => {
        if(!username) return

        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/linkuser`, { params: { username } })
                setListLinks(response)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [username])

    return (
        <>
            {listLinks?.map((value, index) => (
                <Link key={index} href={value.url} className={pathName === `/admin/${username}/links` || pathName === `/admin/${username}/settings`
                    ? 'w-full border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-4 flex justify-center'
                    : 'w-10/12 md:w-1/2 border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-4 flex justify-center'
                }>
                    <span className='text-sm'>{value.name}</span>
                </Link>
            ))}
        </>
    )
})

LinkDeviceComponent.displayName = 'LinkDeviceComponent'

export default LinkDeviceComponent