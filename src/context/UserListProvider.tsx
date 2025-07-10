import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

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
    listLinks?: LinkType[],
    setListLinks?: React.Dispatch<React.SetStateAction<LinkType[]>>
}

export const UserListContext = createContext<UserListContextType | null>(null)

const UserListProvider = ({ children }: LayoutProps) => {
    const { data: session } = useSession()
    const [userState, setUserState] = useState('')
    const [listLinks, setListLinks] = useState<LinkType[]>([])

    const user = session?.user
    const idUser = user && 'id' in user ? user?.id : undefined

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (idUser) {
                    const { data: response } = await axios.get(`/api/linkadmin`, { params: { id: idUser } })
                    setUserState(response.username || response.name)
                    setListLinks(response.link)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [idUser])

    return (
        <div className='size-full bg-gray-200'>
            <UserListContext.Provider value={{ userState, listLinks, setListLinks }}>
                {children}
            </UserListContext.Provider>
        </div>
    )
}

export default UserListProvider