import DeviceUI from '@/components/DeviceUI'
import MainWrapper from '@/components/MainWrapper'
import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function AdminPage() {
    return (
        <div className='size-full bg-gray-200'>
            <Sidebar />
            <MainWrapper />
            <DeviceUI />
        </div>
    )
}
