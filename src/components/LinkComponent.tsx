'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/compat/router'
import { useQuery } from '@apollo/client'
import { GET_USER_QUERY } from '@/graphql/accessQuery'

type ListLinksProps = {
    username: string
}

const stylesLoader = {
    left: '50%',
    transform: 'translate(0px, 350px)',
    color: '#fff'
}

const classNameStyle = {
    linkAdmin: 'w-full border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-3 py-4 flex justify-center',
    linkPublic: 'w-full border-2 shadow-black shadow-lg border-gray-800 bg-white rounded-2xl my-2 p-4 py-5 flex justify-center hover:scale-[1.02] hover:shadow-lg duration-200 ease-in-out',
    spanAdmin: 'text-xs text-gray-500 font-bold',
    spanPublic: 'text-xs text-gray-500 font-bold'
}

const LinkComponent = React.memo(({ username }: ListLinksProps) => {
    const router = useRouter()
    const isAdminRoute = router?.asPath.startsWith('/admin')

    const { data, loading } = useQuery(GET_USER_QUERY, {
        variables: { username: username },
    })
    const links = data?.user?.link || []

    if(loading) return <div className='w-full h-full flex justify-center items-center'><div className='loader' style={stylesLoader}></div></div>

    return (
        <>
            {links
                .filter((value: any) => value.url !== null && value.url !== undefined)
                .map((value: any) => (
                <Link 
                    key={value._id} 
                    href={value.url} 
                    className={isAdminRoute ? classNameStyle.linkAdmin : classNameStyle.linkPublic}
                >
                    <span className={isAdminRoute ? classNameStyle.spanAdmin : classNameStyle.spanPublic}>{value.name}</span>
                </Link>
            ))}
        </>
    )
})

LinkComponent.displayName = "LinkComponent"

export default LinkComponent