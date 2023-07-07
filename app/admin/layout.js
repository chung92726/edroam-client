'use client'

import { useState, useEffect, useContext } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import AdminNav from '../../components/nav/AdminNav'

import { toast } from 'react-toastify'

const InstructorRoute = ({ children, params }) => {
  const router = useRouter()
  const [ok, setOk] = useState(false)

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get('/api/is-admin')
      console.log(data)
      if (data.ok) setOk(true)
    } catch (err) {
      console.log(err)
      toast.error('You are not authorized')
      router.push('/')
    }
  }
  useEffect(() => {
    fetchAdmin()
  }, [params])
  return (
    <>
      {ok && (
        <div className='flex flex-row w-full'>
          <div className='nav_container'>
            <AdminNav />
          </div>
          <div className='w-full min-h-[calc(100vh-70px)] bg-gray-100 pl-[4rem] lg:pl-[13rem]'>
            <div className='w-full'>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default InstructorRoute
