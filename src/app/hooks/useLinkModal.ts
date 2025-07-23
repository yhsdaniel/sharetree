'use client'

import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

type URLForm = {
    url: string,
    name: string,
    owner: string
}

export const useLinkModal = (
    initialOwner: string,
    onClose: () => void,
    onUpdate?: (update: { id?: string | undefined, name: string, url?: string }) => void,
    refresh?: () => void
) => {
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
                    if (onUpdate) {
                        onUpdate({ name: fillLink.name, url: fillLink.url })
                    }
                    refresh?.()
                    onClose()
                }
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong')
            })
    }

    const handleSubmitDelete = async (  userId: string, id: string, name: string) => {
        await axios.delete(`/api/linkadmin`, { data: { userId, id } })
            .then((response) => {
                if (response) {
                    // const strToObj = JSON.parse(response.config.data)
                    // const valueOfObj = Object.values(strToObj)
                    // console.log(typeof valueOfObj[0])
                    toast.success(`Deleted ${name} successfully`)
                    if (onUpdate) {
                        onUpdate({ id, name })
                    }
                    refresh?.()
                    onClose()
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