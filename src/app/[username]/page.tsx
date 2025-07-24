import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import logo from '@/assets/images/logo.png'
import { getUserLinks } from '@/lib/getuserlinks'
import ListDeviceWrapper from '@/components/ListDeviceWrapper'

interface Props {
    params: { username: string }
}

const UserForPublic = async ({ params }: Props) => {
    const username = params.username
    if (!username) notFound()

    const linkUser = await getUserLinks(username)


    return (
        <div className='size-full overflow-auto bg-gray-700 flex justify-center items-center'>
            <div className='h-full w-[80%] md:w-[40%] mb-40 mt-12 flex flex-col justify-center items-center'>
                <div className='w-full relative flex flex-col justify-start items-center'>
                    <div className='text-white p-4 flex flex-col justify-center items-center'>
                        <div className='rounded-full bg-white w-20 h-20 flex justify-center items-center'>
                            <h1 className='text-black'>{username.charAt(0).toUpperCase()}</h1>
                        </div>
                        <h1 className='text-xl font-bold my-4'>{`@${username}`}</h1>
                    </div>
                    <ListDeviceWrapper listLinks={linkUser}/>
                </div>

                {/* FOOTER */}
                <div className='w-full fixed flex justify-center items-center bottom-0 bg-gradient-to-t from-gray-950 to-transparent shadow-lg shadow-gray-500'>
                    <Link
                        href={'/'}
                        className='md:relative bottom-0 m-8 p-4 text-sm bg-white w-7/12 md:w-2/12 rounded-3xl -translate-y-12 flex justify-center items-center duration-150 ease-in-out animate-bounce'
                    >
                        <Image 
                            src={logo} 
                            alt='Logo'
                            width={50} 
                            height={50}
                            className='mx-2' 
                        />
                        Join on Sharetree
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserForPublic
