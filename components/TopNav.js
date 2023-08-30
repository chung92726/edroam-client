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
import ReactCountryFlag from 'react-country-flag'

// import Link from 'next-intl/link';

const languages = {
  en: 'US',
  zh: 'HK',
  cn: 'CN',
}
const languages_array = ['en', 'zh', 'cn']
const TopNav = ({ dict, lang }) => {
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

  const changeLanguage = (language) => {
    // If the router or path is not ready or defined, don't proceed
    if (!router || !path) return

    // Extract the segments of the current path
    const segments = path.split('/').filter(Boolean) // Removes empty strings from the array

    // If the first segment is a locale, remove it
    if (languages_array.includes(segments[0])) {
      segments.shift()
    }

    // Construct the new URL with the selected language
    const newPath = `/${language}/${segments.join('/')}`
    router.push(newPath)
  }
  return (
    <div className='flex flex-col w-full fixed z-50'>
      <div className='navbar bg-base-100 h-[70px]'>
        <ToastContainer position='top-center' />
        <div className='flex-1 max-md:justify-left'>
          <Link
            href='/'
            className='btn btn-ghost normal-case text-xl'
            onClick={() => setCurrentPage('home')}
          >
            <img src='/xltra.png' className='w-[130px]' />
          </Link>
          {user && user.role ? (
            user.role.includes('Instructor') ||
            user.role.includes('Pending') ? (
              <Link
                href='/instructor/course/create'
                className='mx-4 my-1 cursor-pointer max-md:hidden'
                onClick={() => setCurrentPage('login')}
              >
                <div className='hidden md:flex flex-row items-center'>
                  <div className='btn btn-ghost rounded-btn text-[12px] max-md:hidden'>
                    <IoCreate className='inline-block ' />
                    <p className='ml-[-5px]'>Create Course</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                href='/user/become-instructor'
                className='mx-4 my-1 cursor-pointer max-md:hidden'
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
              className='btn btn-ghost rounded-btn md:px-3 max-md:!pl-4'
            >
              <div className='flex flex-row items-center text-[12px]'>
                <BsShop className='inline-block mx-[0.5px]' />
                <p className='mx-1'>Browse Course</p>
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu dropdown-content p-2 shadow bg-base-200 rounded-box w-64 mt-4'
            >
              <li>
                <Link href='/marketplace' locale='en'>
                  All Courses
                </Link>
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
        </div>
        {user ? (
          <div className='flex justify-center items-center'>
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
          </div>
        ) : null}
        <div className='dropdown dropdown-hover'>
          <ReactCountryFlag
            countryCode={languages[lang]}
            className='emojiFlag rounded-md mx-1 px-2 py-2 hover:bg-gray-300 cursor-pointer'
            style={{
              fontSize: '35px',
              lineHeight: '35px',
            }}
            svg
          />
          <ul
            tabIndex={0}
            className='dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-30'
          >
            {languages_array.map((language) => (
              <li
                key={language}
                onClick={() => {
                  if (lang !== language) {
                    changeLanguage(language)
                  }
                }}
              >
                <a>
                  <ReactCountryFlag
                    countryCode={languages[language]}
                    className='emojiFlag rounded-md  cursor-pointer'
                    style={{
                      fontSize: '20px',
                      lineHeight: '20px',
                    }}
                    svg
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='hidden md:flex flex-row gap-2 mr-10'>
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
        <div className='md:hidden flex flex-row gap-2 pr-5 max-sm:pr-0'>
          {/* <div className='form-control'>
          <input
            type='text'
            placeholder='Search'
            className='input input-bordered w-24 md:w-auto'
          />
          </div> */}
          {user ? (
            <div className='dropdown dropdown-end m-2 font-sans'>
              <label
                tabIndex={0}
                className='btn btn-ghost btn-circle avatar mr-2'
              >
                <div className='w-8 mr-2 rounded-full'>
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
                <div className='w-8 mr-2 rounded-full'>
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
