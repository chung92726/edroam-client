'use client'

import { useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Context } from '@/context/index'
import { toast } from 'react-toastify'

const FacebookCallback = ({ query }) => {
  const router = useRouter()
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    const handleFacebookResponse = () => {
      const urlSearchParams = new URLSearchParams(window.location.search)

      const user = urlSearchParams.get('user')

      if (user) {
        try {
          // Parse the user data
          const userData = JSON.parse(decodeURIComponent(user))

          // Save the user data and token in local storage
          window.localStorage.setItem('user', JSON.stringify(userData))

          // Save the user data in context
          dispatch({
            type: 'LOGIN',
            payload: userData,
          })

          // Redirect to the user page
          router.push('/user')
        } catch (err) {
          toast.error('Failed to log in with Facebook')
        }
      } else {
        toast.error('Failed to log in with Facebook')
      }
    }

    handleFacebookResponse()
  }, [router, dispatch])

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <span className='loading loading-spinner w-32'></span>
    </div>
  )
}

export default FacebookCallback
