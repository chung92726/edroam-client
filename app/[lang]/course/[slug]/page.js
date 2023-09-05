'use client'

import { gsap } from 'gsap'
import { useState, useEffect, useContext, Suspense, useRef } from 'react'
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
import RatingStars from '@/components/stars/RatingStars.js'
import SingleCourseReviews from '@/components/cards/SingleCourseReviews.js'
import Link from 'next/link'

const StickyBar = ({
  course,
  loading,
  user,
  enroll,
  goToCourse,
  handlePaidEnrollment,
  handleFreeEnrollment,
  handleCheckLogin,
}) => {
  return (
    <div
      style={{
        position: 'sticky',
        zIndex: 1000,
      }}
      className='top-0 flex justify-center sm:justify-between max-sm:flex-col items-center py-3 px-4 sm:px-10 bg-gray-700 shadow-md w-full z-40'
    >
      <div className=' max-sm:mb-3'>
        <div className='font-bold text-left text-base text-white lg:text-2xl'>
          {course.name}
        </div>
        <div className='flex items-center max-md:mb-2'>
          <span className='hidden md:block text-md font-bold text-indigo-400'>
            {course.averageRating}
          </span>{' '}
          <span className='hidden md:block text-white'>&bull; </span>{' '}
          <span className='hidden md:block text-md font-bold text-indigo-400'>
            {course.numberOfReviews} reviews
          </span>
          <span className='text-[10px] lg:text-[14px] ml-2 text-white'>
            Level: <strong>{course && course.level && course.level}</strong>
          </span>
          <span className='text-[10px] lg:text-[14px] ml-2 text-white'>
            Language:{' '}
            <strong>{course && course.language && course.language}</strong>
          </span>
          <div className='block md:hidden text-[12px] lg:text-[16px] font-black text-white mx-4 '>
            {course.paid
              ? currencyFormatter({
                  amount: course.price,
                  currency: 'usd',
                })
              : 'Free'}
          </div>
          <span className='block md:hidden text-slate-400 line-through text-[10px] lg:text-[12px]'>
            {course.paid
              ? currencyFormatter({
                  amount: course.price + 10,
                  currency: 'usd',
                })
              : ''}
          </span>
        </div>
      </div>
      <div className=' flex flex-row justify-end items-center max-sm:w-full'>
        <div className='hidden md:block text-[12px] lg:text-[16px] font-black text-white md:mr-4 '>
          {course.paid
            ? currencyFormatter({
                amount: course.price,
                currency: 'usd',
              })
            : 'Free'}
        </div>
        <span className='hidden md:block text-slate-400 line-through text-[10px] lg:text-[12px]'>
          {course.paid
            ? currencyFormatter({
                amount: course.price + 10,
                currency: 'usd',
              })
            : ''}
        </span>
        <button
          className='btn btn-primary hidden sm:block ml-0 md:ml-8'
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
        <button
          className='btn btn-primary block sm:hidden !py-0 w-full !px-4 !min-h-[2rem] !h-[2rem]'
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
  )
}

