import React from 'react'
import { Button } from './ui/button'

export default function MainWrapper() {
  return (
    <div className='h-full md:ml-[320px] md:mr-[230px] lg:mr-[316px] xl:mr-[460px] p-2 overflow-y-auto flex justify-center'>
        <div className='w-full bg-white p-4 rounded-2xl'>
            <Button variant="default" className='w-full h-10 rounded-2xl'>Add Link</Button>
        </div>
    </div>
  )
}
