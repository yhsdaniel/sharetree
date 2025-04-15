'use client'

import React, { useEffect, useMemo, useState } from 'react'
import bgLogin from '../../../public/images/bg-login.webp'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic'
import axios from 'axios';

const Loginform = dynamic(() => import('./LoginForm'), { ssr: false })

export default function LoginPage() {
  const [userState, setUserState] = useState('')
  const router = useRouter()
  
  // GET SESSION
  const { data: session, status } = useSession()
  const user = session?.user
  // const idUser = user && 'id' in user ? (user?.id as string | undefined) : undefined
  const id_user = useMemo(() => {
      if(!user) return null
      return user && 'id' in user ? (user.id as string | undefined | null) : undefined
    }, [user])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id_user) {
          const { data: response } = await axios.get(`/api/linkadmin`, { params: { id: id_user } })
          setUserState(response.username)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()

  }, [id_user])
  
  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/admin/${userState}/links`)
    }
  }, [userState, status])

  if (status === 'unauthenticated') {
    return (
      <div className='w-auto h-full my-auto relative flex-center'>
        <div className='z-5 circle-bg'></div>
        <div className='size-full flex-center lg:gap-x-12 z-10'>
          <div className='bg-ct-blue-600 flex-center flex-col flex-1 z-10 mt-10 px-5 xl:px-[8rem]'>
            <Loginform id_user={id_user}/>
          </div>
          <div className='w-6/12 h-full flex-center max-md:hidden max-md:w-0'>
            <Image
              src={bgLogin}
              alt="background-login"
              className='w-full h-full object-cover max-md:hidden'
              width={500}
              height={800}
              priority={true}
            />
          </div>
        </div>
      </div>
    )

  }
}
