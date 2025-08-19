'use client'

import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { UserListContext } from '@/context/UserListProvider'
import { AnimatePresence, Reorder } from 'framer-motion'

const CardUrl = lazy(() => import('@/components/CardURL'))

const LinkWrapper = () => {
    const userListContext = useContext(UserListContext);
    const listLinks = userListContext?.listLinks;
    const setListLinks = userListContext?.setListLinks;
    const idUser = userListContext?.idUser;
    const refresh = userListContext?.refresh
    const updatedNewAndDelete = userListContext?.updatedNewAndDelete;

    const [isList, setIsList] = useState(listLinks)
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState('')

    useEffect(() => {
        setIsList((listLinks ?? []).filter((item) => !!item && typeof item._id === 'string'))
    }, [listLinks])

    const handleUpdate = (update: { id: string, name: string, url: string }) => {
        if(!setListLinks) return 
        setListLinks((prevLinks: any[]) =>
            prevLinks
                ?.filter((link) => !!link && typeof link._id === 'string')
                .map((link) =>
                    link._id === update.id
                        ? { ...link, name: update.name, url: update.url }
                        : link
                )
        )
    }

    if (!Array.isArray(listLinks)) return <div className='size-full flex justify-center items-center loader'></div>;

    return (
        <div className='size-full relative'>
            <div className='md:px-16'>
                <Button
                    className='w-full h-10 md:h-12 text-xs rounded-2xl bg-gray-800 text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0'
                    onClick={() => {
                        setShowModal(true);
                        setType('add')
                    }}
                >
                    Add Link
                </Button>
            </div>
            <section className='mt-6 md:mt-10'>
                <Suspense fallback={<div className='loader'></div>}>
                    <Reorder.Group axis='y' values={isList ?? []} onReorder={setIsList}>
                        {listLinks?.map((value: any, index: any) => (
                            <Reorder.Item key={index} value={value}>
                                <CardUrl
                                    userId={idUser || ''}
                                    id={value._id}
                                    name={value.name}
                                    url={value.url}
                                    onUpdate={handleUpdate}
                                    onUpdateAddAndDelete={updatedNewAndDelete}
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </Suspense>
            </section>

            {/* ADD MODAL */}
            <AnimatePresence>
                {showModal &&
                    <Modal
                        type={type}
                        setShowModal={setShowModal}
                        id={idUser || ''}
                        name=''
                        onUpdate={updatedNewAndDelete}
                        refresh={refresh ?? (() => {})}
                    />
                }
            </AnimatePresence>
        </div>
    )
}

export default LinkWrapper