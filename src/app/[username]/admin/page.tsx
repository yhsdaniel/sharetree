'use client'

import DeviceUI from '@/app/[username]/admin/DeviceUI'
import MainWrapper from '@/app/[username]/admin/MainWrapper'
import Sidebar from '@/app/[username]/admin/Sidebar'
import React, { useEffect } from 'react'
import LoginPage from '../../login/page'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/login')
        }
    }, [router, status])

    if(status === 'authenticated'){
        return(
            <div className='size-full bg-gray-200'>
                <Sidebar />
                <MainWrapper />
                <DeviceUI />
            </div>
        )
    }
}
