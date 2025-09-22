'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ThemeProps } from "./page";

const checkChecked = 'peer-checked:border-green-500 peer-checked:border-2 peer-checked:after:content-["✔"] after:absolute after:top-1/3 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:text-green-300 duration-150 ease-in-out'

export default function ForegroundDesign({deviceThemes, handleThemeUpdate}: ThemeProps) {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const handleChangeChecked = (index: number) => {
        setSelectedTheme(index);
    };
    return (
        <>
            <p className='px-4 md:py-4 mt-8 font-bold text-xs md:text-sm text-gray-700'>Accent color:</p>
            <div className="grid grid-flow-col md:grid-flow-row auto-cols-[5rem] md:grid-cols-[repeat(auto-fit,minmax(30px,1fr))] gap-4 md:gap-3 p-4 overflow-auto">
                <Button
                    size={'sm'}
                    className='rounded-xl px-6 md:px-8 text-xs bg-green-300 text-gray-700 hover:bg-green-500 hover:font-bold duration-100 ease-in-out'
                    onClick={() => handleThemeUpdate(selectedTheme)}
                >
                    Save
                </Button>
                {deviceThemes.map((theme: any, index: any) => (
                    <label
                        key={index}
                        htmlFor={`accent-${index}`}
                        className={`relative w-full h-10 md:h-12 mb-2 cursor-pointer`}
                    >
                        <input type="radio" name="accent" id={`accent-${index}`} defaultChecked={index === 0} className='peer hidden' onChange={() => handleChangeChecked(index)} />
                        <div className={`${checkChecked} size-full ${theme.background} border rounded-2xl`}></div>
                        <div className="w-full h-10 md:h-12 rounded-2xl absolute top-0 peer-checked:bg-green-300/30"></div>
                    </label>
                ))}
            </div>
        </>
    )
}
