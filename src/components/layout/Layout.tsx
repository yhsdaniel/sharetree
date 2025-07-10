import React, { lazy, ReactNode } from 'react'
import LayoutLinkWrapper from '@/app/admin/LayoutLinkWrapper'
import UserListProvider from '@/context/UserListProvider'
import Sidebar from '../Sidebar'
import DeviceUI from '../DeviceUI'

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