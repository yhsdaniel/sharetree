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

const DeviceUIMobile = React.memo(({ refresh, updatedNewAndDelete }: DeviceUIMobileProps) => {
    const userContext = useContext(UserListContext) 
    const [showModal, setShowModal] = useState(false)
    const [showDeviceUI, setShowDeviceUI] = useState(false)
    const [type, setType] = useState('')

    return (
        <>
            <div className='fixed bottom-0 left-0 right-0 -translate-y-1/4 w-fit bg-green-200 border border-green-500 flex justify-center items-center mx-auto py-3 px-2 rounded-3xl z-[50]'>
                <Button
                    className='bg-transparent text-black flex flex-col justify-center items-center gap-0 p-0 px-4 hover:bg-transparent' 
                    onClick={() => { setShowModal(true); setType('add'); }}
                >
                    <Plus />
                    Add
                </Button>
                <Button
                    className='bg-transparent text-black flex flex-col justify-center items-center gap-0 p-0 px-4 hover:bg-transparent'
                    onClick={() => setShowDeviceUI(!showDeviceUI)}
                >
                    <Eye />
                    Preview
                </Button>
                <Button
                    className='bg-transparent text-black flex flex-col justify-center items-center gap-0 p-0 px-4 hover:bg-transparent'
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
                        animate={{ opacity: 1, translateY: 1 }}
                        exit={{ opacity: 0, translateY: 100 }}
                        transition={{ duration: .5, ease: 'easeInOut' }}
                        className='fixed bottom-0 size-full z-[50] overflow-auto'
                        onClick={() => setShowDeviceUI(false)}
                    >
                        <DeviceUI />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
})

DeviceUIMobile.displayName = "DeviceUIMobile";

export default DeviceUIMobile