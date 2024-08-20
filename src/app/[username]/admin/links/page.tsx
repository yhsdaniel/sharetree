'use client'

import LinkWrapper from '@/app/[username]/admin/links/LinkWrapper'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'

export default function LinksPage() {
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
                    <LinkWrapper />
                </Layout>
            </div>
        )
    }
}
