import { Input } from '@/components/ui/input';
import { GripVertical, Trash } from 'lucide-react';
import React from 'react'

export default function LoadingLinks() {
    return (
        <div className='size-full flex animate-pulse border overflow-auto bg-white border-gray-300 shadow-lg rounded-3xl mt-4 py-4 pr-0 md:py-6 md:pr-0 px-6 md:px-16'>
            <div className="w-9/12 flex flex-col gap-4">
                <div className="flex justify-between items-center cursor-pointer bg-gray-200">
                    <Input
                        type='text'
                        className='my-4'
                    />
                </div>

                <div className="w-full text-sm flex justify-between items-center cursor-pointer bg-gray-200">
                    <Input
                        type='text'
                        className='my-4'
                    />
                </div>
            </div>

            <div className="w-3/12 flex justify-center items-center gap-4">
                <button className='size-6 cursor-pointer flex justify-center items-center bg-gray-200 duration-150 ease-in'>
                    <Trash className="md:w-5 w-4" />
                </button>
                <button className='size-6 cursor-grab flex justify-center items-center bg-gray-200'>
                    <GripVertical className="md:w-5 w-4" />
                </button>
            </div>

        </div>
    )
}
