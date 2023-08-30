'use client'

import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import { RiRegisteredLine } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify'
import { usePathname } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import { Context } from '../context/index'
import { useRouter } from 'next/navigation'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { BsBook, BsShop } from 'react-icons/bs'
import { IoCreate } from 'react-icons/io5'
import axios from 'axios'
import MyLearningMenu from './MyLearningMenu'

const TopNav = ({ isOpen, setIsOpen }) => {
  const [currentPage, setCurrentPage] = useState('')
  const path = usePathname()

  //global state
  const { state, dispatch } = useContext(Context)
  const { user } = state
  const [img, setImg] = useState('')

  useEffect(() => {
    setCurrentPage(path.substring(1, path.length))
  }, [path])

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/logout')
      dispatch({ type: 'LOGOUT' })
      window.localStorage.removeItem('user')
      toast.success('Logout Successfully')
      router.push('/login')
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  const router = useRouter()

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const [localSearchQuery, setLocalSearchQuery] = useState('')

  const handleSearch = async () => {
    setLocalSearchQuery('')
    router.push(`/marketplace/search/${localSearchQuery}`)
  }

  return (
    <div className='flex flex-col w-full fixed z-50'>
      {isOpen && (
        <div className='absolute top-[73px] bg-white z-20 w-full shadow-md rounded'>
          <ul className='py-2'>
            <li className='px-4 py-2'>
              <input
                className='input input-bordered w-full'
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    // setSerchQuery(event.target.value.toLowerCase())
                    setIsOpen(false)
                    handleSearch()
                  }
                }}
                type='text'
                placeholder='Search...'
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </li>
          </ul>
        </div>
      )}
      <div className='navbar bg-base-100 h-[70px]'>
        <ToastContainer position='top-center' />
        <div className='flex-1 max-md:justify-left'>
          <Link
            href='/'
            className='btn btn-ghost normal-case text-xl'
            onClick={() => setCurrentPage('home')}
          >
            <img src='/Proedu.png' className='w-[100px]' />
          </Link>
          {user && user.role ? (
            user.role.includes('Instructor') ||
            user.role.includes('Pending') ? (
              <Link
                href='/instructor/course/create'
                className=' my-1 cursor-pointer max-md:hidden'
                onClick={() => setCurrentPage('login')}
              >
                <div className='hidden md:flex flex-row items-center'>
                  <div className='btn btn-ghost rounded-btn text-[12px] max-md:hidden max-lg:hidden'>
                    <IoCreate className='inline-block' />
                    <p className='ml-[-5px]'>Create Course</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                href='/user/become-instructor'
                className=' my-1 cursor-pointer max-md:hidden'
                onClick={() => setCurrentPage('login')}
              >
                <div className='hidden md:flex flex-row items-center'>
                  <div className='btn btn-ghost rounded-btn text-[12px]'>
                    <FaChalkboardTeacher className='inline-block ml-[-5px]' />
                    <p className=' '>Become Instructor</p>
                  </div>
                </div>
              </Link>
            )
          ) : null}

          <div className='dropdown dropdown-end'>
            <label
              tabIndex={0}
              className='btn btn-ghost rounded-btn  max-md:!pl-4'
            >
              <div className='flex flex-row items-center text-[12px]'>
                <BsShop className='inline-block mx-[0.5px] max-[430px]:hidden' />
                <p className='mx-1'>Browse Course</p>
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu dropdown-content p-2 shadow bg-base-200 rounded-box w-64 mt-4'
            >
              <li>
                <Link href='/marketplace'>All Courses</Link>
              </li>
              <li>
                <Link href='/marketplace/WebDesign'>WebDesign</Link>
                {/* <a>Web Development Courses</a> */}
              </li>
              <li>
                <Link href='/marketplace/UIUXDesign'>UI/UX Design Courses</Link>
                {/* <a>UI/UX Design Courses</a> */}
              </li>
              <li>
                <Link href='/marketplace/GraphicDesign'>
                  Graphic Design Courses
                </Link>
              </li>
              <li>
                <Link href='/marketplace/3DModeling'>3D Modelling Courses</Link>
                {/* <a>3D Modelling Courses</a> */}
              </li>
              <li>
                <Link href='/marketplace/VideoEditing'>
                  Video Editing Courses
                </Link>
                {/* <a>Video Editing Courses</a> */}
              </li>
            </ul>
          </div>

          <input
            className='input input-bordered w-auto max-sm:hidden'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                // setSerchQuery(event.target.value.toLowerCase())
                handleSearch()
              }
            }}
            type='text'
            placeholder='Search...'
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
        </div>
        <div className='hidden max-sm:flex ' onClick={() => setIsOpen(!isOpen)}>
          <label className='btn btn-ghost btn-circle avatar'>
            <div className='flex flex-row items-center rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
          </label>
        </div>

        {user ? (
          <div className='hidden md:flex dropdown dropdown-end'>
            <label
              tabIndex={0}
              className='btn btn-ghost rounded-btn max-sm:!pr-0'
            >
              <div className='flex flex-row items-center text-[12px] gap-2 mr-2'>
                <BsBook className='inline-block mx-[0.5px]' />
                <p>My Learning</p>
              </div>
            </label>
            <MyLearningMenu tabIndex={0} />
          </div>
        ) : null}
        <div className='hidden lg:flex flex-row gap-2 lg:mr-10'>
          {/* <div className='form-control'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto'
          />
          </div> */}
          {user ? (
            <div className='dropdown dropdown-end m-2 font-sans'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-8 rounded-full'>
                  <img
                    src={
                      user?.picture?.Location !== undefined
                        ? user.picture.Location
                        : '/guest.png'
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-sm dropdown-content bg-gray-100 rounded-box w-52'
              >
                <li>
                  <Link href='/user/profile'>Profile</Link>
                </li>
                {user &&
                  user.role &&
                  (user.role.includes('Instructor') ||
                    user.role.includes('Pending')) && (
                    <li>
                      <Link href='/instructor'>Instructor Dashboard</Link>
                    </li>
                  )}
                {/* <li>
                  <a>Settings</a>
                </li> */}
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <ul className='menu menu-horizontal'>
              <Link
                href='/login'
                className='mx-2 my-1 cursor-pointer border-transparent'
                onClick={() => setCurrentPage('login')}
              >
                <div className='flex flex-row items-center'>
                  <AiOutlineLogin className='inline-block mx-[0.5px]' />
                  <p className='mx-1'>Login</p>
                </div>
              </Link>

              <Link
                href='/register'
                className='mx-2 my-1 cursor-pointer border-transparent'
                onClick={() => setCurrentPage('register')}
              >
                <div className='flex flex-row items-center'>
                  <RiRegisteredLine className='inline-block mx-[0.5px]' />
                  <p className='mx-1'>Sign up</p>
                </div>
              </Link>
            </ul>
          )}
        </div>
        <div className='lg:hidden flex flex-row gap-2 pr-5 max-lg:pr-0'>
          {/* <div className='form-control'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto'
          />
          </div> */}
          {user ? (
            <div className='dropdown dropdown-end m-2 font-sans'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-8 rounded-full'>
                  <img
                    src={
                      user?.picture?.Location !== undefined
                        ? user.picture.Location
                        : '/guest.png'
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-sm dropdown-content bg-gray-100 rounded-box w-44'
              >
                <li>
                  <Link href='/user/profile'>Profile</Link>
                </li>
                {user &&
                user.role &&
                (user.role.includes('Instructor') ||
                  user.role.includes('Pending')) ? (
                  <li>
                    <Link href='/instructor'>Instructor Dashboard</Link>
                    <Link href='/instructor/course/create'>Create Course</Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      href='/user/become-instructor'
                      onClick={() => setCurrentPage('login')}
                    >
                      Become Instructor
                    </Link>
                  </li>
                )}
                <li>
                  <Link href='/user'>My Learning</Link>
                </li>
                {/* <li>
                  <a>Settings</a>
                </li> */}
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className='dropdown dropdown-end m-2 font-sans'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-8 rounded-full'>
                  <img src={'/guest.png'} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-sm dropdown-content bg-gray-100 rounded-box w-52 z-40'
              >
                <li>
                  <Link
                    href='/login'
                    className='mx-2 my-1 cursor-pointer border-transparent'
                    onClick={() => setCurrentPage('login')}
                  >
                    <div className='flex flex-row items-center'>
                      <AiOutlineLogin className='inline-block mx-[0.5px]' />
                      <p className='mx-1'>Login</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link
                    href='/register'
                    className='mx-2 my-1 cursor-pointer border-transparent'
                    onClick={() => setCurrentPage('register')}
                  >
                    <div className='flex flex-row items-center'>
                      <RiRegisteredLine className='inline-block mx-[0.5px]' />
                      <p className='mx-1'>Sign up</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='text-center bg-gradient-to-r from-sky-500 to-indigo-500 text-yellow-100 w-full rounded h-[4px] flex flex-col justify-center text-[28px] items-start font-bold '></div>
    </div>
  )
}

export default TopNav
