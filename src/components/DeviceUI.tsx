'use client'

import { lazy, Suspense, useContext } from 'react'
import { motion } from 'framer-motion'
import { UserListContext } from '@/context/UserListProvider'

const LinkComponent = lazy(() => import('@/components/LinkComponent'))

export default function DeviceUI() {
  const listLinks = useContext(UserListContext)
  return (
    <div className='h-screen w-full hidden md:block md:max-w-[230px] lg:max-w-[316px] xl:max-w-[460px] p-2 md:fixed md:right-0 top-0'>
      <div className='size-full rounded-2xl flex justify-center items-center'>
        <motion.div
          initial={{ opacity: 0, translateX: 100 }}
          animate={{ opacity: 1, translateX: 1 }}
          transition={{ duration: 1 }}
          className='w-[20rem] h-[35rem] bg-white shadow-2xl rounded-3xl relative flex justify-center items-center'>
          <div className='w-[19.5rem] h-[35rem] overflow-auto bg-gray-800 rounded-3xl absolute flex flex-col justify-start items-center -top-2 p-4'>
            <div className='text-white'><h1>Sharetree</h1></div>
            <Suspense fallback={<div className='w-full h-full flex justify-center items-center'><div className='loader'></div></div>}>
              <LinkComponent listLinks={listLinks?.listLinks || []} />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
