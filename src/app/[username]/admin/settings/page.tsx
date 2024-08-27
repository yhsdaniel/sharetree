'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import SettingsWrapper from './SettingWrapper'

export default function SettingPage() {
    const { data: session, status } = useSession()

    if (status === 'authenticated') {
        return (
            <Layout>
                <SettingsWrapper />
            </Layout>
        )
    }
}
