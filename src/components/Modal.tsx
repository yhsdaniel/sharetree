'use client'

import { AnimatePresence } from 'framer-motion'
import ModalAdd from './ModalAdd'
import ModalDelete from './ModalDelete'

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
    const closeModal = () => {
        setShowModal(false)
    }
    return (
        <div className='fixed left-0 top-0 bg-black/30 w-full h-screen z-[100] flex justify-center items-center' onClick={closeModal}>
            {type === 'add' && (
                <ModalAdd
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
                    onClose={() => setShowModal(false)}
                    onUpdate={onUpdate}
                    refresh={refresh}
                />
            )}
        </div>
    )
}

export default Modal