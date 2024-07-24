'use client'

import GoogleButton from '@/components/GoogleButton'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'

export default function LoginForm() {
    const router = useRouter()
    const { status } = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/admin')
        }
    }, [status, router])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        signIn("credentials", {
            email,
            password,
            redirect: false
        }).then((res) => {
            if (res?.ok) {
                router.refresh()
                toast.success('Login successful')
                router.push('/admin')
            } else {
                toast.error('Invalid Email or Password')
                router.push('/login')
            }
        }).catch((err) => {
            toast.error('Invalid Email or Password')
            router.push('/login')
        })
    }
    return (
        <div className="lg:flex-col lg:flex w-full">
            <div className='text-[#393646] text-center'>
                <h1 className="text-4xl font-bold">Welcome Back!</h1>
                <span className="text-md">Log in to your Sharetree</span>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off" className="mt-10">
                <div className='mb-4'>
                    <Input
                        required
                        type='email'
                        name='email'
                        autoComplete="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-sm"
                        // value={login?.email}
                        placeholder="Enter email address"
                    // onChange={handleChange}
                    />
                </div>
                <div className='mb-6'>
                    <Input
                        required
                        type='password'
                        name='password'
                        autoComplete="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-sm"
                        // value={login?.password}
                        placeholder="Password"
                    // onChange={handleChange}
                    />
                </div>
                <button type='submit' className='w-full border rounded-[50px] px-4 h-12 bg-[#7dd9f8] hover:bg-[#47bde4]/70 duration-150 ease-in-out text-[#393646] font-bold'>Login</button>
            </form>
            <span className="text-sm mt-10 text-right">Don't have an account? <Link href='/register' className='text-blue-600 hover:text-blue-700'>Register</Link></span>
            <div className="flex justify-center items-center mt-6">
                <span className="border border-gray-300 w-2/6 inline-block"></span>
                <span className="text-xs text-gray-500 px-2 flex-center flex-1">or login with</span>
                <span className="border border-gray-300 w-2/6 inline-block"></span>
            </div>
            {/* <GoogleButton /> */}
            <div className='mt-10'>
                <p className='text-xs text-center'>This site is protected by reCAPTCHA and the <span className='italic'>Google Privacy Policy</span> and <span className='italic'>Terms of Service</span> apply.</p>
            </div>
        </div>
    )
}
