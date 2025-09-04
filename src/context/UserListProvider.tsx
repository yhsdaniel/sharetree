'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_LINK_MUTATION, DELETE_LINK_MUTATION, GET_USER_QUERY, UPDATE_LINK_MUTATION } from '@/graphql/accessQuery'

type LayoutProps = {
    children: ReactNode
}

type LinkType = {
    _id: string,
    url: string,
    name: string
}

type UserListContextType = {
    userState: string,
    userImage: string | undefined,
    listLinks?: LinkType[],
    idUser: string | undefined,
    setListLinks?: React.Dispatch<React.SetStateAction<LinkType[]>>,
    refresh?: () => void
    // updatedNewAndDelete: (update: { id?: string, name: string, url?: string }) => void
}

export const UserListContext = createContext<UserListContextType | null>(null)

const UserListProvider = ({ children }: LayoutProps) => {
    const [userState, setUserState] = useState('')
    const [listLinks, setListLinks] = useState<LinkType[]>([])
    const [refreshFlag, setRefreshFlag] = useState(0)

    const { data: session } = useSession()
    const userImage = session?.user?.image
    const user = session?.user
    const idUser = user && 'id' in user ? user?.id : undefined
    const { data, refetch } = useQuery(GET_USER_QUERY, {
        variables: { id: idUser },
        skip: !idUser,
        fetchPolicy: 'network-only'
    })

    // --- Add updatedNewAndDelete function here ---
    // const updatedNewAndDelete = (update: { id?: string, name: string, url?: string }) => {
    //     setListLinks((prevLinks) => {
    //         const safeLinks = prevLinks.filter((item): item is LinkType => !!item && typeof item._id === 'string')
    //         const exists = update.id && safeLinks.some((item) => item._id === update.id)
    //         if (update.id && exists) {
    //             // Delete it
    //             return safeLinks.filter((item) => item._id !== update.id)
    //         }
    //         // Add new
    //         return [...safeLinks, { _id: update.id || '', name: update.name, url: update.url || '' }]
    //     })
    // }

    useEffect(() => {
        if(data?.user){
            setUserState(data?.user?.username)
            setListLinks(data?.user?.link)
        }
    }, [data])

    useEffect(() => {
        if(idUser){
            refetch()
        }
    }, [idUser, refreshFlag, refetch])

    return (
        <div className='size-full'>
            <UserListContext.Provider
                value={{
                    idUser,
                    userState,
                    userImage,
                    listLinks,
                    setListLinks,
                    refresh: () => setRefreshFlag((prev) => prev + 1),
                    // updatedNewAndDelete
                }}>
                {children}
            </UserListContext.Provider>
        </div>
    )
}

export default UserListProvider