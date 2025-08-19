'use client'

import React, { lazy, ReactNode, useContext } from 'react'
import UserListProvider, { UserListContext } from '@/context/UserListProvider'
import { useSession } from 'next-auth/react'
import { SidebarProvider } from '@/components/ui/sidebar'
import Navbar from '@/components/Navbar'
import SidebarComponent from '@/components/SidebarComponent'
import LayoutLinkWrapper from '@/components/layout/LayoutLinkWrapper'
import DeviceUIMobile from '@/components/DeviceUIMobile'
import DeviceUI from '@/components/DeviceUI'
import { useIsMobile } from '@/hooks/use-mobile'

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const isMobile = useIsMobile()
    const userContext = useContext(UserListContext)
    const { status } = useSession()
    const updatedNewAndDelete = userContext?.updatedNewAndDelete;

    return (
        <div className='size-full bg-white md:bg-gray-200'>
            <UserListProvider>
                <SidebarProvider>
                    {isMobile ? <Navbar status={status} /> : <SidebarComponent />}
                    <LayoutLinkWrapper>{children}</LayoutLinkWrapper>
                    {isMobile
                        ? <DeviceUIMobile updatedNewAndDelete={updatedNewAndDelete} />
                        : <DeviceUI />}
                </SidebarProvider>
            </UserListProvider>
        </div>
    )
}

export default Layout