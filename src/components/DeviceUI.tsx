'use client'

import axios from 'axios'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const LinkComponent = dynamic(() => import('@/components/LinkComponent'), { ssr: false })

type LinkType = {
  url: string,
  name: string
}

type SessionUser = {
  id?: string | null
}

export default function DeviceUI() {
  const [listLinks, setListLinks] = useState<LinkType[]>([])
  const { data: session } = useSession()
  const [idSession, setIdSession] = useState(() => {
    return {
      id: (session?.user as SessionUser)?.id || null
    }
  })

  useEffect(() => {
    if (idSession.id) {
      const resp = async () => {
        try {
          const { data: response } = await axios.get(`/api/linkadmin`, { params: { id: idSession.id } })
          setListLinks(response.link)
        } catch (error) {
          console.error(error)
        }
      }

      resp()
    }

  }, [idSession.id])

  return (
    <div className='h-screen w-full hidden md:block md:max-w-[230px] lg:max-w-[316px] xl:max-w-[460px] p-2 md:fixed md:right-0 top-0'>
      <div className='size-full rounded-2xl flex justify-center items-center'>
        <div className='w-[20rem] h-[35rem] bg-white shadow-2xl rounded-3xl relative flex justify-center items-center'>
          <div className='w-[19.5rem] h-[35rem] overflow-auto bg-black rounded-3xl absolute flex flex-col justify-start items-center -top-2 p-4'>
            <div className='text-white'><h1>Sharetree</h1></div>
            <LinkComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
