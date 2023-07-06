'use client'

import { useState, useEffect, useContext } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import InstructorNav from '../nav/InstructorNav'
import { Context } from '../../context/index'
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
        <div className='flex flex-row'>
          <div className='nav_container'>
            <InstructorNav />
          </div>
          <div className='content_container'>{children}</div>
        </div>
      )}
    </>
  )
}

export default InstructorRoute