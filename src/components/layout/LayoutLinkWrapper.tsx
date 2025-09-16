'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useQuery } from '@apollo/client'
import { GET_USER_QUERY } from '@/graphql/accessQuery'

type ChildProps = {
    children: ReactNode
}

const LayoutLinkWrapper = ({ children }: ChildProps) => {
    const router = useRouter()
    const { data } = useQuery(GET_USER_QUERY)

    const handleCopy = () => {
        navigator.clipboard.writeText(`sharetree.vercel.app/${data?.user?.username}`)
        toast.success('Copy success')
    }

    return (
        <main className='w-full min-h-screen mt-16 lg:mt-0'>
            <div className='size-full p-2 overflow-y-auto flex flex-col justify-center items-center'>
                <div
                    className='h-12 p-8 w-full bg-green-200 border border-green-700 text-[--sidebar-accent-foreground] flex flex-col justify-center items-start rounded-xl'>
                    <p className='text-xs md:text-sm leading-6 md:leading-7 font-bold'>Your sharetree link is: <button onClick={() => router.push(`/${data?.user?.username}`)} className='underline italic hover:text-blue-500 transition duration-150'>Your sharetree link</button></p>
                    <p className='text-xs md:text-sm leading-6 md:leading-7'><button className='underline italic hover:text-blue-500 transition duration-150' onClick={handleCopy}>Copy your sharetree URL</button></p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='h-[calc(100%-4rem)] w-full md:w-3/4 overflow-auto mt-2 pt-4 rounded-2xl relative'>
                    {children}
                </motion.div>
            </div>
        </main>
    )
}

export default LayoutLinkWrapper