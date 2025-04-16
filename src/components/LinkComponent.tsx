'use client'

import React from 'react'
import Link from 'next/link'

type ListDeveiceComponentProps = {
    listLinks?: LinkType[]
}

export type LinkType = {
    username?: string,
    pathName: string,
    url: string,
    name?: string
}

const LinkDeviceComponent: React.FC<ListDeveiceComponentProps> = ({ listLinks }) => {
    const pathURL = window.location.pathname.startsWith('/admin')
    return (
        <>
            {listLinks?.map((value, index) => (
                <Link key={index} href={value.url} className={pathURL
                    ? 'w-full border border-gray-300 bg-white shadow-lg rounded-[50px] my-3 p-4 flex justify-center'
                    : 'w-10/12 md:w-4/12 border border-gray-300 bg-white rounded-[50px] my-2 p-5 flex justify-center hover:scale-[1.02] hover:shadow-lg duration-200 ease-in-out'
                }>
                    <span className={pathURL ? 'text-sm text-gray-500 font-bold' : 'text-lg text-gray-500 font-bold'}>{value.name}</span>
                </Link>
            ))}
        </>
    )
}

LinkDeviceComponent.displayName = 'LinkDeviceComponent'

export default LinkDeviceComponent