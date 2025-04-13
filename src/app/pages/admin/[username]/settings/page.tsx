'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Layout from '@/components/Layout'
import SettingsWrapper from './SettingWrapper'
import LayoutLinkWrapper from '../../LayoutLinkWrapper'
import { useRouter } from 'next/navigation'

export default function SettingPage() {
    const [userState, setUserState] = useState('')
    const router = useRouter()
    
    const { data: session, status } = useSession()
    const user = session?.user
    const idUser = user && 'id' in user ? user?.id : undefined
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`/api/linkadmin`, { params: { id: idUser } })
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
