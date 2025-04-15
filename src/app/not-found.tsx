'use client'

import Image from 'next/image'
import notFound from '../../public/images/404.png'

export default function Custom404() {
    return (
        <div className='size-full bg-white flex justify-center items-center'>
            <Image
                src={notFound}
                alt="404-not-found"
                className='size-auto object-cover'
                width={500}
                height={800}
                priority={true}
            />
        </div>
    )
}
