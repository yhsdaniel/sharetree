'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/compat/router'
import { motion } from 'framer-motion'

type ListLinksProps = {
    url: string,
    name: string,
}

const LinkDeviceComponent = ({ listLinks }: { listLinks: ListLinksProps[] }) => {
    const router = useRouter()
    const isAdminRoute = router?.asPath.startsWith('/admin')

    return (
        <>
            {listLinks?.map((value, index) => (
                <Link key={index} href={value.url} className={isAdminRoute
                    ? 'w-full border border-gray-300 bg-white shadow-lg rounded-xl my-3 p-4 flex justify-center'
                    : 'w-full border border-gray-300 bg-white rounded-xl my-2 p-5 flex justify-center hover:scale-[1.02] hover:shadow-lg duration-200 ease-in-out'
                }>
                    <span className={isAdminRoute ? 'text-sm text-gray-500 font-bold' : 'text-lg text-gray-500 font-bold'}>{value.name}</span>
                </Link>
            ))}
        </>
    )
}

export default LinkDeviceComponent