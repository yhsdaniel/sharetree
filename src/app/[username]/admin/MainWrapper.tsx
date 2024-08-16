'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

const CardUrl = dynamic(() => import('@/components/CardURL'), { ssr: false })

type LinkType = {
  _id: string,
  url: string,
  name: string
}

export default function MainWrapper() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [type, setType] = useState('')
  const [listLinks, setListLinks] = useState<LinkType[]>([])

  const { data: session } = useSession()
  const user = session?.user
  const username = (user && 'username' in user ? user?.username : undefined) || session?.user?.name
  const [idSession, setIdSession] = useState(() => {
    return {
      id: user && 'id' in user ? user?.id : undefined
    }
  })

  useEffect(() => {
    if (idSession.id) {
      const resp = async () => {
        try {
          const { data: response } = await axios.get(`/api/${username}/links`, { params: { id: idSession.id } })
          setListLinks(response)
        } catch (error) {
          console.error(error)
        }
      }

      resp()
    }
  }, [idSession.id, username])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .3 }}
        className='h-full md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] p-2 overflow-y-auto flex justify-center'
      >
        <div className='size-full bg-white p-4 rounded-2xl shadow-lg relative'>
          <div className='h-14 w-full bg-blue-200 flex justify-center items-center rounded-xl'>
            <span className='text-sm'>Your sharetree link is: <a href={`https://sharetree.vercel.app/${username}`} className='underline italic hover:text-blue-500 transition duration-150'>{`sharetree.vercel.app/${username}`}</a></span>
          </div>
          <div className='md:px-16 md:mt-10 relative'>
            <motion.button
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              className='w-full h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0'
              onClick={() => { setShowModal(true); setType('add') }}
            >
              Add Link
            </motion.button>
          </div>
          <section className='mt-6 md:mt-16'>
            {listLinks.map((value, index) => (
              <CardUrl key={index} id={value._id} name={value.name} url={value.url} />
            ))}
          </section>
        </div>
      </motion.div>
      {showModal && <Modal type={type} setShowModal={setShowModal} id='' name='' />}
    </>
  )
}
