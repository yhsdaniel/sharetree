'use client'

import dynamic from 'next/dynamic'

const stylesLoader = {
  left: '50%',
  transform: 'translate(0px, 350px)',
  color: '#fff'
}

// Dynamically import your component (client-only)
const ListComponent = dynamic(() => import('./LinkComponent'), {
  ssr: false, // disable SSR
  loading: () => <div className='w-full h-full flex justify-center items-center'><div className='loader' style={stylesLoader}></div></div>,
})


export default function ListDeviceWrapper({ listLinks }: { listLinks: any[] }) {
  return (
    <ListComponent listLinks={listLinks} />
  )
}
