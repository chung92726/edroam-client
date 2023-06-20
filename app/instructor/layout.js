'use client'

import { useState, useEffect, useContext } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import InstructorNav from '../../components/nav/InstructorNav'

import { toast } from 'react-toastify'

const InstructorRoute = ({ children }) => {
  const router = useRouter()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const { data } = await axios.get('/api/current-instructor')
        console.log(data)
        if (data.ok) setOk(true)
      } catch (err) {
        console.log(err)
        toast.error('You are not authorized')
        router.push('/')
      }
    }
    fetchInstructor()
  }, [])
  return (
    <>
      {ok && (
        <div className='flex flex-row w-full'>
          <div className='nav_container'>
            <InstructorNav />
          </div>
          <div className='w-full mt-10 flex justify-end'>
            <div className='w-full pl-[13rem] flex justify-center items-center'>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InstructorRoute
