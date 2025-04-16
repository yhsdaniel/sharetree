'use client'

import { Suspense, useState } from 'react'
import Modal from '@/components/Modal'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'

const CardUrl = dynamic(() => import('@/components/CardURL'), { ssr: false })

type LinkType = {
  _id: string,
  url: string,
  name: string,
}

type LinkWrapperProps = {
  linkWrapper: LinkType[]
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({ linkWrapper }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [type, setType] = useState('')

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
          {linkWrapper?.map((value, index) => (
            <CardUrl key={index} id={value._id} name={value.name} url={value.url} />
          ))}
        </Suspense>
      </section>
      {showModal && <Modal type={type} setShowModal={setShowModal} id='' name='' />}
    </>
  )
}

export default LinkWrapper