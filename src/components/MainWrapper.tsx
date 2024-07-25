'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import CardURL from './CardURL'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function MainWrapper() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [listLinks, setListLinks] = useState([])
  const router = useRouter()
  const session = useSession()
  const [idSession, setIdSession] = useState(() => {
    return{
      id: session.data?.user?.id || null
    }
  })
  
  useEffect(() => {
    if(idSession.id){
      const resp = async () => {
        try {
          const { data: response } = await axios.get('api/links', { params: { id: idSession.id }})
          setListLinks(response)
          router.refresh()
        } catch (error) {
          console.error(error)
        }
      }
  
      resp()
    }
  }, [idSession.id])

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
            <span className='text-sm'>Your sharetree link is: <a href="#" className='underline italic hover:text-blue-500 transition duration-150'> sharetree/daniel</a></span>
          </div>
          {showModal && <Modal setShowModal={setShowModal} />}
          <div className='md:px-16 md:mt-10 relative'>
            <motion.button
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              className='w-full h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90'
              onClick={() => setShowModal(true)}
            >
              Add Link
            </motion.button>
          </div>
          <section className='mt-16'>
            {listLinks.map((value, index) => (
              <CardURL key={index} name={value.name} url={value.url} />
            ))}
          </section>
        </div>
      </motion.div>
    </>
  )
}
