'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

interface ModalProps {
    setShowModal: (showModal: boolean) => void,
    id: string,
    type: string,
    name: string
}

type URLForm = {
    url: string,
    name: string,
    owner: string
}

const Modal: React.FC<ModalProps> = ({ setShowModal, type, name, id }) => {
    const { data: session } = useSession()
    const [fillLink, setFillLink] = useState<URLForm>({
        url: '',
        name: '',
        owner: session?.user?.email || ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target

        setFillLink((preValues) => ({
            ...fillLink,
            [name]: value
        }))
    }

    const handleSubmitAdd = () => {
        axios.post(`/api/${session?.user?.username}/links`, fillLink)
            .then((response) => {
                if (response) {
                    toast.success('Your link has been added')
                    setShowModal(false)
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong')
            })
    }

    const handleSubmitEdit = () => {
    }

    const handleSubmitDelete = () => {
        axios.delete(`/api/${session?.user?.username}/links`, { data: { id: id } })
            .then((response) => {
                if (response) {
                    toast.success(`Deleted link successfully`)
                    setShowModal(false)
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong')
            })
    }

    return (
        <AnimatePresence>
            <div className='fixed left-0 top-0 bg-black/30 w-full h-screen z-20'>
                {type === 'add' && (
                    <motion.div
                        className='md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] bg-white border border-gray-300 bottom-0 shadow-inner shadow-gray-300 rounded-3xl z-30 p-6 pb-20'
                        initial={{ opacity: 0, translateY: 1 }}
                        animate={{ opacity: 1, translateY: 100 }}
                        transition={{ duration: .3 }}
                    >
                        <button onClick={() => setShowModal(false)} className='relative inline float-right cursor-pointer hover:font-bold transition duration-150'>X</button>
                        <p>Add new link</p>
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
                        <Button className='my-4 float-right' onClick={handleSubmitAdd}>Add</Button>
                    </motion.div>
                )}

                {type === 'edit' && (
                    <motion.div
                        className='md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] bg-white border border-gray-300 bottom-0 shadow-inner shadow-gray-300 rounded-3xl z-30 p-6 pb-20'
                        initial={{ opacity: 0, translateY: 1 }}
                        animate={{ opacity: 1, translateY: 100 }}
                        transition={{ duration: .3 }}
                    >
                        <button onClick={() => setShowModal(false)} className='relative inline float-right cursor-pointer hover:font-bold transition duration-150'>X</button>
                        <p>Edit your link</p>
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
                        <Button className='my-4 flex justify-end float-right' onClick={handleSubmitEdit}>Submit</Button>
                    </motion.div>
                )}

                {type === 'delete' && (
                    <motion.div
                        className='md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] bg-white border border-gray-300 bottom-0 shadow-inner shadow-gray-300 rounded-3xl z-30 p-6 pb-20'
                        initial={{ opacity: 0, translateY: 1 }}
                        animate={{ opacity: 1, translateY: 100 }}
                        transition={{ duration: .3 }}
                    >
                        <button onClick={() => setShowModal(false)} className='relative inline float-right cursor-pointer hover:font-bold transition duration-150'>X</button>
                        <p>Delete link</p>
                        <p>Are you sure to delete {name}</p>
                        <Button className='my-4 float-right' onClick={handleSubmitDelete}>Ok</Button>
                    </motion.div>
                )}

            </div>
        </AnimatePresence>
    )
}

export default Modal