import React, { createContext, ReactNode, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import LayoutLinkWrapper from '@/app/admin/LayoutLinkWrapper'

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false })
const DeviceUI = dynamic(() => import('@/components/DeviceUI'), { ssr: false })

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

const Layout = ({ children }: LayoutProps) => {
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
                    setUserState(response.username)
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
                <Sidebar />
                <LayoutLinkWrapper>
                    {children}
                </LayoutLinkWrapper>
                <DeviceUI />
            </UserListContext.Provider>
        </div>
    )
}

export default Layout