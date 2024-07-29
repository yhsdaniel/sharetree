import Link from 'next/link'
import React from 'react'

interface AppProps{
    url: string,
    name: string
}

export default function LinkDeviceComponent({url, name}: AppProps) {
    return (
        <>
            <Link href={url} className='w-full border border-gray-300 bg-white shadow-lg rounded-xl my-2 p-3 flex justify-center'>
                <span className='text-sm'>{name}</span>
            </Link>
        </>
    )
}
