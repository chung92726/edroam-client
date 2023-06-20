'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
const InstructorNav = () => {
  const [currentPage, setCurrentPage] = useState('')
  const path = usePathname()
  useEffect(() => {
    setCurrentPage(path.substring(1, path.length))
  }, [path])
  return (
    <>
      <div className='user-nav fixed '>
        <ul className='menu bg-gray-800 h-[100vh]  gap-5  pt-5 text-white text-[16px] w-52 rounded-[2px] transition-all ease-in-out duration-300'>
          <li
            className={
              currentPage === 'instructor'
                ? 'text-blue-400 '
                : 'hover:text-blue-400'
            }
          >
            <Link href='/instructor'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              <p className='mx-4 '>My Courses</p>
            </Link>
          </li>
          <li
            className={
              currentPage === 'instructor/course/create'
                ? 'text-blue-400 '
                : 'hover:text-blue-400'
            }
          >
            <Link href='/instructor/course/create'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <p className='mx-4'>Create Course</p>
            </Link>
          </li>
          <li
            className={
              currentPage === 'instructor/dashboard'
                ? 'text-blue-400 '
                : 'hover:text-blue-400'
            }
          >
            <Link href='/instructor/dashboard'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
              <p className='mx-4'>Dashboard</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default InstructorNav
