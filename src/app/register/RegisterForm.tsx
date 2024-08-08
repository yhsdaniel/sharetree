'use client'

import GoogleButton from "@/components/GoogleButton";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface User {
    username: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    const [register, setRegister] = useState<User>({
        username: '',
        email: '',
        password: '',
    })
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            axios.post('api/users/register', register).then((response) => {
                if( response.status === 200 ) {
                    toast.success('Registered successfully')
                    router.push('/login')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setRegister((preValues) => ({
            ...register,
            [name]: value
        }))
    }

    return (
        <div className="flex-col flex w-3/4">
            <div className='text-[#393646] text-center'>
                <h1 className="text-4xl font-bold">Join Sharetree</h1>
                <span className="text-md">Sign up for free</span>
            </div>

            <form onSubmit={handleSubmit} className="mt-10">
                <div className='mb-4'>
                    <Input
                        required
                        type='text'
                        name='username'
                        autoComplete="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-sm"
                        value={register?.username}
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4'>
                    <Input
                        required
                        type='email'
                        name='email'
                        autoComplete="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-sm"
                        value={register?.email}
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
                        autoCorrect="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-sm"
                        value={register?.password}
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' className='w-full border rounded-[50px] px-4 h-12 bg-[#7dd9f8] hover:bg-[#47bde4]/70 duration-150 ease-in-out text-[#393646] font-bold'>Sign Up</button>
            </form>
            <p className="text-sm mt-10 text-center text-gray-500">By clicking <b>Create account</b>, you agree to Linktree's <span className="italic">Terms and Conditions</span> and confirm you have read our <span className="italic">Privacy Notice.</span> You may receive offers, news and updates from us.</p>
            <div className="flex justify-center items-center mt-6">
                <span className="border border-gray-300 w-2/6 inline-block"></span>
                <span className="text-xs text-gray-500 flex-center flex-1">or sign up with</span>
                <span className="border border-gray-300 w-2/6 inline-block"></span>
            </div>
            <GoogleButton />
            <div className='mt-10 text-sm'>
                <span>Already have an account? <Link href={'/login'} className='text-blue-600 hover:text-blue-800 transition-all'>Login</Link></span>
            </div>
        </div>
    )
}
