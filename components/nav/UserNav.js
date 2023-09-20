'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ImBook } from 'react-icons/im'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { RiLockPasswordLine } from 'react-icons/ri'
import { VscHistory } from 'react-icons/vsc'

const UserNav = ({ userRoute }) => {
  const links = [
    {
      name: userRoute.My_Learning,
      path: '/user',
      icon: <ImBook size={20} />,
      page: 'user',
    },
    {
      name: userRoute.My_Profile,
      path: '/user/profile',
      icon: <BsFillInfoCircleFill size={20} />,
      page: 'user/profile',
    },
    {
      name: userRoute.Change_Pw,
      path: '/user/changePassword',
      icon: <RiLockPasswordLine size={20} />,
      page: 'user/changePassword',
    },
    {
      name: userRoute.Enrol_History,
      path: '/user/history',
      icon: <VscHistory size={20} />,
      page: 'user/history',
    },
  ]

  const [currentPage, setCurrentPage] = useState('')
  const path = usePathname()
  useEffect(() => {
    // Remove the two-letter language prefix and the initial slash
    const strippedPath = path.replace(/^\/[a-z]{2}\//, '')
    setCurrentPage(strippedPath)
  }, [path])
  return (
    <div className='user-nav fixed'>
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
  )
}

export default UserNav
