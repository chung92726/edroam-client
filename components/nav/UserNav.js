'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ImBook } from 'react-icons/im'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { RiLockPasswordLine } from 'react-icons/ri'
import { VscHistory } from 'react-icons/vsc'

const UserNav = () => {
  const [currentPage, setCurrentPage] = useState('')
  const path = usePathname()
  useEffect(() => {
    setCurrentPage(path.substring(1, path.length))
  }, [path])
  return (
    <div className='user-nav fixed '>
      <ul className='menu bg-gray-800 h-[100vh]  gap-5  pt-8 text-white text-[16px] w-52 rounded-[2px] transition-all ease-in-out duration-300'>
        <li
          className={
            currentPage === 'user' ? 'text-blue-400 ' : 'hover:text-blue-400'
          }
        >
          <Link href='/user'>
            <ImBook size={20} />
            <p className='mx-2'>My Learning</p>
          </Link>
        </li>
        <li
          className={
            currentPage === 'user/profile'
              ? 'text-blue-400 '
              : 'hover:text-blue-400'
          }
        >
          <Link href='/user/profile'>
            <BsFillInfoCircleFill size={20} />
            <p className='mx-2'>My Profile</p>
          </Link>
        </li>
        <li
          className={
            currentPage === 'user/changePassword'
              ? 'text-blue-400 '
              : 'hover:text-blue-400'
          }
        >
          <Link href='/user/changePassword'>
            <RiLockPasswordLine size={20} />
            <p className='mx-2'>Change Password</p>
          </Link>
        </li>
        <li
          className={
            currentPage === 'user/history'
              ? 'text-blue-400 '
              : 'hover:text-blue-400'
          }
        >
          <Link href='/user/history'>
            <VscHistory size={20} />
            <p className='mx-2'>Enrollment History</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default UserNav
