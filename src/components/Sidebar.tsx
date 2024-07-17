import React from 'react'

export default function Sidebar() {
    return (
        <div className='h-screen w-full md:max-w-xs md:fixed md:left-0 top-0'>
            <nav className='bg-white transition-all duration-[250ms] ease-in-out md:opacity-0 fixed top-0 left-0 w-full md:hidden block opacity-100' aria-label='mobile navigation' data-testid="ReactNavigation mobile">
                <div className='flex flex-col-reverse w-full fixed bg-white items-stretch border-b'>
                    <section className='w-full flex flex-auto'>
                        <ul>
                            <li>
                                <a href="" className='mt-4 p-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                    </svg>
                                    <span>Links</span>
                                </a>
                            </li>
                            <li></li>
                        </ul>
                    </section>
                </div>
            </nav>
            <nav className='size-full bg-transparent hidden md:block md:p-2' aria-label='desktop navigation' tabIndex={-1} data-testid="ReactNavigation">
                <div className='flex flex-col size-full bg-white md:rounded-3xl'>
                    <section className='w-full flex'>
                        <h1 className='w-full px-3 my-2 h-12 flex items-center'>Sharetree</h1>
                    </section>
                    <section className='w-full flex flex-col flex-auto h-0 my-3'>
                        <ul className='w-full'>
                            <li className='relative'>
                                <a href="/admin" className='flex focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 md:flex-none hover:bg-gray-100 my-4 mx-3 rounded-xl duration-300 ease-in-out text-start justify-start bg-gray-100 before:bg-pink-300 before:absolute before:h-12 before:w-[5px] before:rounded-r-[6px] before:bottom-0 before:-left-0'>
                                    <span className='h-12 w-full flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                        </svg>
                                        <span>Links</span>
                                    </span>
                                </a>
                            </li>
                            <li className='relative'>
                                <a href="/admin/settings" className='flex focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 md:flex-none hover:bg-gray-100 my-4 mx-3 rounded-xl duration-300 ease-in-out text-start justify-start'>
                                    <span className='h-12 w-full flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <span>Settings</span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </section>
                    <section className='w-full flex'>
                        <a href="/" className='flex focus:outline-none outline-transparent group items-center h-12 w-[inherit] [&>div]:w-full flex-1 my-4 md:flex-none hover:bg-gray-100 rounded-xl duration-300 ease-in-out text-start'>
                            <span className='h-12 w-full flex items-center px-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                                </svg>
                                <span>Log out</span>
                            </span>
                        </a>
                    </section>
                </div>
            </nav>
        </div>
    )
}
