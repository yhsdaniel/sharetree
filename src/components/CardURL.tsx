'use client'

import { useState } from "react"
import { motion } from 'framer-motion'
import Modal from "./Modal"
import { Input } from "./ui/input"
import axios from "axios"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

interface AppProps {
    id: string,
    name: string,
    url: string
}

export default function CardURL({ id, name, url }: AppProps) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [editName, setEditName] = useState(false)
    const [editUrl, setEditUrl] = useState(false)
    const [type, setType] = useState('')
    const [isEdit, setIsEdit] = useState({
        name: name || '',
        url: url || ''
    })

    const { data: session } = useSession()
    const user = session?.user
    const username = (user && 'username' in user ? user?.username : undefined) || session?.user?.name

    const handleEdit = {
        EditName: () => {
            setEditName(true)
            setEditUrl(false)
        },
        EditUrl: () => {
            setEditUrl(true)
            setEditName(false)
        }
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setIsEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            if(isEdit.name !== name || isEdit.url !== url) {
                handleSave(event);
            } else {
                setEditName(false)
                setEditUrl(false)
            }
        }
    }

    const handleLosesFocus = () => {
        setEditName(false)
        setEditUrl(false)
    }

    const handleSave = async (e: any) => {
        e.preventDefault()
        await axios.put(`/api/${username}/links`, { id: id, name: isEdit.name, url: isEdit.url })
            .then((response) => {
                if (response) {
                    setEditName(false)
                    setEditUrl(false)
                    toast.success('Updated successfully')
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong')
            })
    };

    return (
        <div className='w-full border border-gray-300 shadow-lg rounded-3xl mt-4 p-2 px-6 md:px-16'>
            <div className="flex justify-start items-center cursor-pointer" onClick={handleEdit.EditName}>
                {editName ? (
                    <Input
                        type='text'
                        name='name'
                        className='my-4'
                        autoComplete='off'
                        value={isEdit.name}
                        autoFocus
                        onKeyDown={handleKeyDown}
                        onBlur={handleLosesFocus}
                        onSubmit={handleSave}
                        onChange={handleChange}
                    />
                ) : (
                    <>
                        <h5 className="mb-4">{name}</h5>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </>
                )}
            </div>

            <div className="w-full text-sm mb-4 flex justify-start items-center cursor-pointer" onClick={handleEdit.EditUrl}>
                {editUrl ? (
                    <Input
                        type='text'
                        name='url'
                        className='my-4'
                        autoComplete='off'
                        value={isEdit.url}
                        autoFocus
                        onKeyDown={handleKeyDown}
                        onBlur={handleLosesFocus}
                        onSubmit={handleSave}
                        onChange={handleChange}
                    />
                ) : (
                    <>
                        <div className="italic overflow-hidden break-words md:whitespace-normal whitespace-nowrap text-ellipsis w-auto">{url}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </>
                )}
            </div>
            <div className="w-full flex justify-end items-center">
                {/* Modal for Delete */}
                <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    className='size-6 cursor-pointer hover:text-red-600 duration-150 ease-in'
                    onClick={() => { setShowModal(true); setType('delete') }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </motion.button>
            </div>
            {showModal && <Modal type={type} setShowModal={setShowModal} id={id} name={name} />}
        </div>
    )
}
