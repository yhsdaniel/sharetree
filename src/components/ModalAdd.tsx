import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { useLinkModal } from '../app/hooks/uesLinkModal'

type Props = {
    owner: string,
    onClose: () => void
}

export default function ModalAdd({ owner, onClose }: Props) {
    const { fillLink, handleChange, handleSubmitAdd } = useLinkModal(owner, onClose)
    return (
        <motion.div
            className='md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] bg-white border border-gray-300 bottom-0 shadow-inner shadow-gray-300 rounded-3xl z-30 p-6 pb-20'
            initial={{ opacity: 0, translateY: 1 }}
            animate={{ opacity: 1, translateY: 100 }}
            transition={{ duration: .3 }}
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
            <Button className='my-4 float-right' onClick={handleSubmitAdd}>Add</Button>
        </motion.div>
    )
}
