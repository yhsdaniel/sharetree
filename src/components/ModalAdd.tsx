import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { useLinkModal } from './hooks/useLinkModal'

type Props = {
    onClose: () => void
}

export default function ModalAdd({ onClose }: Props) {
    const { fillLink, handleChange, handleSubmitAdd } = useLinkModal(onClose)
    const isMobile = window.innerWidth <= 768
    return (
        <motion.div
            initial={{ opacity: 0, translateY: isMobile ? 100 : -100 }}
            animate={{ opacity: 1, translateY: isMobile ? 1 : -50 }}
            exit={{ opacity: 0, translateY: isMobile ? 100 : -100 }}
            transition={{ duration: .2, ease: 'linear' }}
            className=' bg-white border border-gray-300 w-full md:w-2/5 bottom-0 md:relative fixed shadow-inner shadow-gray-300 md:rounded-3xl rounded-t-3xl z-30 md:p-6 md:pb-20 p-6'
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={onClose} className='relative inline float-right cursor-pointer hover:font-bold transition duration-150'>X</button>
            <p>Add new link</p>
            <Input
                required
                type='text'
                name='name'
                className='my-4'
                placeholder='Link name'
                autoComplete='off'
                value={fillLink.name}
                onChange={handleChange}
            />
            <Input
                required
                type='text'
                name='url'
                className='my-4'
                placeholder='URL'
                autoComplete='off'
                value={fillLink.url}
                onChange={handleChange}
            />
            <Button className='w-full md:w-auto my-4 float-right' onClick={handleSubmitAdd}>Add</Button>
        </motion.div>
    )
}
