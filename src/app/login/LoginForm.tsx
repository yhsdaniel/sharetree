'use client'

import GoogleButton from '@/components/GoogleButton'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import axios from 'axios'

export default function LoginForm({ idUser }: { idUser: string | undefined }) {
    const router = useRouter()
    const [userState, setUserState] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const fetchData = async () => {
        try {
            if(idUser){
                const { data: response } = await axios.post(`/api/linkadmin`, { params: { id: idUser } })
                setUserState(response.username)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = formData.email
        const password = formData.password
        await signIn("credentials", {
            email,
            password,
            redirect: false
        }).then((res) => {
            if (res?.ok) {
                fetchData()
                toast.success('Login successful')
                router.push(`/admin/${userState}/links`)
            } else {
                toast.error('Invalid Email or Password')
                router.push('/login')
            }
        }).catch((err) => {
            console.log(err)
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
                        autoFocus={true}
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-sm"
                        value={formData.email}
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
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' className='w-full border rounded-[50px] px-4 h-12 bg-[#7dd9f8] hover:bg-[#47bde4]/70 duration-150 ease-in-out text-[#393646] font-bold'>Login</button>
            </form>
            <span className="text-sm mt-10 text-right">Don&apos;t have an account? <Link href='/register' className='text-blue-600 hover:text-blue-700'>Register</Link></span>
            <div className="flex justify-center items-center mt-6">
                <span className="border border-gray-300 w-2/6 inline-block"></span>
                <span className="text-xs text-gray-500 px-2 flex-center flex-1">or login with</span>
                <span className="border border-gray-300 w-2/6 inline-block"></span>
            </div>
            <GoogleButton />
            <div className='mt-10'>
                <p className='text-xs text-center'>This site is protected by reCAPTCHA and the <span className='italic'>Google Privacy Policy</span> and <span className='italic'>Terms of Service</span> apply.</p>
            </div>
        </div>
    )
}
