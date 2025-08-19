'use client'

import comingsoon from '@/assets/images/coming-soon.png'
import Image from 'next/image'

export default function DesignWrapper() {
    return (
        <div className='size-full flex justify-center items-center'>
            <Image
                src={comingsoon}
                alt='Coming Soon'
                width={400}
                height={400}
                className='size-max'
            />
        </div>
    )
}
