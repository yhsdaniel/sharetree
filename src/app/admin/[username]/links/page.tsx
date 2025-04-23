'use client'

import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'

const LinkWrapper = dynamic(() => import('@/app/admin/[username]/links/LinkWrapper'), { ssr: false })

export default function LinksPage() {
    return (
        <Layout>
            <LinkWrapper />
        </Layout>
    )
}
