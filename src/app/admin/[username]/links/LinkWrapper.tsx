'use client'

import { Suspense, useState } from 'react'
import Modal from '@/components/Modal'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { GET_LINKS_QUERY } from '@/graphql/accessQuery'

const CardUrl = dynamic(() => import('@/components/CardURL'), { ssr: false })

const LinkWrapper = () => {
  const { data: session } = useSession()
  const idUser = session?.user && 'id' in session?.user ? session?.user?.id : undefined
  
  const [showModal, setShowModal] = useState(false)
  const [type, setType] = useState('')
  
  const { loading, error, data, refetch } = useQuery(GET_LINKS_QUERY, {
    variables: { id: idUser },
    skip: !idUser
  })
  
  const refetchLinks = () => refetch()
  
  if (loading) return <div className='w-full h-full flex justify-center items-center'>Loading...</div>;
  if (error) return <p>Error fetching links.</p>;

  return (
    <>
      <div className='md:px-16 relative'>
        <Button
          className='w-full h-12 rounded-2xl bg-gray-800 text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0'
          onClick={() => { 
            setShowModal(true); 
            setType('add') 
          }}
        >
          Add Link
        </Button>
      </div>
      <section className='mt-6 md:mt-10'>
        <Suspense fallback={<div className='w-full h-full flex justify-center items-center'>Loading...</div>}>
          {data?.user.link?.map((value: any, index: any) => (
            <CardUrl key={index} id={value._id} name={value.name} url={value.url} onUpdate={refetchLinks} />
          ))}
        </Suspense>
      </section>
      {showModal && <Modal type={type} setShowModal={setShowModal} id='' name='' />}
    </>
  )
}

export default LinkWrapper