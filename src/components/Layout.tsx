import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false })
const DeviceUI = dynamic(() => import('@/components/DeviceUI'), { ssr: false })

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