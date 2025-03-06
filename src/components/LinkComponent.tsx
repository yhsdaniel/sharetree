'use client'

import React from 'react'
import Link from 'next/link'

type ListDeveiceComponentProps = {
    listLinks: LinkType[]
    username: string,
    pathName?: string
}

export type LinkType = {
    username?: string,
    pathName: string,
    url: string,
    name?: string
}

const LinkDeviceComponent: React.FC<ListDeveiceComponentProps> = React.memo(({ listLinks, username, pathName }) => {
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