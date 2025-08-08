'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/compat/router'

type ListLinksProps = {
    url: string,
    name: string,
}

const LinkComponent = React.memo(({ listLinks }: { listLinks: ListLinksProps[] }) => {
    const router = useRouter()
    const isAdminRoute = router?.asPath.startsWith('/admin')

    return (
        <>
            {listLinks?.map((value, index) => (
                <Link key={index} href={value.url} className={isAdminRoute
                    ? 'w-full border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-3 py-4 flex justify-center'
                    : 'w-full border-2 shadow-black shadow-lg border-gray-800 bg-white rounded-2xl my-2 p-4 py-4 md:py-6 flex justify-center hover:scale-[1.02] hover:shadow-lg duration-200 ease-in-out'
                }>
                    <span className={isAdminRoute ? 'text-xs text-gray-500 font-bold' : 'text-xs md:text-sm text-gray-500 font-bold'}>{value.name}</span>
                </Link>
            ))}
        </>
    )
})

export default LinkComponent