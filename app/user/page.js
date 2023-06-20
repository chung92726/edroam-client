'use client'

import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/index'
import UserRoute from '../../components/routes/UserRoutes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context)

  const router = useRouter()

  const [courses, setCourses] = useState([])

  const loadCourses = async () => {
    const { data } = await axios.get('/api/user-courses')
    setCourses(data)
  }

  useEffect(() => {
    loadCourses()
  }, [])

  return (
    <UserRoute>
      <div className='text-center bg-gray-700 text-white w-full  pt-[50px] flex flex-col justify-center text-[28px] items-start font-bold '>
        <h1 className='text-4xl pl-10'>My Learning</h1>
        <div className='tabs mt-10 '>
          <a className='tab tab-lifted   tab-active'>My Courses</a>

          <a className='tab tab-lifted text-white'>Wishlist</a>
        </div>
      </div>

      {courses && (
        <div className='flex flex-row justify-start items-center flex-wrap gap-6 mt-10 mx-5'>
          {courses.map((course) => (
            <Link
              className='w-60 border-none cursor-pointer'
              href={`/user/course/${course.slug}`}
            >
              <figure>
                <img
                  src={course.image ? course.image.Location : '/course.png'}
                  alt='course image'
                  className='rounded w-full h-40 object-cover'
                />
              </figure>
              <div className='my-3'>
                <h2 className='font-bold text-[16px]'>{course.name}</h2>
                <p className='text-[12px]'>
                  {course.lessons && course.lessons.length} lessons
                </p>
                <p className='text-[12px] text-gray-400'>
                  By {course.instructor.name}
                </p>
                <div className='card-actions justify-end'>
                  <button
                    className='btn btn-sm btn-info text-[12px]'
                    onClick={() => router.push(`/user/course/${course.slug}`)}
                  >
                    LEARN NOW!
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </UserRoute>
  )
}

export default UserIndex
