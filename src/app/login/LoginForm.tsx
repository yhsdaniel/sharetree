'use client'

import GoogleButton from '@/components/GoogleButton'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Cookie from 'js-cookie'

type User = {
    email: string,
    password: string
}

export default function LoginForm() {
    const [login, setLogin] = useState<User>({
        email: '',
        password: ''
    })
    const router = useRouter()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setLogin((preValues) => ({
            ...login,
            [name]: value
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.post('api/users/login', login)
            const { token } = response.data
            
            if(response.status == 200){
                toast.success('Login successful')
                Cookie.set('access_token', token, { expires: 7 })
                router.push('/admin')
            } else {
                throw new Error('Invalid email and password')
            }
        } catch (error) {
            console.error(error)
        }
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
                        type='text'
                        name='email'
                        autoComplete="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-sm"
                        value={login?.email}
                        placeholder="Enter email address"
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-6'>
                    <Input
                        required
                        type='password'
                        name='password'
                        autoComplete="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-sm"
                        value={login?.password}
                        placeholder="Password"
                        onChange={handleChange}
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
