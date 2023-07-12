'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { ImUserTie } from 'react-icons/im'
import { HiHome } from 'react-icons/hi'
import { FiUsers } from 'react-icons/fi'
import { FaBook } from 'react-icons/fa'
import { ImStatsBars2 } from 'react-icons/im'
const AdminNav = () => {
  const [currentPage, setCurrentPage] = useState('')
  const path = usePathname()
  useEffect(() => {
    setCurrentPage(path.substring(1, path.length))
  }, [path])
  return (
    <>
      <div className='user-nav fixed '>
        <ul className='menu bg-gray-800 h-[calc(100vh-70px)]  gap-5  pt-8 text-white text-[16px]  rounded-[2px] transition-all ease-in-out duration-300 w-[4rem] lg:w-[13rem]'>
          <li
            className={
              currentPage === 'admin' ? 'text-blue-400 ' : 'hover:text-blue-400'
            }
          >
            <Link href='/admin'>
              <ImStatsBars2 size={20} />
              <p className='mx-4 hidden lg:block'>Dashboard</p>
            </Link>
          </li>
          <li
            className={
              currentPage === 'admin/courses*'
                ? 'text-blue-400 '
                : 'hover:text-blue-400'
            }
          >
            <Link href='/admin/courses'>
              <FaBook size={20} />
              <p className='mx-4 hidden lg:block'>Courses</p>
            </Link>
          </li>
          <li
            className={
              currentPage === 'admin/members*'
                ? 'text-blue-400 '
                : 'hover:text-blue-400'
            }
          >
            <Link href='/admin/members'>
              <FiUsers size={20} />
              <p className='mx-4 hidden lg:block'>Members</p>
            </Link>
          </li>
          <li
            className={
              currentPage === 'admin/students*'
                ? 'text-blue-400 '
                : 'hover:text-blue-400'
            }
          >
            <Link href='/admin/students'>
              <ImUserTie size={20} />
              <p className='mx-4 hidden lg:block'>Instructors</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default AdminNav
