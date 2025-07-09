'use client'

import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

type URLForm = {
    url: string,
    name: string,
    owner: string
}

export const useLinkModal = (initialOwner: string, onClose: () => void) => {
    const [fillLink, setFillLink] = useState<URLForm>({
        url: '',
        name: '',
        owner: initialOwner
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target

        setFillLink((preValues) => ({
            ...preValues,
            [name]: value
        }))
    }

    const handleSubmitAdd = async () => {
        await axios.post(`/api/linkadmin`, fillLink)
            .then((response) => {
                if (response) {
                    toast.success('Your link has been added')
                    onClose()
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong')
            })
    }

    const handleSubmitDelete = async (id: string, name: string) => {
        await axios.delete(`/api/linkadmin`, { data: { id } })
            .then((response) => {
                if (response) {
                    toast.success(`Deleted link successfully`)
                    onClose()
                    window.location.reload()
                }
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong')
            })
    }

    return {
        fillLink,
        handleChange,
        handleSubmitAdd,
        handleSubmitDelete
    }
}