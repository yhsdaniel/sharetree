import React, { lazy, ReactNode, useContext } from 'react'
import LayoutLinkWrapper from '@/app/admin/LayoutLinkWrapper'
import UserListProvider, { UserListContext } from '@/context/UserListProvider'
import Sidebar from '../Sidebar'
import DeviceUI from '../DeviceUI'
import DeviceUIMobile from '../DeviceUIMobile'

type LayoutProps = {
    children: ReactNode,
    window?: Window,
    onUpdate?: (update: { id: string, name: string, url: string }) => void,
    onUpdateAddAndDelete?: (update: { id?: string, name: string, url?: string }) => void,
    refresh?: () => void
}

const Layout = ({ children, window }: LayoutProps) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const userContext = useContext(UserListContext)

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
                <Sidebar />
                <LayoutLinkWrapper>
                    {children}
                </LayoutLinkWrapper>
                {isMobile ? 
                    <DeviceUIMobile updatedNewAndDelete={updatedNewAndDelete} /> 
                    : 
                    <DeviceUI />}
            </UserListProvider>
        </div>
    )
}

export default Layout