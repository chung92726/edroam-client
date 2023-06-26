'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { ImUserTie } from 'react-icons/im'
import { HiHome } from 'react-icons/hi'
import { ImStatsBars2 } from 'react-icons/im'
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
              <HiHome size={20} />
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
              <MdOutlineCreateNewFolder size={20} />
              <p className='mx-4'>Add Course</p>
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
              <ImStatsBars2 size={20} />
              <p className='mx-4'>Dashboard</p>
            </Link>
          </li>
          <li
            className={
              currentPage === 'instructor/mystudents'
                ? 'text-blue-400 '
                : 'hover:text-blue-400'
            }
          >
            <Link href='/instructor/mystudents'>
              <ImUserTie size={20} />
              <p className='mx-4'>My Students</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default InstructorNav
