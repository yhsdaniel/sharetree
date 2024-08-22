import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AppProps {
    url: string,
    name: string
}

const LinkDeviceComponent = React.memo(({ url, name }: AppProps) => {
    const { data: session } = useSession()
    const pathName = usePathname()
    const user = session?.user
    const username = (user && 'username' in user ? user?.username : undefined) || session?.user?.name

    return (
        <>
            <Link href={url} className={pathName === `/${username}` ? 'w-10/12 md:w-1/3 border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-4 flex justify-center' : 'w-11/12 border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-4 flex justify-center'}>
                <span className='text-sm'>{name}</span>
            </Link>
        </>
    )
})

LinkDeviceComponent.displayName = 'LinkDeviceComponent'

export default LinkDeviceComponent