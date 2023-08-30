'use client'
import { useState, useEffect, useContext, Suspense } from 'react'
import axios from 'axios'
import { currencyFormatter } from '@/utils/helpers'
import ReactPlayer from 'react-player'
import Image from 'next/image'
import SingleCourseLessons from '@/components/cards/SingleCourseLessons'
import CourseDescription from '@/components/cards/CourseDescription'
import { Context } from '@/context'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import SingleCourseSkeleton from './loading.js'

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
    // console.log(preview)
    const { data } = await axios.post(`/api/course/get-signedurl`, {
      filename: preview.Key,
    })
    // console.log(data)
    document.getElementById('my_modal_3').showModal()
    setPreview(data)
    setVideoPlay(true)
  }
  const fetchCourse = async () => {
    const { data } = await axios.get(`/api/course/${params.slug}`)
    setCourse(data)
    // console.log(data)
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

  if (!course._id) {
    return <SingleCourseSkeleton />
  }

  return (
    <div className='bg-gray-100'>
      {/* <SingleCourseSkeleton /> */}
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

          {course && course.lessons && preview && (
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
      <div className='text-center bg-gray-700 text-white w-full pb-[20px] md:pt-[50px] flex flex-col justify-center text-[28px] items-center font-bold '>
        <div className='flex flex-col-reverse justify-between items-center gap-4  md:flex-row md:items-start md:w-[90vw] lg:max-w-[1080px] lg:max-h-[363px]'>
          <div className='flex flex-col justify-center items-start gap-4 w-[90vw] md:w-[45vw] '>
            <h1 className='font-bold text-left text-2xl lg:text-3xl'>
              {course.name}
            </h1>
            <p className='text-left text-[10px] lg:text-[14px]'>
              {course &&
                course.description &&
                course.description.substring(0, 300)}
              ...
            </p>
            <div className='flex items-center gap-2 max-lg:flex-wrap'>
              {course.category &&
                course.category
                  // .split(' ')
                  .map((c, index) => (
                    <span key={index} className='badgeuidesign'>
                      {c.label}
                    </span>
                  ))}
            </div>
            <p className='text-[10px] lg:text-[14px]'>
              Created By {course && course.instructor && course.instructor.name}
            </p>
            <p className='text-[10px] lg:text-[14px]'>
              Last Updated{' '}
              {course &&
                course.updatedAt &&
                new Date(course.updatedAt).toLocaleDateString()}
            </p>
            <div className='flex gap-2'>
              <span className='text-[10px] lg:text-[14px]font-black'>
                {course.paid
                  ? currencyFormatter({
                      amount: course.price,
                      currency: 'usd',
                    })
                  : 'Free'}
              </span>
              <span className='text-slate-400 line-through text-[10px] lg:text-[14px]'>
                {course.paid
                  ? currencyFormatter({
                      amount: course.price + 10,
                      currency: 'usd',
                    })
                  : ''}
              </span>
            </div>
            <button
              className='btn btn-primary w-full mt-[15px] md:hidden'
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
          <div className='flex flex-col justify-center items-center w-[100vw] md:w-[45vw] '>
            {course &&
            // course.lessons &&
            course.mainPreview &&
            course.mainPreview.video ? (
              // course.lessons[0].video &&
              // course.lessons[0].video.Location ? (
              <div
                onClick={() => {
                  // handlePreview(course.lessons[0].video);
                  handlePreview(course.mainPreview.video)
                }}
                className='relative cursor-pointer w-full h-[56vw] md:h-[25vw] lg:max-h-[300px]'
              >
                <img
                  src={course.image ? course.image.Location : '/course.png'}
                  alt={course.name}
                  className='w-full h-full  object-cover'
                />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center'>
                  <Image
                    src='/play.png'
                    alt='Play buttton'
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
                  className='w-full h-[56vw] md:h-[25vw] lg:max-h-[300px] object-cover'
                />
              </div>
            )}
            <button
              className='btn btn-primary w-full mt-[15px] hidden md:block'
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
      {course && course.detailDescription && (
        <CourseDescription detailDescription={course.detailDescription} />
      )}
    </div>
  )
}

export default SingleCourse
