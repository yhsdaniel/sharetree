import React from 'react'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { useLinkModal } from './hooks/useLinkModal'

type ModalDeleteProps = {
    userId?: string,
    id: string,
    name: string,
    onClose: () => void
}

export default function ModalDelete({ userId, id, name, onClose }: ModalDeleteProps) {
    const { handleSubmitDelete } = useLinkModal(onClose)
    const isMobile = window.innerWidth <= 768
    return (
        <motion.div
            initial={{ opacity: 0, translateY: isMobile ? 100 : -100 }}
            animate={{ opacity: 1, translateY: isMobile ? 1 : -50 }}
            exit={{ opacity: 0, translateY: isMobile ? 100 : -100 }}
            transition={{ duration: .2, ease: 'linear' }}
            className='w-full md:w-2/5 bg-white border border-gray-300 bottom-0 shadow-inner shadow-gray-300 rounded-3xl z-30 p-6 pb-20'
        >
            <button onClick={onClose} className='relative inline float-right cursor-pointer hover:font-bold transition duration-150'>X</button>
            <p>Delete link</p>
            <p>Are you sure to delete {name}</p>
            <Button className='my-4 float-right' onClick={() => userId && handleSubmitDelete(userId, id)}>Ok</Button>
        </motion.div>
    )
}
