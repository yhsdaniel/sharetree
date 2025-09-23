'use client'

import GoogleButton from "@/components/GoogleButton";
import { Input } from "@/components/ui/input";
import { useFormHooks } from "../../components/hooks/useFormHooks";
import Link from "next/link";

export default function RegisterForm() {
    const { formDataRegister, handleChangeRegister, handleSubmitRegister } = useFormHooks()
    return (
        <div className="lg:flex-col lg:flex mx-0 md:mx-[10%]">
            <div className='text-[#393646] text-center'>
                <h1 className="text-4xl font-bold">Join Sharetree</h1>
                <span className="text-sm">Are you have an account? <Link href="/login" className="text-sm text-blue-600">Sign In</Link></span>
            </div>

            <form onSubmit={handleSubmitRegister} className="mt-10">
                <div className='mb-4'>
                    <Input
                        required
                        type='text'
                        name='username'
                        autoComplete="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-lg"
                        value={formDataRegister?.username}
                        placeholder="Enter username"
                        onChange={handleChangeRegister}
                    />
                </div>
                <div className='mb-4'>
                    <Input
                        required
                        type='email'
                        name='email'
                        autoComplete="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-lg"
                        value={formDataRegister?.email}
                        placeholder="Enter email address"
                        onChange={handleChangeRegister}
                    />
                </div>
                <div className='mb-6'>
                    <Input
                        required
                        type='password'
                        name='password'
                        autoComplete="off"
                        autoCorrect="off"
                        className="rounded-lg border-none h-12 bg-white p-4 shadow-lg"
                        value={formDataRegister?.password}
                        placeholder="Password"
                        onChange={handleChangeRegister}
                    />
                </div>
                <button type='submit' className='w-full border rounded-[50px] px-4 h-12 bg-[#7dd9f8] hover:bg-[#47bde4]/70 duration-150 ease-in-out text-[#393646] font-bold'>Sign Up</button>
            </form>
            <p className="text-xs mt-10 text-center text-gray-500">By clicking <b>Create account</b>, you agree to Sharetree&apos;s <span className="italic">Terms and Conditions</span> and confirm you have read our <span className="italic">Privacy Notice.</span> You may receive offers, news and updates from us.</p>
            <div className="flex justify-center items-center mt-6">
                <span className="border border-gray-300 w-2/6 inline-block"></span>
                <span className="text-xs text-gray-500 flex-center flex-1">or sign up with</span>
                <span className="border border-gray-300 w-2/6 inline-block"></span>
            </div>
            <GoogleButton />
        </div>
    )
}
