'use client'

import Image from 'next/image'
import notFound from '@/assets/images/404.png'

export default function Custom404() {
    return (
        <div className='size-full bg-white flex justify-center items-center'>
            <Image
                src={notFound}
                alt="404-not-found"
                width={500}
                height={800}
                className='size-auto object-cover'
            />
        </div>
    )
}
