import React, { lazy, ReactNode, useContext } from 'react'
import LayoutLinkWrapper from './LayoutLinkWrapper'
import UserListProvider, { UserListContext } from '@/context/UserListProvider'
import SidebarComponent from '../SidebarComponent'
import DeviceUI from '../DeviceUI'
import DeviceUIMobile from '../DeviceUIMobile'
import { useIsMobile } from '../hooks/use-mobile'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import Navbar from '../Navbar'
import { useSession } from 'next-auth/react'

type LayoutProps = {
    children: ReactNode,
    onUpdate?: (update: { id: string, name: string, url: string }) => void,
    onUpdateAddAndDelete?: (update: { id?: string, name: string, url?: string }) => void,
    refresh?: () => void
}

const Layout = ({ children }: LayoutProps) => {
    const isMobile = useIsMobile()
    const userContext = useContext(UserListContext)
    const { data: session, status } = useSession()

    const updatedNewAndDelete = (update: { id?: string, name: string, url?: string }) => {
        if (userContext?.setListLinks) {
            userContext?.setListLinks((prevLinks: any[]) => {
                const exists = prevLinks.some((item: any) => item._id === update.id);
                if (exists) {
                    // Delete it
                    const updateLinkAfterDelete = prevLinks.filter((item: any) => item._id !== update.id)
                    return updateLinkAfterDelete
                } else {
                    // Add new
                    return [...prevLinks, { name: update.name, url: update.url }];
                }
            })
        }
    }

    return (
        <div className='size-full bg-white md:bg-gray-200'>
            <UserListProvider>
                <SidebarProvider>
                    {isMobile ? 
                        <Navbar status={status}/>
                        :
                        <SidebarComponent />
                    }
                    <LayoutLinkWrapper>
                        {children}
                    </LayoutLinkWrapper>
                    {isMobile 
                        ? 
                        <DeviceUIMobile updatedNewAndDelete={updatedNewAndDelete} /> 
                        : 
                        <DeviceUI />}
                </SidebarProvider>
            </UserListProvider>
        </div>
    )
}

export default Layout