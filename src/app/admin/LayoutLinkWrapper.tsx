'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, useContext } from 'react'
import { UserListContext } from '@/context/UserListProvider'
import { motion } from 'framer-motion'

type ChildProps = {
    children: ReactNode
}

const LayoutLinkWrapper: React.FC<ChildProps> = ({ children }) => {
    const router = useRouter()
    const userState = useContext(UserListContext)

    return (
        <main className='h-full'>
            <div className='h-full md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] p-2 overflow-y-auto'>
                <motion.div
                    initial={{ opacity: 0, translateY: -100 }}
                    animate={{ opacity: 1, translateY: 1 }}
                    transition={{ duration: 1 }}
                    className='h-14 bg-green-700 text-white flex justify-center items-center rounded-xl'>
                    <span className='text-sm'>Your sharetree link is: <button onClick={() => router.push(`/${userState?.userState}`)} className='underline italic hover:text-blue-500 transition duration-150'>{`sharetree.vercel.app/${userState?.userState}`}</button></span>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='h-[calc(100%-4rem)] md:mx-40 overflow-auto mt-2 p-4 rounded-2xl relative'>
                    {children}
                </motion.div>
            </div>
        </main>
    )
}

export default LayoutLinkWrapper