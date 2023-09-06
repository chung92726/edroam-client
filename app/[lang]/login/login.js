'use client'

import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'
import { Context } from '@/context/index'
import { useRouter } from 'next/navigation'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { GoogleLoginButton } from 'react-social-login-buttons'

const Login = ({ login }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  //   const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()

  // global state
  const { state, dispatch } = useContext(Context)
  const { user } = state
  useEffect(() => {
    if (user !== null) router.push('/user')
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table({ name, email, password })
    setLoading(true)
    try {
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      })
      dispatch({
        type: 'LOGIN',
        payload: data,
      })
      // save in local storage => the browser
      window.localStorage.setItem('user', JSON.stringify(data))

      toast.success(`${login.LoginSuccess}`)
      setEmail('')
      setPassword('')
      // console.log(data)
      setLoading(false)
      router.push('/user')
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  }

  return (
    <>
      {/* <ToastContainer position='top-center' /> */}

      <div className='mt-10'>
        <form
          onSubmit={handleSubmit}
          className='justify-center items-center form-control max-sm:mx-5'
        >
          <div className='w-full max-w-sm my-2 flex'>
            <h2 className='text-[20px] font-bold mx-2'>{login.Login}</h2>
          </div>
          <div className='grid grid-cols-2 gap-6 w-full max-w-sm'>
            <a href='/api/auth/facebook' className='w-full max-w-sm'>
              <FacebookLoginButton
                className='w-full my-3 font-bold'
                placeholder={login.LoginFb}
                style={{
                  fontSize: '14px',

                  borderRadius: '5px',
                  boxShadow: 'rgba(0, 0, 0, 0.8) 2px 2px 5px',
                }}
              >
                <span>{login.LoginFb}</span>
              </FacebookLoginButton>
            </a>
            <a href='/api/auth/google' className='w-full max-w-sm'>
              <GoogleLoginButton
                className='w-12  my-3 font-bold'
                style={{
                  fontSize: '14px',
                  borderRadius: '5px',
                  boxShadow: 'rgba(0, 0, 0, 0.8) 2px 2px 5px',
                }}
              >
                <span>{login.LoginGlg}</span>
              </GoogleLoginButton>
            </a>
          </div>

          <div className='relative w-full max-w-sm my-3'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t-2 border-base-300' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          {/* <span className='border-b border-black-500 my-3 w-full max-w-sm justify-center items-center'></span> */}
          <input
            type='email'
            alt='email'
            placeholder={login.PlaceholderEmail}
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            alt='password'
            placeholder={login.PlaceholderPw}
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type='submit'
            className='btn mt-4 w-full max-w-sm btn-neutral'
            disabled={!email || !password || loading}
          >
            {loading ? (
              <span className='loading loading-spinner loading-md'></span>
            ) : (
              `${login.Login}`
            )}
          </button>
          <div className='w-full max-w-sm my-3'>
            <p className='mx-2 text-[12px] text-center'>
              {login.Or}{' '}
              <Link href='/forgot-password' className='link link-primary'>
                {login.Forgot_Pw}
              </Link>
            </p>
            <p className='text-center text-[14px] my-2'>
              {login.Have_Acc}{' '}
              <Link href='/register' className='link link-primary'>
                {login.Signup}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
