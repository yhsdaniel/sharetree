'use client'

import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import Modal from "./Modal"
import { Input } from "./ui/input"
import toast from "react-hot-toast"
import { SquarePen, Trash, GripVertical } from "lucide-react"
import { useMutation } from "@apollo/client"
import { UPDATE_LINK_MUTATION } from "@/graphql/accessQuery"

interface AppProps {
    userId: string,
    id: string,
    name: string,
    url: string,
}

export default function CardURL({ userId, id, name, url }: AppProps) {

    const [showModal, setShowModal] = useState(false)
    const [editField, setEditField] = useState<"name" | "url" | null>(null)
    const [type, setType] = useState('')
    const [isEdit, setIsEdit] = useState({ name, url })

    const [updateLink] = useMutation(UPDATE_LINK_MUTATION)

    const handleEdit = (field: "name" | "url") => setEditField(field)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setIsEdit(prevState => ({ ...prevState, [name]: value }));
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (isEdit.name !== name || isEdit.url !== url) {
                handleSave();
            } else {
                setEditField(null)
            }
        }
    }

    const handleBlur = () => {
        setEditField(null)
        handleSave()
    }

    const handleSave = async () => {
        try {
            await updateLink({
                variables: { id, name: isEdit.name, url: isEdit.url }
            })
            toast.success('Link updated successfully')
            setEditField(null)
        } catch (error) {
            toast.error('Error updating link')
            console.error(error)
        }
    }

    return (
        <div className='size-full flex border overflow-auto bg-white border-gray-300 shadow-lg rounded-3xl mt-4 py-4 pr-0 md:py-6 md:pr-0 px-6 md:px-16'>
            <div className="w-9/12 flex flex-col gap-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => handleEdit("name")}>
                    {editField === "name" ? (
                        <Input
                            type='text'
                            name='name'
                            className='my-4'
                            autoComplete='off'
                            value={isEdit.name}
                            autoFocus
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    ) : (
                        <>
                            <div className="overflow-hidden text-xs md:text-sm font-bold">{name}</div>
                            <SquarePen className="mx-4 w-3 md:w-4 hover:text-green-600 duration-150 ease-in" />
                        </>
                    )}
                </div>

                <div className="w-full text-sm flex justify-between items-center cursor-pointer" onClick={() => handleEdit("url")}>
                    {editField === "url" ? (
                        <Input
                            type='text'
                            name='url'
                            className='my-4'
                            autoComplete='off'
                            value={isEdit.url}
                            autoFocus
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    ) : (
                        <>
                            <div className="w-full italic overflow-hidden break-words whitespace-nowrap text-ellipsis text-xs">{url}</div>
                            <SquarePen className="mx-4 w-4 md:w-5 hover:text-green-600 duration-150 ease-in" />
                        </>
                    )}
                </div>
            </div>

            <div className="w-3/12 flex justify-center items-center gap-4">
                {/* Modal for Delete */}
                <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    className='size-6 cursor-pointer flex justify-center items-center hover:text-red-600 duration-150 ease-in'
                    onClick={() => { setShowModal(true); setType('delete') }}
                >
                    <Trash className="md:w-5 w-4" />
                </motion.button>
                {/* Modal for Delete */}
                <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    className='size-6 cursor-grab flex justify-center items-center'
                    onClick={() => { setShowModal(true); setType('delete') }}
                >
                    <GripVertical className="md:w-5 w-4" />
                </motion.button>
                
                {/* DELETE MODAL */}
                <AnimatePresence>
                    {showModal &&
                        <Modal
                            type={type}
                            userId={userId}
                            id={id}
                            name={name}
                            setShowModal={setShowModal}
                        />
                    }
                </AnimatePresence>
            </div>

        </div>
    )
}
