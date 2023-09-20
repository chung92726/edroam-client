'use client'
import { MdAddCircleOutline } from 'react-icons/md'
import CouponModel from '@/components/couponModel/CouponModel'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const couponsPage = () => {
  const [coupon, setcoupon] = useState({
    name: '',
    discountType: 'percentage',
    discount: '',
    expiration: true,
    validFrom: '',
    validTo: '',
    coursesValidFor: [],
    usageLimit: '',
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [courses, setcourses] = useState([])
  const dropdownRef = useRef(null)
  const discountTypeSelection = [
    { name: 'Percentage', value: 'percentage' },
    { name: 'Fixed Price', value: 'fixedPrice' },
  ]

  const fetchPublishedCourses = async () => {
    const { data } = await axios.get('/api/instructor-courses/published')
    setcourses(data)
  }
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }
  const handleCourseSelection = (courseId) => {
    if (coupon.coursesValidFor.includes(courseId)) {
      // If the course is already selected, remove it from the array.
      setcoupon({
        ...coupon,
        coursesValidFor: coupon.coursesValidFor.filter((id) => id !== courseId),
      })
    } else {
      // Otherwise, add the course to the array.
      setcoupon({
        ...coupon,
        coursesValidFor: [...coupon.coursesValidFor, courseId],
      })
    }
  }
  const getCourseNameById = (courseId) => {
    const course = courses.find((course) => course._id === courseId)
    return course ? course.name : '' // Return an empty string if the course isn't found, though this shouldn't happen in practice.
  }
  useEffect(() => {
    fetchPublishedCourses()
  }, [])
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className='w-full'>
      <CouponModel
        coupon={coupon}
        setcoupon={setcoupon}
        discountTypeSelection={discountTypeSelection}
        courses={courses}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleCourseSelection={handleCourseSelection}
        getCourseNameById={getCourseNameById}
        dropdownRef={dropdownRef}
      />
      <div className='text-center  bg-gray-700 text-white w-full  py-[50px] flex flex-col justify-center text-[28px] items-start font-bold '>
        <h1 className='text-4xl pl-10'>My Discount Codes</h1>
      </div>
      <div className='flex flex-col items-center justify-center w-full px-10 py-5'>
        <div className='flex w-full justify-end items-center'>
          <div
            className='tooltip tooltip-left'
            data-tip='Create New Discount Code'
          >
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md '
              onClick={() =>
                document.getElementById('coupon_model').showModal()
              }
            >
              <MdAddCircleOutline size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default couponsPage
