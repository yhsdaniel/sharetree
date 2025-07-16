'use client'

import { AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import ModalAdd from './ModalAdd'
import ModalDelete from './ModalDelete'

interface ModalProps {
    setShowModal: (showModal: boolean) => void,
    id: string,
    type: string,
    name: string,
}

const Modal: React.FC<ModalProps> = ({ setShowModal, type, name, id }) => {
    console.log(id)
    const { data: session } = useSession()
    const user = session?.user
    const username = (user && 'username' in user ? user?.username : session?.user?.name) as string

    return (
        <AnimatePresence>
            <div className='fixed left-0 top-0 bg-black/30 w-full h-screen z-20'>
                {type === 'add' && (
                    <ModalAdd owner={username} onClose={() => setShowModal(false)}/>
                )}

                {type === 'delete' && (
                    <ModalDelete id={id} name={name} owner={username} onClose={() => setShowModal(false)}/>
                )}

            </div>
        </AnimatePresence>
    )
}

export default Modal