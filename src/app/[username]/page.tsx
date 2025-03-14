import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import logo from '/public/images/logo.png'
import { getUserLinks } from '@/lib/getuserlinks'

const ListDeviceComponent = dynamic(() => import('@/components/LinkComponent'), { ssr: false })

interface Props {
    params: { username: string }
}

const UserForPublic = async ({ params }: Props) => {
    const username = params.username
    const listLinks = await getUserLinks(username)

    if (!username) {
        return notFound()
    }

    return (
        <div className='w-full h-screen overflow-hidden bg-black/70 flex justify-center items-center'>
            <div className='size-full flex flex-col justify-center items-center'>
                <div className='size-full overflow-auto pb-20 md:pb-0 shadow-xl shadow-gray-400 relative flex flex-col justify-start items-center'>
                    <div className='text-white p-4 flex justify-center items-center'>
                        <div className='rounded-full bg-white w-20 h-20 flex justify-center items-center'>
                            <h1 className='text-black'>{username.charAt(0).toUpperCase()}</h1>
                        </div>
                    </div>
                    <ListDeviceComponent listLinks={listLinks} username={username} pathName={`/${username}`} />
                    <Link
                        href={'/'}
                        className='fixed md:relative bottom-0 md:m-10 p-4 text-sm bg-white md:bg-white/70 hover:bg-white w-full md:w-1/3 md:rounded-3xl flex justify-center items-center duration-150 ease-in-out'
                    >
                        <Image alt='Logo' src={logo} width={25} height={25} className='mx-2' />
                        Join on Sharetree
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserForPublic
