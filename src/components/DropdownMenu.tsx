import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"

import { CircleUser, LogOut, Settings, User } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

type DropDownProps = {
    username: string | undefined | null,
    image: string | undefined,
    signout: () => void
}

export function DropdownMenuComponent({ username, image, signout }: DropDownProps) {
    const isMobile = useIsMobile()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full my-0 md:my-2 py-0 pr-6 pl-0 md:px-2 h-auto justify-start rounded-3xl focus-visible:shadow-none"
                >
                    {image ? (
                        <>
                            <Image
                                src={image}
                                alt='Profile'
                                width={20}
                                height={20}
                                referrerPolicy='no-referrer'
                                className='rounded-full w-9 mr-3 my-1 ml-1'
                            />
                            <span className='text-black/80 font-bold text-xs md:text-base'>{`${username}`}</span>
                        </>
                    ) : (
                        <>
                            <div className='rounded-full bg-white border border-gray-300 flex justify-center items-center mr-2'>
                                <h3 className='text-black font-bold size-8 m-0 flex justify-center items-center'>{username?.charAt(0).toUpperCase()}</h3>
                            </div>
                            {username}
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {isMobile &&
                        <Link href={`/admin/${username}/links`}>
                            <DropdownMenuItem>
                                Admin
                                <DropdownMenuShortcut><User /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                    }
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut><CircleUser /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut><Settings /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signout}>
                    Log out
                    <DropdownMenuShortcut><LogOut /></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
