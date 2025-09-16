'use client'

import { lazy, useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { AnimatePresence, Reorder } from 'framer-motion'
import { GET_USER_QUERY, UPDATE_LINK_ORDER_MUTATION } from '@/graphql/accessQuery'
import { useMutation, useQuery } from '@apollo/client'
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
    const [list, setList] = useState<LinkType[]>([]);
    const [updateLinkOrder] = useMutation(UPDATE_LINK_ORDER_MUTATION);

    const session = useSession()
    const id_user = session?.data?.user?.id

    const { data, loading } = useQuery(GET_USER_QUERY, {
        variables: { id: id_user },
        skip: !id_user,
        fetchPolicy: 'cache-and-network',
    })
    
    const handleUpdateOrder = async (newOrder: LinkType[]) => {
        setList(newOrder);
        const orderedIds = newOrder.map(link => link._id)
        try{
            await updateLinkOrder({
                variables: {
                    userId: id_user,
                    orderedIds: orderedIds
                },
                refetchQueries: [
                    {
                        query: GET_USER_QUERY,
                        variables: { id: id_user }
                    }
                ]
            });
        } catch (error) {
            console.error("Error updating link order:", error);
        }
    }

    useEffect(() => { 
        if (data?.user?.link) {
            setList(data.user.link);
        }
    }, [data])

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
                {loading && <div className='flex justify-center items-center loader'></div>}
                <Reorder.Group axis='y' values={list} onReorder={handleUpdateOrder}>
                    {list.map((value: any) => (
                        <Reorder.Item 
                            key={value._id}
                            value={value}
                            dragListener={true} // Enable drag by default
                            style={{ touchAction: 'pan-y', minHeight: 48 }} // Improves touch drag
                        >
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