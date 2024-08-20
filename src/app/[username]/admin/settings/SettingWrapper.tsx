import React from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function SettingsWrapper() {
    const { data: session } = useSession()
    const user = session?.user
    const username = (user && 'username' in user ? user?.username : undefined) || session?.user?.name

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: .3 }}
                className='h-full md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] p-2 overflow-y-auto flex justify-center'
            >
                <div className='w-full bg-white p-4 rounded-2xl shadow-lg relative'>
                    <div className='h-14 bg-green-700 text-white flex justify-center items-center rounded-xl'>
                        <span className='text-sm'>Your sharetree link is: <Link href={`https://sharetree.vercel.app/${username}`} className='underline italic hover:text-blue-500 transition duration-150'>{`sharetree.vercel.app`}</Link></span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
