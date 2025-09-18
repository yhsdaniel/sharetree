'use client'

import { useQuery } from '@apollo/client'
import BackgroundDesign from './BackgroundDesign'
import ForegroundDesign from './ForegroundDesign'
import { GET_USER_QUERY } from '@/graphql/accessQuery'

export default function DesignWrapper() {
    return (
        <div className='h-full bg-white rounded-2xl'>
            <h4 className='px-4 md:py-4 md:my-0'>Appearance</h4>
            <hr className='my-4'/>
            <BackgroundDesign />
            <ForegroundDesign />
        </div>
    )
}
