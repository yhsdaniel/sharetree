'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'
import '@/app/navbar.css'
import toast from 'react-hot-toast'
import { DropdownMenuComponent } from './DropdownMenu'

import { ChevronDown, Github, Headset, Instagram, Link as LinkUrl, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { PaintBrushIcon } from '@heroicons/react/24/outline'


const SidebarComponent = () => {
    const { data: session } = useSession()
    const user = session?.user
    const username = (user && 'username' in user ? user?.username : undefined) || session?.user?.name
    const router = useRouter()
    const pathName = usePathname()

    const items = [
        {
            url: `/admin/${username}/links`,
            icon: <LinkUrl />,
            title: 'Links'
        },
        {
            url: `/admin/${username}/design`,
            icon: <PaintBrushIcon />,
            title: 'Design'
        },
    ]
    const itemOthers = [
        {
            url: 'https://github.com/yhsdaniel/sharetree',
            icon: <Github />,
            title: 'Source code'
        },
        {
            url: 'https://instagram.com/yhskris',
            icon: <Instagram />,
            title: 'Our Instagram'
        },
        {
            url: 'https://wa.me/+6281212633852',
            icon: <Headset />,
            title: 'Customer Service'
        },
    ]

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false })
            toast.success('Log Out successfully')
            router.push('/login')
        } catch (error) {
            console.error("Error Signing out", error)
        }
    }

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem className='flex items-center'>
                            <Link href="/" className="-m-1.5 p-1.5">
                                <Image
                                    alt="Logo"
                                    width={200}
                                    height={200}
                                    src={logo}
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <span className='ml-2 text-2xl text-green-700 font-bold cursor-pointer'>Sharetree</span>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <Collapsible defaultOpen={true} className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    My Sharetree
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title} className='rounded-lg'>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url} className={pathName === item.url ? 'flex items-center w-full p-4 bg-gray-200 text-[--sidebar-accent-foreground] rounded-lg duration-100 ease-in-out' : 'flex items-center w-full p-4 hover:bg-gray-200 text-[--sidebar-accent-foreground] rounded-lg duration-100 ease-in-out'}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                    <SidebarGroup>
                        <SidebarGroupLabel>Others</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {itemOthers.map((item) => (
                                    <SidebarMenuItem key={item.title} className='hover:bg-gray-200 text-[--sidebar-accent-foreground] rounded-lg duration-100 ease-in-out'>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenuComponent
                                username={username}
                                image={user?.image}
                                signout={handleSignOut}
                            />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}

export default SidebarComponent