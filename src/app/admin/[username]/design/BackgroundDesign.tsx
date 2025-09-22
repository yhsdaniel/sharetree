'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ThemeProps } from "./page";

export default function BackgroundDesign({ deviceThemes, handleThemeUpdate }: ThemeProps) {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const handleChangeChecked = (index: number) => {
        setSelectedTheme(index);
    };
    return (
        <>
            <div className="flex justify-between items-center px-4 md:py-4">
                <p className='font-bold text-xs md:text-sm text-gray-700'>Background color:</p>
                <Button
                    size={'sm'}
                    className='rounded-xl px-6 md:px-8 text-xs bg-green-300 text-gray-700 hover:bg-green-500 hover:font-bold duration-100 ease-in-out'
                    onClick={() => handleThemeUpdate(selectedTheme)}
                >
                    Save
                </Button>
            </div>
            <div className='grid grid-flow-col md:grid-flow-row auto-cols-[13rem] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:h-2/4 md:gap-1 px-0 md:px-4 py-4 md:pb-10 overflow-auto'>
                {deviceThemes.map((theme: any, index: any) => (
                    <label key={index} htmlFor={`theme-${index}`} className={`size-full p-2 flex justify-center items-center cursor-pointer`}>
                        <input
                            type="radio"
                            name="device-theme"
                            id={`theme-${index}`}
                            value={selectedTheme}
                            className='peer hidden'
                            onChange={() => handleChangeChecked(index)}
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
