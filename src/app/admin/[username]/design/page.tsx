'use client'

import BackgroundDesign from './BackgroundDesign'
import ForegroundDesign from './ForegroundDesign'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_THEME } from '@/graphql/accessQuery'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

const deviceThemes = [
    { background: 'bg-gray-400' },
    { background: 'bg-red-400' },
    { background: 'bg-blue-400' },
    { background: 'bg-yellow-500' },
    { background: 'bg-green-500' },
    { background: 'bg-purple-400' },
    { background: 'bg-gray-500' },
    { background: 'bg-pink-400' },
]

export type ThemeProps = {
    deviceThemes: any,
    handleThemeUpdate: (index: number) => void
}

export default function DesignWrapper() {
    const session = useSession()
    const id_user = session?.data?.user?.id
    const [updateTheme] = useMutation(UPDATE_USER_THEME);

    const handleThemeUpdate = (index: number) => {
        const selectedBackground = deviceThemes[index].background;
        updateTheme({
            variables: { id: id_user, theme: selectedBackground },
            onCompleted: () => {
                toast.success("Theme updated successfully!");
            },
            onError: () => {
                toast.error("Error updating theme");
            }
        });
    };

    return (
        <div className='h-full bg-white rounded-2xl'>
            <section className='px-4 md:py-4 mt-4 flex justify-between items-center'>
                <h4 className='my-2'>Appearance</h4>
            </section>
            <hr className='my-4' />
            <BackgroundDesign deviceThemes={deviceThemes} handleThemeUpdate={handleThemeUpdate}/>
            {/* <ForegroundDesign deviceThemes={deviceThemes} handleThemeUpdate={handleThemeUpdate}/> */}
        </div>
    )
}
