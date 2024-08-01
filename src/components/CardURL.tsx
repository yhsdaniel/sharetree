'use client'

import { useState } from "react"
import { motion } from 'framer-motion'
import Modal from "./Modal"

interface AppProps {
    id: string,
    name: string,
    url: string
}

export default function CardURL({ id, name, url }: AppProps) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [type, setType] = useState('')
    
    return (
        <div className='w-full border border-gray-300 shadow-lg rounded-3xl mt-4 p-2 px-16'>
            <h5 className="mb-4">{name}</h5>
            <div className='text-sm mb-4 flex w-full'>
                <div className="w-10/12 italic break-words">{url}</div>
                <div className="w-2/12 flex justify-center items-center">
                    {/* Modal for Edit */}
                    <motion.button
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        className='size-6 w-6/12 cursor-pointer hover:text-green-600 duration-150 ease-in'
                        onClick={() => { setShowModal(true); setType('edit') }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </motion.button>

                    {/* Modal for Delete */}
                    <motion.button
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        className='size-6 w-6/12 cursor-pointer hover:text-red-600 duration-150 ease-in'
                        onClick={() => { setShowModal(true); setType('delete') }}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </motion.button>
                </div>
            </div>
            {showModal && <Modal type={type} setShowModal={setShowModal} id={id} name={name} />}
        </div>
    )
}
