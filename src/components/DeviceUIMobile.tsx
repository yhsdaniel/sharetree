import React, { useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Paintbrush, Plus } from "lucide-react"

import Modal from './Modal'
import { UserListContext } from '@/context/UserListProvider'
import { Button } from './ui/button'
import DeviceUI from './DeviceUI'

interface DeviceUIMobileProps {
    userContext?: any,
    refresh?: () => void,
    updatedNewAndDelete?: (update: { id?: string, name: string, url?: string }) => void
}

export default function DeviceUIMobile({ refresh, updatedNewAndDelete }: DeviceUIMobileProps) {
    const userContext = useContext(UserListContext) 
    const [showModal, setShowModal] = useState(false)
    const [showDeviceUI, setShowDeviceUI] = useState(false)
    const [type, setType] = useState('')

    return (
        <>
            <div className='fixed bottom-0 left-0 translate-x-1/4 -translate-y-1/4 w-auto bg-gray-500 flex justify-center items-center gap-2 p-4 rounded-3xl z-[50]'>
                <Button
                    className='bg-transparent flex flex-col justify-center items-center p-0 px-4 hover:bg-transparent' 
                    onClick={() => { setShowModal(true); setType('add'); }}
                >
                    <Plus />
                    Add
                </Button>
                <Button
                    className='bg-transparent flex flex-col justify-center items-center p-0 px-4 hover:bg-transparent'
                    onClick={() => setShowDeviceUI(!showDeviceUI)}
                >
                    <Eye />
                    Preview
                </Button>
                <Button
                    className='bg-transparent flex flex-col justify-center items-center p-0 px-4 hover:bg-transparent'
                >
                    <Paintbrush />
                    Design
                </Button>
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
                {showDeviceUI && (
                    <motion.div
                        initial={{ opacity: 0, translateY: 100 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: 100 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        className='fixed bottom-0 bg-black/50 size-full z-[50]'
                        onClick={() => setShowDeviceUI(false)}
                    >
                        <DeviceUI />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
