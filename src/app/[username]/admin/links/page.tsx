'use client'

import LinkWrapper from '@/app/[username]/admin/links/LinkWrapper'
import React from 'react'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'

export default function LinksPage() {
    const { data: session, status } = useSession()

    if (status === 'authenticated') {
        return (
            <div>
                <Layout>
                    <LinkWrapper />
                </Layout>
            </div>
        )
    }
}
