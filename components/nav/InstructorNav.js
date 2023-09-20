'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { ImUserTie } from 'react-icons/im'
import { HiHome } from 'react-icons/hi'
import { ImStatsBars2 } from 'react-icons/im'
import { LuFileQuestion } from 'react-icons/lu'
import { BiBook } from 'react-icons/bi'
import { RiCoupon2Line } from 'react-icons/ri'

const links = [
  {
    name: 'My Courses',
    path: '/instructor',
    icon: <HiHome size={20} />,
    page: 'instructor',
  },
  {
    name: 'Create Course',
    path: '/instructor/course/create',
    icon: <MdOutlineCreateNewFolder size={20} />,
    page: 'instructor/course/create',
  },
  {
    name: 'Dashboard',
    path: '/instructor/dashboard',
    icon: <ImStatsBars2 size={20} />,
    page: 'instructor/dashboard',
  },
  {
    name: 'My Students',
    path: '/instructor/mystudents',
    icon: <ImUserTie size={20} />,
    page: 'instructor/mystudents',
  },
  {
    name: 'All Q&A',
    path: '/instructor/allquestions',
    icon: <LuFileQuestion size={20} />,
    page: 'instructor/allquestions',
  },
  {
    name: 'My Quiz',
    path: '/instructor/quiz',
    icon: <BiBook size={20} />,
    page: 'instructor/quiz',
  },
  {
    name: 'My Discount Code',
    path: '/instructor/coupons',
    icon: <RiCoupon2Line size={20} />,
    page: 'instructor/coupons',
  },
]

const InstructorNav = () => {
  const [currentPage, setCurrentPage] = useState('')
  const path = usePathname()
  useEffect(() => {
    // Remove the two-letter language prefix and the initial slash
    const strippedPath = path.replace(/^\/[a-z]{2}\//, '')
    setCurrentPage(strippedPath)
  }, [path])
  return (
    <>
      <div className='user-nav fixed '>
        <ul className='menu bg-gray-800 h-[calc(100vh-70px)]  gap-5  pt-8 text-white text-[15px]  rounded-[2px] transition-all ease-in-out duration-300 w-[4rem] lg:w-[13rem]'>
          {links.map((link, index) => (
            <li
              key={index}
              className={
                currentPage === link.page
                  ? 'text-blue-400 '
                  : 'hover:text-blue-400'
              }
            >
              <Link href={link.path}>
                {link.icon}
                <p className='mx-2 hidden lg:block'>{link.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default InstructorNav
