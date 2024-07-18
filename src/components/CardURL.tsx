'use client'

interface AppProps {
    name: string,
    url: string
}

export default function CardURL({ name, url }: AppProps) {
    return (
        <div className='w-full border border-gray-300 shadow-lg rounded-3xl mt-4 p-2 pl-16'>
            <h5 className="mb-4">{name}</h5>
            <div className='text-sm mb-4'><span className="italic">{url}</span></div>
        </div>
    )
}
