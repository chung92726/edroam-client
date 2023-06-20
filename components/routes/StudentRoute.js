'use client'

import { useState, useEffect } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import UserNav from '../nav/UserNav'

const StudentRoute = ({ children, showNav = true }) => {
  const router = useRouter()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/current-user')
        // console.log(data)
        if (data.ok) setOk(true)
      } catch (err) {
        console.log(err)
        router.push('/login')
      }
    }
    fetchUser()
  }, [])
  return (
    <>
      {ok && (
        <div className='flex flex-row w-full'>
          {showNav && <div className='nav_container'></div>}
          <div className='w-full  flex justify-end '>
            <div className={showNav ? 'w-full' : 'w-full'}>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default StudentRoute
