'use client'

import { useState, useEffect, useContext } from 'react'
import { Context } from '../../context/index'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [promotion, setPromotion] = useState(true)
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
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
        promotion,
      })
      toast.success('Registration Successful. Please Login.')
      setName('')
      setEmail('')
      setPassword('')
      setLoading(false)
      router.push('/login')
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
          className='justify-center items-center form-control'
        >
          <div className='w-full max-w-sm my-2 flex'>
            <h2 className='text-base font-bold mx-2'>
              Register and Starting Learning
            </h2>
          </div>
          <input
            type='text'
            placeholder='Enter Username'
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='email'
            placeholder='Enter Email'
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Enter Password'
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className='label cursor-pointer w-full max-w-sm'>
            <input
              type='checkbox'
              checked={promotion}
              className='checkbox mx-1'
              onChange={(e) => setPromotion(e.target.checked)}
            />
            <span className='label-text mx-1'>
              Send me special offers, recommendations and learning tips.
            </span>
          </label>

          {/* <input
            type='password'
            placeholder='Confirm Password'
            className='input input-bordered w-full max-w-sm my-2 border-2'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        /> */}
          <button
            type='submit'
            className='btn mt-4 w-full max-w-sm btn-neutral'
            disabled={!name || !email || !password || loading}
          >
            {loading ? (
              <span className='loading loading-spinner loading-md'></span>
            ) : (
              'Register'
            )}
          </button>
          <div className='w-full max-w-sm my-3'>
            <p className='mx-2 text-[12px]'>
              By signing up, you agree to our Terms of Use and Privacy Policy.
            </p>
            <p className='text-center text-[14px] my-2'>
              Already have an account ?{' '}
              <Link href='/login' className='link link-primary'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
