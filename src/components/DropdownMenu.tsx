import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CircleUser, LogOut, Settings } from 'lucide-react'

type DropDownProps = {
    username: string | undefined | null,
    image: string | undefined,
    signout: () => void
}

export function DropdownMenuComponent({ username, image, signout }: DropDownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full my-2 mx-4 py-2 pr-6 pl-2 md:px-2 h-auto justify-start rounded-3xl"
                >
                    {image ? (
                        <>
                            <img
                                src={`${image}`}
                                alt='Profile Poc'
                                referrerPolicy='no-referrer'
                                loading='lazy'
                                className='rounded-full w-9 mr-3'
                            />
                            {`${username}`}
                        </>
                    ) : (
                        <>
                            <div className='rounded-full bg-white border border-gray-300 flex justify-center items-center mr-2'>
                                <h3 className='text-black size-8 m-0 flex justify-center items-center'>{username?.charAt(0).toUpperCase()}</h3>
                            </div>
                            {username}
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
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
