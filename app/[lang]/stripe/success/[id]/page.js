'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UserRoute from '@/components/routes/UserRoutes'
import axios from 'axios'
import { MdSecurityUpdateGood } from 'react-icons/md'
import { toast } from 'react-toastify'

const StripeSuccess = ({ params }) => {
  // router
  const router = useRouter()
  const { id } = params

  const successRequest = async () => {
    try {
      const { data } = await axios.get(`/api/stripe-success/${id}`)
      console.log(data)
      if (data.success) {
        router.push(`/user/course/${data.course.slug}`)
      } else {
        router.push('/')
        toast.error('Enrollment failed. Try again.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (id) successRequest()
  }, [id])

  return (
    <UserRoute showNav={false}>
      <div className='flex justify-center items-center h-[100vh]'>
        <span className='loading loading-spinner w-32'></span>
        <h1 className='text-[20px] font-bold'>
          Payment Success. Redirecting... Do not refresh
        </h1>
      </div>
    </UserRoute>
  )
}

export default StripeSuccess
