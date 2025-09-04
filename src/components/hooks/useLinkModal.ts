'use client'

import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { CREATE_LINK_MUTATION, DELETE_LINK_MUTATION, GET_USER_QUERY } from '@/graphql/accessQuery'

type URLForm = {
    url: string,
    name: string,
}

export const useLinkModal = (onClose: () => void) => {
    const [fillLink, setFillLink] = useState<URLForm>({
        url: '',
        name: '',
    })

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        refetchQueries: [{ query: GET_USER_QUERY }],
        update(cache, { data }) {
            if (!data.createLink) return
            const newLink = data.createLink
            cache.modify({
                fields: {
                    user(existingUser) {
                        if (!existingUser) return
                        return {
                            ...existingUser,
                            link: [ ...(existingUser.link || []), newLink ]
                        }
                    }
                }
            })
        },
        onCompleted: () => {
            toast.success('Your link has been added')
            onClose()
        },
        onError: () => toast.error('Something went wrong'),
    })
    const [deleteLink] = useMutation(DELETE_LINK_MUTATION, {
        refetchQueries: [{ query: GET_USER_QUERY }],
        update(cache, _result, { variables }) {
            cache.modify({
                fields: {
                    user(existingUser) {
                        if (!existingUser) return
                        return {
                            ...existingUser,
                            link: (existingUser.link || []).filter((l: any) => l._id !== (variables?.id ?? ''))
                        }
                    },
                },
            })
        },
        onCompleted: () => {
            toast.success('Link deleted successfully')
            onClose()
        },
        onError: () => toast.error('Something went wrong'),
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
        if (!fillLink.name || !fillLink.url) return
        await createLink({ variables: { name: fillLink.name, url: fillLink.url } })
    }

    const handleSubmitDelete = async (userId: string, id: string) => {
        await deleteLink({ variables: { userId, id } })
    }

    return {
        fillLink,
        handleChange,
        handleSubmitAdd,
        handleSubmitDelete
    }
}