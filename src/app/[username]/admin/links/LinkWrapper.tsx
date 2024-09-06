'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import LayoutLinkWrapper from '../LayoutLinkWrapper'

const CardUrl = dynamic(() => import('@/components/CardURL'), { ssr: false })

type LinkType = {
  _id: string,
  url: string,
  name: string,
}

interface LinkWrapperProps {
  linkWrapper: LinkType[]
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({linkWrapper}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [type, setType] = useState('')

  return (
    <>
      <div className='md:px-16 relative'>
        <Button
          className='w-full h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0'
          onClick={() => { setShowModal(true); setType('add') }}
        >
          Add Link
        </Button>
      </div>
      <section className='mt-6 md:mt-10'>
        {linkWrapper.map((value, index) => (
          <CardUrl key={index} id={value._id} name={value.name} url={value.url} />
        ))}
      </section>
      {showModal && <Modal type={type} setShowModal={setShowModal} id='' name='' />}
    </>
  )
}

export default LinkWrapper