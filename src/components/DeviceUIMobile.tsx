import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Paintbrush, Plus, List } from "lucide-react"

import Modal from './Modal'
import DeviceUI from './DeviceUI'
import Link from 'next/link'

type DeviceUIMobileProps = {
    username?: string;
};

const DeviceUIMobile = React.memo(({username}: DeviceUIMobileProps) => {
    const [showModal, setShowModal] = useState(false)
    const [showDeviceUI, setShowDeviceUI] = useState(false)
    const [type, setType] = useState<'add' | 'delete' | ''>('')
    console.log(username)

    return (
        <>
            <div className='fixed bottom-0 left-0 right-0 -translate-y-1/4 w-fit bg-green-200 border border-green-500 flex justify-center items-center text-xs md:text-base mx-auto py-3 px-2 rounded-3xl z-[50]'>
                <Link
                    href={'#'}
                    className='bg-transparent text-black flex flex-col justify-center items-center gap-0 p-0 px-4 hover:bg-transparent' 
                    onClick={() => { setShowModal(true); setType('add'); }}
                >
                    <Plus className='w-4 h-4'/>
                    Add
                </Link>
                <Link
                    href={'#'}
                    className='bg-transparent text-black flex flex-col justify-center items-center gap-0 p-0 px-4 hover:bg-transparent'
                    onClick={() => setShowDeviceUI(!showDeviceUI)}
                >
                    <Eye className='w-4 h-4'/>
                    Preview
                </Link>
                <Link
                    href={`/admin/${username}/links`}
                    className='bg-transparent text-black flex flex-col justify-center items-center gap-0 p-0 px-4 hover:bg-transparent'
                >
                    <List className='w-4 h-4'/>
                    Link list
                </Link>
                <Link
                    href={`/admin/${username}/design`}
                    className='bg-transparent text-black flex flex-col justify-center items-center gap-0 p-0 px-4 hover:bg-transparent'
                >
                    <Paintbrush className='w-4 h-4'/>
                    Design
                </Link>
            </div>

            <AnimatePresence>
                {showModal &&
                    <Modal
                        type={type}
                        setShowModal={setShowModal}
                        id={''}
                        name=''
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