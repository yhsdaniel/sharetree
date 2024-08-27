'use client'

import LinkWrapper from '@/app/[username]/admin/links/LinkWrapper'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Layout from '@/components/Layout'

export default function LinksPage() {
    const { data: session, status } = useSession()

    if (status === 'authenticated') {
        return (
            <Layout>
                <LinkWrapper />
            </Layout>
        )
    }
}
