'use client'

import { useState } from "react"
import { motion } from 'framer-motion'
import Modal from "./Modal"
import { Input } from "./ui/input"
import axios from "axios"
import toast from "react-hot-toast"
import { SquarePen, Trash } from "lucide-react"

interface AppProps {
    userId: string,
    id: string,
    name: string,
    url: string,
    onUpdate?: (update: { id: string, name: string, url: string }) => void,
    onUpdateAddAndDelete?: (update: { id?: string, name: string, url?: string }) => void,
    refresh?: () => void
}

export default function CardURL({ userId, id, name, url, onUpdate, onUpdateAddAndDelete, refresh }: AppProps) {

    const [showModal, setShowModal] = useState(false)
    const [editName, setEditName] = useState(false)
    const [editUrl, setEditUrl] = useState(false)
    const [type, setType] = useState('')
    const [isEdit, setIsEdit] = useState({ name, url })

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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (isEdit.name !== name || isEdit.url !== url) {
                handleSave();
            } else {
                setEditName(false)
                setEditUrl(false)
            }
        }
    }

    const handleLosesFocus = () => {
        setEditName(false)
        setEditUrl(false)
        handleSave()
    }

    const handleSave = async () => {
        try {
            await axios.put(`/api/linkadmin`, { id: id, name: isEdit.name, url: isEdit.url })
            if(isEdit.name !== name || isEdit.url !== name){
                toast.success('Updated successfully')
            }
            setEditName(false)
            setEditUrl(false)

            if (onUpdate) {
                onUpdate({ id: id, name: isEdit.name, url: isEdit.url })
            }
        } catch (error) {
            toast.error('Error updating link')
            console.error(error)
        }
    };

    return (
        <div className='size-full flex border overflow-auto bg-white border-gray-300 shadow-lg rounded-3xl mt-4 py-6 px-6 md:px-16'>
            <div className="w-9/12 flex flex-col gap-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={handleEdit.EditName}>
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
                            <div className="overflow-hidden text-xs md:text-sm font-bold">{name}</div>
                            <SquarePen className="mx-4 w-4 hover:text-green-600 duration-150 ease-in"/>
                        </>
                    )}
                </div>

                <div className="w-full text-sm flex justify-between items-center cursor-pointer" onClick={handleEdit.EditUrl}>
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
                            <div className="w-full italic overflow-hidden break-words whitespace-nowrap text-ellipsis md:text-xs">{url}</div>
                            <SquarePen className="mx-4 w-5 hover:text-green-600 duration-150 ease-in"/>
                        </>
                    )}
                </div>
            </div>
            
            <div className="w-3/12 flex justify-end items-center">
                {/* Modal for Delete */}
                <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    className='size-6 cursor-pointer hover:text-red-600 duration-150 ease-in'
                    onClick={() => { setShowModal(true); setType('delete') }}
                >
                    <Trash width={20} height={20}/>
                </motion.button>
            </div>

            {/* DELETE MODAL */}
            {showModal && 
                <Modal 
                    type={type} 
                    userId={userId}
                    id={id}
                    setShowModal={setShowModal} 
                    name={name} 
                    onUpdate={onUpdateAddAndDelete}
                    refresh={refresh ?? (() => {})}
                />
            }
        </div>
    )
}
