'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Layout from '@/components/Layout'
import SettingsWrapper from './SettingWrapper'
import LayoutLinkWrapper from '../../LayoutLinkWrapper'
import { useRouter } from 'next/navigation'

// type LinkType = {
//     _id: string,
//     url: string,
//     name: string
// }

export default function SettingPage() {
    const [userState, setUserState] = useState('')
    // const [listLinks, setListLinks] = useState<LinkType[]>([])
    const router = useRouter()
    
    const { data: session, status } = useSession()
    const user = session?.user

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/linkadmin`, { params: { id: user && 'id' in user ? user?.id : undefined } })
                setUserState(response.username)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [user])

    if (status === 'authenticated') {
        return (
            <Layout>
                <LayoutLinkWrapper userState={userState}>
                    <SettingsWrapper />
                </LayoutLinkWrapper>
            </Layout>
        )
    }

    return router.push('/login')
}
