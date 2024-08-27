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

    if(!url){
        return <div>No Link available</div>
    }

    return (
        <>
            <Link href={url} className={pathName === `/${username}/admin/links` || pathName === `/${username}/admin/settings`
                ? 'w-full border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-4 flex justify-center' 
                : 'w-10/12 md:w-1/2 border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-4 flex justify-center'
            }>
                <span className='text-sm'>{name}</span>
            </Link>
        </>
    )
})

LinkDeviceComponent.displayName = 'LinkDeviceComponent'

export default LinkDeviceComponent