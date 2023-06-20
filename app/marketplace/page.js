'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import CourseCard from '@/components/cards/CourseCard'

const marketplace = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get('/api/courses')
      setCourses(data)
    }
    fetchCourses()
  }, [])
  return (
    <div className='flex flex-col justify-center items-center mt-10 w-full mb-10'>
      {/* <h1>Marketplace</h1> */}
      <div className='flex flex-row justify-center w-full  flex-wrap gap-10'>
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default marketplace
