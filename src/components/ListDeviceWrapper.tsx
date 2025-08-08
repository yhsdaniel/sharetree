'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import your component (client-only)
const ListComponent = dynamic(() => import('./LinkComponent'), {
  ssr: false, // disable SSR
  loading: () => <div className='w-full h-full flex justify-center items-center'><div className='loader'></div></div>,
})

export default function ListDeviceWrapper({ listLinks }: { listLinks: any[] }) {
  return (
    <Suspense fallback={<div className='w-full h-full flex justify-center items-center'><div className='loader'></div></div>}>
      <ListComponent listLinks={listLinks} />
    </Suspense>
  )
}
