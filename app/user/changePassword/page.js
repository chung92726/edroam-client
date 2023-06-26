'use client'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/context/index'
import UserRoute from '@/components/routes/UserRoutes'
import axios from 'axios'
import { toast } from 'react-toastify'

const ChangePasswordPage = () => {
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const handleChange = (e) => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { oldPassword, newPassword, confirmPassword } = values
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const { data } = await axios.post('/api/user/change-password', {
        oldPassword,
        newPassword,
        confirmPassword,
      })
      if (data.success) {
        toast.success('password updated successfully')
        const { data } = await axios.get('/api/logout')
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
      toast.error('password update failed try again later')
    }
  }
  return (
    <UserRoute>
      <div className='flex flex-col w-full bg-gray-100 h-[89vh] items-center justify-center py-10 px-10'>
        {values && (
          <div className='flex flex-col justify-center items-center gap-3 w-1/2 '>
            <input
              type='password'
              name='oldPassword'
              placeholder='Old Password'
              onChange={handleChange}
              value={values.oldPassword}
              className='input input-bordered w-full max-w-xl mx-2'
            />
            <input
              type='password'
              name='newPassword'
              placeholder='New Password'
              onChange={handleChange}
              value={values.newPassword}
              className='input input-bordered w-full max-w-xl mx-2'
            />
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              onChange={handleChange}
              value={values.confirmPassword}
              className='input input-bordered w-full max-w-xl mx-2'
            />

            <div className='form-control w-full max-w-xl'>
              <button
                className='btn btn-active btn-secondary'
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </UserRoute>
  )
}
export default ChangePasswordPage
