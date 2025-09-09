'use client'

import { lazy, Suspense } from 'react'
import { useIsMobile } from './hooks/use-mobile'
import { useQuery } from '@apollo/client'
import { GET_USER_QUERY } from '@/graphql/accessQuery'

const LinkComponent = lazy(() => import('@/components/LinkComponent'))

export default function DeviceUI() {
  const { data } = useQuery(GET_USER_QUERY)
  const isMobile = useIsMobile()

  return (
    <div className={isMobile ? 'fixed bottom-0 h-[80vh] w-full bg-gray-800 md:w-1/2 p-2 rounded-t-3xl flex justify-center items-center' : 'h-screen w-full md:w-1/2 p-2 flex justify-center items-center'} onClick={(e) => e.stopPropagation()}>
      <div className={isMobile ? 'size-full p-4 flex flex-col justify-start items-center gap-1' : 'w-[19rem] h-[37rem] shadow-black shadow-[1px_1px_8px_8px_rgba(0,0,0)] overflow-auto bg-gray-400 rounded-[2rem] absolute flex flex-col justify-start items-center p-4'}>
        <div className='text-white'><h1>Sharetree</h1></div>
        <div className='text-white font-bold my-4'>@{data?.user?.username}</div>
        <Suspense fallback={<div className='size-full flex justify-center items-center'><div className='loader'></div></div>}>
          <LinkComponent username={data?.user?.username} />
        </Suspense>
      </div>
    </div>
  )
}
