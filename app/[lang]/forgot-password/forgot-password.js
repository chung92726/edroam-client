'use client'

import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { Context } from '@/context/index'
import { useRouter } from 'next/navigation'

const forgotPassword = ({forgot_pw}) => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  //   const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()

  // global state
  const { state, dispatch } = useContext(Context)
  const { user } = state
  useEffect(() => {
    if (user !== null) router.push('/')
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table({ name, email, password })
    setLoading(true)
    try {
      const { data } = await axios.post(`/api/forgot-password`, {
        email,
      })
      if (data.ok) {
        setSuccess(true)
        toast.success('Check your email for the secret code')
      } else {
        setSuccess(false)
        toast.error('Error sending Email')
      }
      // save in local storage => the browser

      setLoading(false)
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`/api/reset-password`, {
        email,
        code,
        newPassword,
      })
      setEmail('')
      setCode('')
      setNewPassword('')
      setLoading(false)
      setSuccess(false)
      toast.success('Password reset successfully')
      router.push('/login')
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  }
  return (
    <>
      {/* <ToastContainer position='top-center' /> */}

      {success ? (
        <div className='mt-10'>
          <form
            onSubmit={handleResetPassword}
            className='justify-center items-center form-control'
          >
            <div className='w-full max-w-sm my-2 flex'>
              <h2 className='text-base font-bold mx-2'>{forgot_pw.reset_pw}</h2>
            </div>

            <input
              type='email'
              placeholder={forgot_pw.placeholder.email}
              className='input input-bordered w-full max-w-sm my-2 border-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='text'
              placeholder={forgot_pw.placeholder.reset_code}
              className='input input-bordered w-full max-w-sm my-2 border-2'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <input
              type='password'
              placeholder={forgot_pw.placeholder.new_pw}
              className='input input-bordered w-full max-w-sm my-2 border-2'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button
              type='submit'
              className='btn mt-4 w-full max-w-sm btn-neutral'
              disabled={!code || !newPassword || !email || loading}
            >
              {loading ? (
                <span className='loading loading-spinner loading-md'></span>
              ) : forgot_pw.submit}
            </button>
            <div className='w-full max-w-sm my-3'>
              <p className='text-center text-[14px] my-2'>
                {forgot_pw.haveAcc}{" "}
                <Link href='/register' className='link link-primary'>
                  {forgot_pw.signup}
                </Link>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className='mt-10'>
          <form
            onSubmit={handleSubmit}
            className='justify-center items-center form-control'
          >
            <div className='w-full max-w-sm my-2 flex'>
              <h2 className='text-base font-bold mx-2'>{forgot_pw.Forgot_Pw}</h2>
            </div>

            <input
              type='email'
              placeholder={forgot_pw.placeholder.email}
              className='input input-bordered w-full max-w-sm my-2 border-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type='submit'
              className='btn mt-4 w-full max-w-sm btn-neutral'
              disabled={!email || loading}
            >
              {loading ? (
                <span className='loading loading-spinner loading-md'></span>
              ) : 
                forgot_pw.submit
              }
            </button>
            <div className='w-full max-w-sm my-3'>
              <p className='text-center text-[14px] my-2'>
              {forgot_pw.haveAcc}{' '}
                <Link href='/register' className='link link-primary'>
                {forgot_pw.signup}
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default forgotPassword
