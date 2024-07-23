'use client'

import DeviceUI from '@/components/DeviceUI'
import MainWrapper from '@/components/MainWrapper'
import Sidebar from '@/components/Sidebar'
import React, { useEffect } from 'react'
import LoginPage from '../login/page'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/login')
        }
    }, [status])

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
