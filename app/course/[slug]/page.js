'use client'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { currencyFormatter } from '@/utils/helpers'
import ReactPlayer from 'react-player'
import Image from 'next/image'
import SingleCourseLessons from '@/components/cards/SingleCourseLessons'
import { Context } from '@/context'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'

const SingleCourse = ({ params }) => {
  const [course, setCourse] = useState({})
  const [videoPlay, setVideoPlay] = useState(false)
  const [preview, setPreview] = useState('')
  const [enroll, setEnroll] = useState(false)
  const { slug } = params
  const [loading, setLoading] = useState(false)
  const {
    state: { user },
  } = useContext(Context)
  const router = useRouter()
  const handlePreview = async (preview) => {
    console.log(preview)
    const { data } = await axios.post(`/api/course/get-signedurl`, {
      filename: preview.Key,
    })
    console.log(data)
    document.getElementById('my_modal_3').showModal()
    setPreview(data)
    setVideoPlay(true)
  }
  const fetchCourse = async () => {
    const { data } = await axios.get(`/api/course/${params.slug}`)
    setCourse(data)
  }
  useEffect(() => {
    fetchCourse()
  }, [])
  useEffect(() => {
    const checkEnrollment = async () => {
      if (course._id) {
        const { data } = await axios.get(`/api/check-enrollment/${course._id}`)
        setEnroll(data)
      }
    }
    if (user && course) {
      checkEnrollment()
    }
  }, [user, course])

  const handleFreeEnrollment = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // check if user is logged in
      if (!user) router.push('/login')
      // check if already enrolled
      if (enroll.status)
        return router.push(`/user/course/${enroll.course.slug}`)

      const { data } = await axios.post(`/api/free-enrollment/${course._id}`)
      console.log(data)
      setLoading(false)

      toast.success('Enrollment Success. Start Learning Now!')

      router.push(`/user/course/${data.course.slug}`)
    } catch (err) {
      setLoading(false)
      toast.error('Enrollment Failed. Try Again')
    }
  }
  const handlePaidEnrollment = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!user) router.push('/login')
      if (enroll.status)
        return router.push(`/user/course/${enroll.course.slug}`)
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`)
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
      stripe.redirectToCheckout({ sessionId: data })
    } catch (err) {
      toast.error('Enrollment Failed. Try Again')
      setLoading(false)
    }
  }
  const handleCheckLogin = async (e) => {
    router.push('/login')
  }
  const goToCourse = async (e) => {
    router.push(`/user/course/${course.slug}`)
  }
  return (
    <div>
      <dialog id='my_modal_3' className='modal'>
        <form method='dialog' className='modal-box'>
          <div className='flex justify-between items-center pb-2 border-b-2'>
            <h3 className='font-bold'>Course Preview</h3>
            <button
              className='btn btn-sm btn-circle  absolute right-2 top-2 btn-error'
              onClick={() => setVideoPlay(false)}
            >
              ✕
            </button>
          </div>

          {course && course.lessons && course.lessons[0].video && (
            <ReactPlayer
              url={preview}
              width='100%'
              controls
              playing={videoPlay}
            />
          )}
        </form>
        <form
          method='dialog'
          className='modal-backdrop'
          onClick={() => setVideoPlay(false)}
        >
          <button>close</button>
        </form>
      </dialog>
      <div className='text-center bg-gray-700 text-white w-full  py-[50px] flex flex-col justify-center text-[28px] items-start font-bold '>
        <div className='flex justify-between items-start mx-10 w-full'>
          <div className='flex flex-col justify-center items-start w-7/12 gap-4'>
            <h1 className='text-3xl font-bold '>{course.name}</h1>
            <p className='text-[14px] text-left'>
              {course &&
                course.description &&
                course.description.substring(0, 200)}
              ...
            </p>
            <div className='flex items-center gap-2'>
              {course.category &&
                course.category
                  .split(' ')
                  .map((c) => <span className='badgeuidesign'>{c}</span>)}
            </div>
            <p className='text-[14px]'>
              Created By {course && course.instructor && course.instructor.name}
            </p>
            <p className='text-[14px]'>
              Last Updated{' '}
              {course &&
                course.updatedAt &&
                new Date(course.updatedAt).toLocaleDateString()}
            </p>
            <div className='flex gap-2'>
              <span className='text-[16px] font-black'>
                {course.paid
                  ? currencyFormatter({ amount: course.price, currency: 'usd' })
                  : 'Free'}
              </span>
              <span className='text-slate-400 line-through  text-[16px]'>
                {course.paid
                  ? currencyFormatter({
                      amount: course.price + 10,
                      currency: 'usd',
                    })
                  : ''}
              </span>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center w-5/12'>
            {course &&
            course.lessons &&
            course.lessons[0].video &&
            course.lessons[0].video.Location ? (
              <div
                onClick={() => {
                  handlePreview(course.lessons[0].video)
                }}
                className='relative cursor-pointer'
              >
                <img
                  src={course.image ? course.image.Location : '/course.png'}
                  alt={course.name}
                  className='w-full h-[220px] object-cover'
                />
                <div className='absolute w-full h-[220px] top-0 flex flex-col justify-center items-center'>
                  <Image
                    src='/play.png'
                    width={70}
                    height={70}
                    className='my-[10px]'
                  />
                  <p className='text-[14px]'>Preview the Course</p>
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={course.image ? course.image.Location : '/course.png'}
                  alt={course.name}
                  className='w-full h-[220px] object-cover'
                />
              </div>
            )}
            <button
              className='btn btn-primary btn-wide w-[395px] mt-[15px]'
              disabled={loading}
              onClick={
                user
                  ? enroll.status
                    ? goToCourse
                    : course.paid
                    ? handlePaidEnrollment
                    : handleFreeEnrollment
                  : handleCheckLogin
              }
            >
              {loading ? (
                <div>
                  <span className='loading loading-spinner'></span>
                  Loading...
                </div>
              ) : user ? (
                enroll.status ? (
                  'Start Learning'
                ) : (
                  'Enroll To This Course'
                )
              ) : (
                'Login To Enroll'
              )}
            </button>
          </div>
        </div>
      </div>
      {course && course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          handlePreview={handlePreview}
        />
      )}
    </div>
  )
}

export default SingleCourse
