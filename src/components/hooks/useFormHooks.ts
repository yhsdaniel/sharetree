'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getSession, signIn } from 'next-auth/react'
import axios from 'axios'
import { useMutation } from '@apollo/client'
import { CREATE_USER_NEW, GET_USER_QUERY } from '@/graphql/accessQuery'

export const useFormHooks = () => {
    const router = useRouter()
    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: ''
    })
    const [formDataRegister, setFormDataRegister] = useState({
        username: '',
        email: '',
        password: '',
    })
    
    const [createUser] = useMutation(CREATE_USER_NEW)
    
    const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value })
    }

    const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = formDataLogin.email
        const password = formDataLogin.password
        await signIn("credentials", {
            email,
            password,
            redirect: false
        }).then(async (res) => {
            if (res?.ok) {
                toast.success('Login successful')
                const updateSession = await getSession()
                if (updateSession?.user?.name) {
                    router.push(`/admin/${updateSession?.user?.name}/links`)
                }
            } else {
                toast.error("Couldn't get user info")
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Invalid Email or Password')
            router.push('/login')
        })
    }

    const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            await createUser({
                variables: {
                    username: formDataRegister.username,
                    email: formDataRegister.email,
                    password: formDataRegister.password,
                },
            })
            toast.success('Registered successfully')
            router.push('/login')
        } catch (error: any) {
            toast.error(error?.message || 'Username or email already registered')
            console.log(error)
        }
    }

    const handleChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
        setFormDataRegister(() => ({
            ...formDataRegister,
            [e.target.name]: e.target.value
        }))
    }

    return {
        formDataLogin,
        handleChangeLogin,
        handleSubmitLogin,
        formDataRegister,
        handleChangeRegister,
        handleSubmitRegister
    };
}