"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { MdOutlineCreateNewFolder } from "react-icons/md"
import { ImUserTie } from "react-icons/im"
import { HiHome } from "react-icons/hi"
import { ImStatsBars2 } from "react-icons/im"
import { LuFileQuestion } from "react-icons/lu"
import { BiBook } from "react-icons/bi"
const InstructorNav = () => {
  const [currentPage, setCurrentPage] = useState("")
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
              currentPage === "instructor"
                ? "text-blue-400 "
                : "hover:text-blue-400"
            }
          >
            <Link href='/instructor'>
              <HiHome size={20} />
              <p className='mx-2 hidden lg:block'>My Courses</p>
            </Link>
          </li>
          <li
            className={
              currentPage === "instructor/course/create"
                ? "text-blue-400 "
                : "hover:text-blue-400"
            }
          >
            <Link href='/instructor/course/create'>
              <MdOutlineCreateNewFolder size={20} />
              <p className='mx-2 hidden lg:block'>Create Course</p>
            </Link>
          </li>
          <li
            className={
              currentPage === "instructor/dashboard"
                ? "text-blue-400 "
                : "hover:text-blue-400"
            }
          >
            <Link href='/instructor/dashboard'>
              <ImStatsBars2 size={20} />
              <p className='mx-2 hidden lg:block'>Dashboard</p>
            </Link>
          </li>
          <li
            className={
              currentPage === "instructor/mystudents"
                ? "text-blue-400 "
                : "hover:text-blue-400"
            }
          >
            <Link href='/instructor/mystudents'>
              <ImUserTie size={20} />
              <p className='mx-2 hidden lg:block'>My Students</p>
            </Link>
          </li>
          <li
            className={
              currentPage === "instructor/allquestions"
                ? "text-blue-400 "
                : "hover:text-blue-400"
            }
          >
            <Link href='/instructor/allquestions'>
              <LuFileQuestion size={20} />
              <p className='mx-2 hidden lg:block'>All Q&A</p>
            </Link>
          </li>
          <li
            className={
              currentPage === "instructor/quiz"
                ? "text-blue-400 "
                : "hover:text-blue-400"
            }
          >
            <Link href='/instructor/quiz'>
              <BiBook size={20} />
              <p className='mx-4'>My Quiz</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default InstructorNav
