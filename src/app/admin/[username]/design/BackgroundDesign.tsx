'use client'

import { UPDATE_USER_THEME } from "@/graphql/accessQuery";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

const deviceThemes = [
    { background: 'bg-gray-400' },
    { background: 'bg-red-500' },
    { background: 'bg-blue-500' },
    { background: 'bg-yellow-500' },
    { background: 'bg-green-400' },
    { background: 'bg-purple-500' },
    { background: 'bg-gray-500' },
    { background: 'bg-pink-500' },
]

export default function BackgroundDesign() {
    const session = useSession()
    const id_user = session?.data?.user?.id
    const [selectedTheme, setSelectedTheme] = useState(0);
    const handleChangeChecked = (index: number) => {
        setSelectedTheme(index);
    };
    const [updateTheme] = useMutation(UPDATE_USER_THEME, {
        onCompleted: () => {
            toast.success("Theme updated successfully!");
        },
        onError: () => {
            toast.error("Error updating theme");
        }
    });

    const handleThemeUpdate = (index: number) => {
        const selectedBackground = deviceThemes[index].background;
        updateTheme({ variables: { id: id_user, theme: selectedBackground } });
    };
    return (
        <>
            <p className='px-4 md:py-4 font-bold text-xs md:text-sm text-gray-700'>Background color:</p>
            <div className='grid grid-flow-col md:grid-flow-row auto-cols-[13rem] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:h-2/4 md:gap-1 px-0 md:px-4 py-4 md:pb-10 overflow-auto'>
                {deviceThemes.map((theme, index) => (
                    <label key={index} htmlFor={`theme-${index}`} className={`size-full p-2 flex justify-center items-center cursor-pointer`}>
                        <input
                            type="radio"
                            name="device-theme"
                            id={`theme-${index}`}
                            value={selectedTheme}
                            className='peer hidden'
                            onChange={() => handleChangeChecked(index)}
                            onClick={() => handleThemeUpdate(index)}
                        />
                        <div className={`w-full overflow-auto ${theme.background} peer-checked:border-green-500 peer-checked:border-4 border-4 rounded-[2rem] flex flex-col justify-start items-center p-2 md:p-4 duration-150 ease-in-out`}>
                            <div className='text-white'><h4 className='my-1'>Sharetree</h4></div>
                            <div className='text-white text-xs font-bold my-4'>@username</div>
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className='w-full border border-gray-300 bg-white shadow-lg rounded-xl my-2 p-2 flex justify-center'>
                                    <span className='text-[10px] text-gray-500 font-bold'>Social media link</span>
                                </div>
                            ))}
                        </div>
                    </label>
                ))}
            </div>
        </>
    )
}
