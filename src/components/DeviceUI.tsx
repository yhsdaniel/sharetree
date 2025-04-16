'use client'

import axios from 'axios'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { LinkType } from '@/components/LinkComponent'

const LinkComponent = dynamic(() => import('@/components/LinkComponent'), { ssr: false })

type SessionUser = {
  id?: string | null
}

export default function DeviceUI() {
  const [listLinks, setListLinks] = useState<LinkType[]>([])
  const { data: session } = useSession()
  const user = session?.user
  const username = (user && 'username' in user ? user?.username as string : undefined) || user?.name as string

  const idSession = (session?.user as SessionUser)?.id || null

  useEffect(() => {
    if (idSession) {
      const resp = async () => {
        try {
          const { data: response } = await axios.get(`/api/linkadmin`, { params: { id: idSession } })
          setListLinks(response.link)
        } catch (error) {
          console.error(error)
        }
      }

      resp()
    }

  }, [idSession])

  return (
    <div className='h-screen w-full hidden md:block md:max-w-[230px] lg:max-w-[316px] xl:max-w-[460px] p-2 md:fixed md:right-0 top-0'>
      <div className='size-full rounded-2xl flex justify-center items-center'>
        <div className='w-[20rem] h-[35rem] bg-white shadow-2xl rounded-3xl relative flex justify-center items-center'>
          <div className='w-[19.5rem] h-[35rem] overflow-auto bg-gray-800 rounded-3xl absolute flex flex-col justify-start items-center -top-2 p-4'>
            <div className='text-white'><h1>Sharetree</h1></div>
            <Suspense fallback={<div className='w-full h-full flex justify-center items-center'>Loading...</div>}>
              <LinkComponent listLinks={listLinks} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