const SingleCourse = ({ params, numberOfReviews, averageRating, i }) => {
  const urlParams = new URLSearchParams(window.location.search)
  const referralCode = urlParams.get('cref')

  if (referralCode) {
    sessionStorage.setItem('courseReferralCode', referralCode)
  }
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
  const stickyBarRef = useRef(null)
  const enrollButtonRef = useRef(null)
  const enrollButtonMdRef = useRef(null)

  useEffect(() => {
    const checkScrollPosition = () => {
      const largerScreenButtonVisible =
        enrollButtonRef.current &&
        enrollButtonRef.current.getBoundingClientRect().bottom > 0
      const smallerScreenButtonVisible =
        enrollButtonMdRef.current &&
        enrollButtonMdRef.current.getBoundingClientRect().bottom > 0

      if (stickyBarRef.current) {
        if (!largerScreenButtonVisible && !smallerScreenButtonVisible) {
          if (stickyBarRef.current.style.opacity !== '1') {
            gsap.fromTo(
              stickyBarRef.current,
              { opacity: 0, y: -100 },
              { opacity: 1, y: 0, duration: 0 }
            )
          }
        } else {
          // If the button is visible
          if (stickyBarRef.current.style.opacity !== '0') {
            gsap.to(stickyBarRef.current, {
              opacity: 0,
              y: -100,
              duration: 0,
            })
          }
        }
      }
    }

    window.addEventListener('scroll', checkScrollPosition)

    return () => {
      window.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

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
    const referralCode = sessionStorage.getItem('courseReferralCode')
    try {
      if (!user) router.push('/login')
      if (enroll.status)
        return router.push(
          `/user/course/${enroll.course.slug}/?cref=${referralCode}`
        )
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
      <div className='text-center bg-gray-700 text-white w-full lg:pb-[100px] pb-[40px] md:pt-[50px] flex flex-col justify-center text-[28px] items-center font-bold '>
        <div className='flex flex-col-reverse justify-between items-center gap-4  md:flex-row md:items-start md:w-[90vw] lg:max-w-[1080px] lg:max-h-[363px]'>
          <div className='flex flex-col justify-center items-start gap-3 w-[90vw] md:w-[45vw] '>
            <h1 className='font-bold text-left text-2xl lg:text-3xl'>
              {course.name}
            </h1>
            <p className='text-left text-[10px] lg:text-[14px]'>
              {course &&
                course.description &&
                course.description.substring(0, 300)}
              ...
            </p>
            <div className='flex flex-wrap items-center gap-x-2'>
              {course.category &&
                course.category
                  // .split(' ')
                  .map((c) => (
                    <Link href={`/marketplace/${c.value}`}>
                      <span className='badgeuidesign'>{c.label}</span>
                    </Link>
                  ))}
            </div>
            <div className='flex items-center gap-2'>
              <h1 className='text-[20px] font-bold text-indigo-400'>
                {course.averageRating}
              </h1>
              <RatingStars
                AverageRating={course.averageRating ? course.averageRating : 0}
                index={i}
              />
              <span className='text-slate-400 text-sm'>
                ({course.numberOfReviews} reviews)
              </span>
            </div>
            <p className='text-[10px] lg:text-[14px]'>
              Created By{' '}
              <Link
                href={`/instructor-details/${course.instructor._id}`}
                className='underline underline-offset-1 text-gray-300 hover:text-white'
              >
                {course && course.instructor && course.instructor.name}
              </Link>
            </p>
            <div className='flex flex-row items-center gap-x-10'>
              <p className='text-[10px] lg:text-[14px]'>
                Level: {course && course.level && course.level}
              </p>
              <p className='text-[10px] lg:text-[14px]'>
                Language: {course && course.language && course.language}
              </p>
            </div>
            <p className='text-[10px] lg:text-[14px]'>
              Last Updated{' '}
              {course &&
                course.updatedAt &&
                new Date(course.updatedAt).toLocaleDateString()}
            </p>
            <div className='flex gap-2'>
              <span className='text-[12px] lg:text-[16px] font-black'>
                {course.paid
                  ? currencyFormatter({
                      amount: course.price,
                      currency: 'usd',
                    })
                  : 'Free'}
              </span>
              <span className='text-slate-400 line-through text-[10px] lg:text-[12px]'>
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
              ref={enrollButtonMdRef}
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
            course.lessons &&
            course.lessons[0].video &&
            course.lessons[0].video.Location ? (
              <div
                onClick={() => {
                  handlePreview(course.lessons[0].video)
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
              className='btn btn-primary w-full mt-[30px] hidden md:block'
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
              ref={enrollButtonRef}
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
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div
          ref={stickyBarRef}
          style={{ opacity: 0, transform: 'translateY(-1000px)' }}
        >
          <StickyBar
            course={course}
            loading={loading}
            user={user}
            enroll={enroll}
            goToCourse={goToCourse}
            handlePaidEnrollment={handlePaidEnrollment}
            handleFreeEnrollment={handleFreeEnrollment}
            handleCheckLogin={handleCheckLogin}
          />
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
      {course && <SingleCourseReviews course={course} />}
    </div>
  )
}

export default SingleCourse
