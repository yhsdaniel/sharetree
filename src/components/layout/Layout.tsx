import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import LayoutLinkWrapper from '@/app/admin/LayoutLinkWrapper'
import UserListProvider from '@/context/UserListProvider'

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false })
const DeviceUI = dynamic(() => import('@/components/DeviceUI'), { ssr: false })

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='size-full bg-gray-200'>
            <UserListProvider>
                <Sidebar />
                <LayoutLinkWrapper>
                    {children}
                </LayoutLinkWrapper>
                <DeviceUI />
            </UserListProvider>
        </div>
    )
}

export default Layout