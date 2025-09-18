'use client'

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import logo from '@/assets/images/logo.png'
import LinkComponent from '@/components/LinkComponent'
import { useQuery } from '@apollo/client'
import { GET_USER_QUERY } from '@/graphql/accessQuery'
import React, { use, useEffect } from 'react'

interface Props {
    params: Promise<{ username: string }>
}

const UserForPublic = ({ params }: Props) => {
    const { username } = React.use(params)
    const { data } = useQuery(GET_USER_QUERY, {
        variables: { username },
        fetchPolicy: 'cache-and-network',
    })

    return (
        <div className='size-full overflow-auto bg-gray-700 flex justify-center items-center'>
            <div className='h-full w-full md:w-[30%] md:mt-12 flex flex-col justify-center items-center'>
                <div className={`size-full relative flex flex-col justify-start items-center p-4 ${data?.user?.theme} md:rounded-3xl shadow-lg shadow-gray-500`}>
                    <div className='text-white p-4 flex flex-col justify-center items-center'>
                        <div className='rounded-full bg-white w-20 h-20 flex justify-center items-center'>
                            <h1 className='text-black'>{username.charAt(0).toUpperCase()}</h1>
                        </div>
                        <h1 className='text-xl font-bold my-4'>{`@${username}`}</h1>
                    </div>
                    <LinkComponent username={username} />
                </div>

                {/* FOOTER */}
                <div className='w-full fixed flex justify-center items-center bottom-0 bg-gradient-to-t from-gray-950 to-transparent shadow-lg shadow-gray-500'>
                    <Link
                        href={'/'}
                        className='md:relative bottom-0 m-8 p-2 text-sm bg-white w-7/12 md:w-2/12 rounded-2xl -translate-y-12 flex justify-center items-center animate-bounce'
                    >
                        <Image
                            src={logo}
                            alt='Logo'
                            width={45}
                            height={45}
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
