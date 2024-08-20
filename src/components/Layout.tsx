import React, { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import DeviceUI from '@/components/DeviceUI'

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='size-full bg-gray-200'>
            <Sidebar />
            <main className='h-screen'>{children}</main>
            <DeviceUI />
        </div>
    )
}

export default Layout