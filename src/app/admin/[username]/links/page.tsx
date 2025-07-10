'use client'

import Layout from '@/components/layout/Layout'
import client from '@/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import LinkWrapper from './LinkWrapper'

export default function LinksPage() {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <LinkWrapper />
            </Layout>
        </ApolloProvider>
    )
}
