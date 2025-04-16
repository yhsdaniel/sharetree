'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

type ChildProps = {
    children: ReactNode,
    userState: string
}

//https://sharetree.vercel.app/

export default function LayoutLinkWrapper({ children, userState }: ChildProps) {
    const router = useRouter()

    return (
        <div className='h-full md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] p-2 overflow-y-auto'>
            <div className='h-14 bg-green-700 text-white flex justify-center items-center rounded-xl'>
                <span className='text-sm'>Your sharetree link is: <button onClick={() => router.push(`/${userState}`)} className='underline italic hover:text-blue-500 transition duration-150'>{`sharetree.vercel.app/${userState}`}</button></span>
            </div>
            <div className='h-[calc(100%-4rem)] overflow-auto bg-white mt-2 p-4 rounded-2xl shadow-lg relative'>
                {children}
            </div>
        </div>
    )
}
