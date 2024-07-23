'use client'

import { motion } from 'framer-motion'

const resultURL = [
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/daniel-kristiawan-939a3b169/'
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/yhskris'
  }
]

export default function DeviceUI() {
  return (
    <motion.div 
      initial={{ opacity: 0, translateX: 100}}
      animate={{ opacity: 1, translateX: 1}}
      transition={{ duration: .5}}
      className='h-screen w-full md:max-w-[230px] lg:max-w-[316px] xl:max-w-[460px] p-2 md:fixed md:right-0 top-0'
    >
        <div className='size-full rounded-2xl flex justify-center items-center'>
            <div className='w-[18rem] h-[35rem] bg-white shadow-2xl rounded-3xl relative flex justify-center items-center'>
                <div className='w-[17.5rem] h-[35rem] bg-black shadow-lg rounded-3xl absolute -top-2 p-4'>
                  {resultURL.map((value, index) => (
                    <div key={index} className='w-full border border-gray-300 bg-white shadow-lg rounded-xl my-4 p-3 flex justify-center'>
                      <span className='text-sm'>{value.name}</span>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    </motion.div>
  )
}
