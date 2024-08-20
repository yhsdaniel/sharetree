'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import SettingsWrapper from './SettingWrapper'

export default function SettingPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(status === 'unauthenticated' || !session){
            router.push('/login')
        }
    }, [router, session, status])

    if(status === 'authenticated'){
        return(
            <div>
                <Layout>
                    <SettingsWrapper />
                </Layout>
            </div>
        )
    }
}
