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

export default function DeviceUI() {
  const [listLinks, setListLinks] = useState<LinkType[]>([])
  const { data: session } = useSession()

  const [idSession, setIdSession] = useState(() => {
    return {
      id: session?.user?.id || null
    }
  })

  useEffect(() => {
    if (idSession.id) {
      const resp = async () => {
        try {
          const { data: response } = await axios.get(`/api/${session?.user?.username}/links`, { params: { id: idSession.id } })
          setListLinks(response)
        } catch (error) {
          console.error(error)
        }
      }

      resp()
    }

  }, [idSession.id])

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 1 }}
      transition={{ duration: .5 }}
      className='h-screen w-full md:max-w-[230px] lg:max-w-[316px] xl:max-w-[460px] p-2 md:fixed md:right-0 top-0'
    >
      <div className='size-full rounded-2xl flex justify-center items-center'>
        <div className='w-[18rem] h-[35rem] bg-white shadow-2xl rounded-3xl relative flex justify-center items-center'>
          <div className='w-[17.5rem] h-[35rem] bg-black rounded-3xl absolute flex flex-col justify-start items-center -top-2 p-4'>
            <div className='text-white'><h1>Sharetree</h1></div>
            {listLinks.map((value, index) => (
              <LinkComponent key={index} url={value.url} name={value.name}/>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
