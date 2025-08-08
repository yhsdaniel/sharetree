'use client'

import { UserListContext } from '@/context/UserListProvider'
import React, { useContext } from 'react'

export default function DesignWrapper() {
    const userContext = useContext(UserListContext)

    return (
        <div className='h-full bg-black md:w-1/2 p-2 flex justify-center items-center'>
            <div className='size-full p-4 flex flex-col justify-start items-center gap-1'>
                <div className='text-white'><h1>Sharetree</h1></div>
                <div className='text-white font-bold my-4'>@{userContext?.userState}</div>
                <div className='w-full border border-gray-300 bg-white shadow-lg rounded-2xl my-3 p-3 py-4 flex justify-center'></div>.
            </div>
        </div>
    )
}
