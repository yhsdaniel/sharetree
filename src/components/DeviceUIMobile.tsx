import { AnimatePresence } from 'framer-motion'
import React, { useContext, useState } from 'react'
import Modal from './Modal'
import { UserListContext } from '@/context/UserListProvider'

interface DeviceUIMobileProps {
    userContext?: any,
    refresh?: () => void,
    updatedNewAndDelete?: (update: { id?: string, name: string, url?: string }) => void
}

export default function DeviceUIMobile({ refresh, updatedNewAndDelete }: DeviceUIMobileProps) {
    const userContext = useContext(UserListContext)
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState('')

    return (
        <div className='fixed bottom-0 right-0 w-full h-16 bg-gray-800 flex justify-between items-center px-4 z-50'>
            <div className='flex justify-between items-center'>
                <button onClick={() => { setShowModal(true); setType('add'); }}>Add</button>
                <button></button>
                <button></button>
            </div>
            <AnimatePresence>
                {showModal &&
                    <Modal
                        type={type}
                        setShowModal={setShowModal}
                        id={userContext?.idUser || ''}
                        name=''
                        onUpdate={updatedNewAndDelete}
                        refresh={refresh ?? (() => { })}
                    />
                }
            </AnimatePresence>
        </div>
    )
}
