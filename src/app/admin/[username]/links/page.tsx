'use client'

import LinkWrapper from '@/app/admin/[username]/links/LinkWrapper'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Layout from '@/components/Layout'
import LayoutLinkWrapper from '../../LayoutLinkWrapper'
import { useRouter } from 'next/navigation'

type LinkType = {
    _id: string,
    url: string,
    name: string
}

export default function LinksPage() {
    const { data: session, status } = useSession()
    const [userState, setUserState] = useState('')
    const [listLinks, setListLinks] = useState<LinkType[]>([])
    const router = useRouter()

    const user = session?.user
    const idUser = user && 'id' in user ? user?.id : undefined
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(idUser){
                    const { data: response } = await axios.get(`/api/linkadmin`, { params: { id: idUser } })
                    setUserState(response.username)
                    setListLinks(response.link)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [idUser, router, status])
    
    if(status === 'unauthenticated') {
        router.push('/login')
    }
    console.log(status)

    if (status === 'authenticated') {
        return (
            <Layout>
                <LayoutLinkWrapper userState={userState}>
                    <LinkWrapper linkWrapper={listLinks} />
                </LayoutLinkWrapper>
            </Layout>
        )
    }

}
