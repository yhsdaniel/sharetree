'use client'

import { AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import ModalAdd from './ModalAdd'
import ModalDelete from './ModalDelete'
import { useContext } from 'react'
import { UserListContext } from '@/context/UserListProvider'

interface ModalProps {
    userId?: string,
    id: string,
    type: string,
    name: string,
    setShowModal: (showModal: boolean) => void,
    onUpdate?: (update: { id?: string, name: string, url?: string }) => void,
    refresh: () => void
}

const Modal: React.FC<ModalProps> = ({ userId, type, name, id, setShowModal, onUpdate, refresh }) => {
    const userContext = useContext(UserListContext)
    const username = userContext?.userState as string
    
    return (
        <AnimatePresence>
            <div className='fixed left-0 top-0 bg-black/30 w-full h-screen z-20'>
                {type === 'add' && (
                    <ModalAdd
                        owner={username}
                        onClose={() => setShowModal(false)}
                        onUpdate={onUpdate}
                        refresh={refresh}
                    />
                )}

                {type === 'delete' && (
                    <ModalDelete
                        userId={userId}
                        id={id}
                        name={name}
                        owner={username}
                        onClose={() => setShowModal(false)}
                        onUpdate={onUpdate}
                        refresh={refresh}
                    />
                )}
            </div>
        </AnimatePresence>
    )
}

export default Modal