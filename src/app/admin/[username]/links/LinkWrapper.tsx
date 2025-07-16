'use client'

import { lazy, Suspense, useContext, useState } from 'react'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { UserListContext } from '@/context/UserListProvider'

const CardUrl = lazy(() => import('@/components/CardURL'))

const LinkWrapper = () => {
  const userState = useContext(UserListContext)

  const [showModal, setShowModal] = useState(false)
  const [links, setLinks] = useState(userState?.listLinks)
  const [type, setType] = useState('')

  // const { loading, error, data, refetch } = useQuery(GET_LINKS_QUERY, {
  //   variables: { id: userState?.idUser },
  //   skip: !userState?.idUser
  // })

  // const refetchLinks = () => refetch()

  const handleUpdate = (update: { id: string, name: string, url: string }) => {
    if (userState?.setListLinks) {
      userState.setListLinks((prevLinks) =>
        prevLinks?.map((link) => {
          if (link._id === update.id) {
            return { ...link, name: update.name, url: update.url }
          }
          return link
        })
      )
    }
  }

  if (!userState?.idUser) return <div className='w-full h-full flex justify-center items-center'>Loading...</div>;

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
          {userState?.listLinks?.map((value: any, index: any) => (
            <CardUrl key={index} id={value._id} name={value.name} url={value.url} onUpdate={handleUpdate} />
          ))}
        </Suspense>
      </section>
      {showModal && <Modal type={type} setShowModal={setShowModal} id={userState?.idUser || ''} name='' />}
    </>
  )
}

export default LinkWrapper