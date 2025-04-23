'use client'

import { Suspense, useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const CardUrl = dynamic(() => import('@/components/CardURL'), { ssr: false })

const LinkWrapper = () => {
  const { data: session } = useSession()
  const user = session?.user
  const idUser = user && 'id' in user ? user?.id : undefined

  const [links, setLinks] = useState<{ _id: string, name: string, url: string }[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [type, setType] = useState('')

  useEffect(() => {
    const fetchLinks = async () => {
      const { data: response } = await axios.get('/api/linkadmin', { params: { id: idUser } })
      setLinks(response.link)
    }
    fetchLinks()
  }, [])

  const handleUpdate = (update: { id: string, name: string, url: string }) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => {
        if (link._id === update.id) {
          return { ...link, name: update.name, url: update.url }
        }
        return link
      })
    )
  }

  return (
    <>
      <div className='md:px-16 relative'>
        <Button
          className='w-full h-12 rounded-2xl bg-gray-800 text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0'
          onClick={() => { setShowModal(true); setType('add') }}
        >
          Add Link
        </Button>
      </div>
      <section className='mt-6 md:mt-10'>
        <Suspense fallback={<div className='w-full h-full flex justify-center items-center'>Loading...</div>}>
          {links?.map((value, index) => (
            <CardUrl key={index} _id={value._id} name={value.name} url={value.url} onUpdate={handleUpdate} />
          ))}
        </Suspense>
      </section>
      {showModal && <Modal type={type} setShowModal={setShowModal} id='' name='' />}
    </>
  )
}

export default LinkWrapper