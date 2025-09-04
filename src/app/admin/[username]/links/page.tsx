'use client'

import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { AnimatePresence, Reorder } from 'framer-motion'
import { GET_USER_QUERY, UPDATE_LINK_MUTATION } from '@/graphql/accessQuery'
import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

const CardUrl = lazy(() => import('@/components/CardURL'))

type LinkType = {
    _id: string
    name: string
    url: string
}

const LinkWrapper = () => {
    const [selected, setSelected] = useState<{ id: string; name: string }>({ id: '', name: '' })
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState('')
    const session = useSession()
    const id_user = session?.data?.user?.id

    const { data, loading } = useQuery(GET_USER_QUERY, {
        variables: { id: id_user },
        skip: !id_user,
        fetchPolicy: 'cache-and-network',
    })

    const isList: LinkType[] = data?.user?.link ?? []

    if (loading) return <div className='size-full flex justify-center items-center loader'></div>;

    return (
        <div className='size-full relative'>
            <div className='md:px-16'>
                <Button
                    className='w-full h-10 md:h-12 text-xs rounded-2xl bg-gray-800 text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0'
                    onClick={() => {
                        setSelected({ id: '', name: '' })
                        setShowModal(true);
                        setType('add')
                    }}
                >
                    Add Link
                </Button>
            </div>
            <section className='mt-6 md:mt-10'>
                <Reorder.Group axis='y' values={isList ?? []} onReorder={() => { }}>
                    {isList.map((value: any, index: any) => (
                        <Reorder.Item key={index} value={value}>
                            <CardUrl
                                userId={id_user || ''}
                                id={value._id}
                                name={value.name}
                                url={value.url}
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </section>

            {/* ADD MODAL */}
            <AnimatePresence>
                {showModal &&
                    <Modal
                        type={type}
                        setShowModal={setShowModal}
                        id={selected.id}
                        name={selected.name}
                        userId={id_user}
                    />
                }
            </AnimatePresence>
        </div>
    )
}

export default LinkWrapper