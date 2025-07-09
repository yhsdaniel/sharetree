'use client'

import Layout from '@/components/layout/Layout'
import client from '@/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import dynamic from 'next/dynamic'

const LinkWrapper = dynamic(() => import('@/app/admin/[username]/links/LinkWrapper'), { ssr: false })

export default function LinksPage() {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <LinkWrapper />
            </Layout>
        </ApolloProvider>
    )
}
