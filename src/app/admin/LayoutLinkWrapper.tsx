'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, useContext } from 'react'
import { UserListContext } from '@/components/layout/Layout'

type ChildProps = {
    children: ReactNode
}

const LayoutLinkWrapper: React.FC<ChildProps> = ({ children }) => {
    const router = useRouter()
    const userState = useContext(UserListContext)

    return (
        <main className='h-screen'>
            <div className='h-full md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] p-2 overflow-y-auto'>
                <div className='h-14 bg-green-700 text-white flex justify-center items-center rounded-xl'>
                    <span className='text-sm'>Your sharetree link is: <button onClick={() => router.push(`/${userState?.userState}`)} className='underline italic hover:text-blue-500 transition duration-150'>{`sharetree.vercel.app/${userState?.userState}`}</button></span>
                </div>
                <div className='h-[calc(100%-4rem)] overflow-auto bg-white mt-2 p-4 rounded-2xl shadow-lg relative'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default LayoutLinkWrapper