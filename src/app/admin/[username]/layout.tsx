'use client'

import React, { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { SidebarProvider } from '@/components/ui/sidebar'
import Navbar from '@/components/Navbar'
import SidebarComponent from '@/components/SidebarComponent'
import LayoutLinkWrapper from '@/components/layout/LayoutLinkWrapper'
import DeviceUIMobile from '@/components/DeviceUIMobile'
import DeviceUI from '@/components/DeviceUI'
import { useIsMobile } from '@/components/hooks/use-mobile'

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const isMobile = useIsMobile()
    const { status } = useSession()

    return (
        <div className='size-full bg-white md:bg-gray-200'>
            <SidebarProvider>
                {isMobile ? <Navbar status={status} /> : <SidebarComponent />}
                <LayoutLinkWrapper>{children}</LayoutLinkWrapper>
                {isMobile
                    ? <DeviceUIMobile />
                    : <DeviceUI />}
            </SidebarProvider>
        </div>
    )
}

export default Layout