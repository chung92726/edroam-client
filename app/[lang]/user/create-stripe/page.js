'use client'

import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/context'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { GiTeacher } from 'react-icons/gi'

const CreateStripe = () => {
  const [loading, setLoading] = useState(false)
  const {
    state: { user },
  } = useContext(Context)
  const router = useRouter()

  const becomeInstructor = async () => {
    setLoading(true)
    axios
      .post('/api/make-instructor', {
        _id: user._id,
      })
      .then((res) => {
        console.log(res)
        setLoading(false)
        window.location.href = res.data
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (user?.role.includes('Instructor') || user?.role.includes('Pending'))
      router.push('/')
  }, [user])

  const [ok, setOk] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/current-user')
        // console.log(data)
        if (data.ok) setOk(true)
        if (user.role.includes('Instructor')) router.push('/')
      } catch (err) {
        console.log(err)
        router.push('/user/become-instructor')
      }
    }
    fetchUser()
  }, [])

  return (
    ok && (
      <div>
        <div className='flex flex-col justify-center items-center mt-10'>
          <GiTeacher size={200} />
          <h2 className='font-bold text-[22px] my-2'>
            Setup payout to publish courses on DEVRoad
          </h2>
          <p className='mb-3 text-blue-400'>
            DEVRoad partner with Stripe to transfer earning to your bank account
          </p>
          <button
            className='btn  btn-outline btn-wide btn-primary mb-3 hover:btn-active  rounded-3xl'
            disabled={
              (user && user.role && user.role.includes('Instructor')) || loading
            }
            onClick={becomeInstructor}
          >
            {loading ? (
              <span className='loading loading-spinner'>Processing . . .</span>
            ) : (
              <p>Payout Setup</p>
            )}
          </button>
          <p>You will be redirected to Stripe to complete onboarding process</p>
        </div>
      </div>
    )
  )
}

export default CreateStripe
