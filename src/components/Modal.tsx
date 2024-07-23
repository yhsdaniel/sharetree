import { AnimatePresence, motion } from 'framer-motion'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface ModalProps {
    setShowModal: (showModal: boolean) => void
}

type URLForm = {
    url: string,
    name: string
}

const Modal: React.FC<ModalProps> = ({ setShowModal }) => {
    const [fillLink, setFillLink] = useState<URLForm>({
        url: '',
        name: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target

        setFillLink((preValues) => ({
            ...fillLink,
            [name]: value
        }))
    }
    
    const handleSubmit = () => {
        axios.post('api/links', fillLink)
            .then((response) => {
                if(response){
                    toast.success('Your link has been added')
                }
            }).catch((err) => {
                toast.error('Something went wrong')
            })
    }

    return (
        <AnimatePresence>
            <motion.div
                className='absolute w-full h-[88%] bg-white border border-gray-300 left-0 bottom-0 shadow-inner shadow-gray-300 rounded-3xl z-30 p-6'
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 1 }}
                transition={{ duration: .3 }}
            >
                <button onClick={() => setShowModal(false)} className='relative inline float-right cursor-pointer hover:font-bold transition duration-150'>X</button>
                <div>Enter URL</div>
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
                <Button className='my-4 float-right' onClick={handleSubmit}>Add</Button>
            </motion.div>
        </AnimatePresence>
    )
}

export default Modal