'use client'

import { useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Context } from '@/context/index'
import { toast } from 'react-toastify'

const GoogleCallback = ({ query }) => {
  const router = useRouter()
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    const handleGoogleResponse = () => {
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
          toast.error('Failed to log in with Google')
        }
      } else {
        toast.error('User not found Failed to log in with Google')
      }
    }

    handleGoogleResponse()
  }, [router, dispatch])

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <span className='loading loading-spinner w-32'></span>
    </div>
  )
}

export default GoogleCallback
