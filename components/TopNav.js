'use client'

import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import { RiMenu3Line, RiRegisteredLine } from 'react-icons/ri'
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
import { useSearchParams } from 'next/navigation'

// import Link from 'next-intl/link';

const languages = {
  en: 'US',
  zh: 'HK',
  cn: 'CN',
}
const languages_selection = {
  en: 'English',
  zh: '繁體中文',
  cn: '简体中文',
}
const languages_array = ['en', 'zh', 'cn']

const TopNav = ({ dict, lang, topNav, allCat }) => {
  const [currentPage, setCurrentPage] = useState('')
  const path = usePathname()
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)

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
      toast.success(`${topNav.toast_success}`)
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
    let newPath = `/${language}/${segments.join('/')}`

    // Build the query string from searchParams
    const keys = Array.from(searchParams.keys())
    if (keys.length > 0) {
      const queryArray = keys.map((key) => {
        const value = searchParams.get(key)
        return `${key}=${value}`
      })
      newPath += '?' + queryArray.join('&')
    }

    router.push(newPath)
  }

  useEffect(() => {
    // Function to prevent scrolling
    const preventScroll = (e) => {
      e.preventDefault()
    }

    if (isOpen) {
      // Add the no-scroll class to the body
      document.body.classList.add('no-scroll')

      // Add the event listener to prevent default scrolling
      window.addEventListener('touchmove', preventScroll, { passive: false })
      window.addEventListener('wheel', preventScroll, { passive: false })
    } else {
      // Remove the no-scroll class from the body
      document.body.classList.remove('no-scroll')

      // Remove the event listener
      window.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('wheel', preventScroll)
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('wheel', preventScroll)
    }
  }, [isOpen])

  return (
    <div className='flex flex-col w-full fixed z-50'>
      {isOpen && (
        <>
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
          <div
            className='fixed top-[73px] inset-0 z-10 bg-black opacity-50 blur'
            onClick={() => setIsOpen(false)}
          ></div>
        </>
      )}
      <div className='navbar bg-base-100 h-[70px]'>
        <ToastContainer position='top-center' />
        <div className='flex-1 max-md:justify-left'>
          <Link
            href='/'
            className='btn btn-ghost normal-case text-xl max-sm:pr-0'
            onClick={() => setCurrentPage('home')}
          >
            <img src='/xltra.png' className='w-[130px]' />
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
                    <p className='ml-[-5px]'>{topNav.Create_Course}</p>
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
                    <p className=' '>{topNav.Become_Instructor}</p>
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
                <p className='mx-1'>{topNav.Browse_Course}</p>
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu dropdown-content p-2 shadow bg-base-200 rounded-box w-64 mt-4'
            >
              <li>
                <Link href='/marketplace' locale='en'>
                  {topNav.All_Course}
                </Link>
              </li>
              <li>
                <Link href='/marketplace/WebDesign'>
                  {allCat['Web Design']}
                  {allCat.Courses}
                </Link>
                {/* <a>Web Development Courses</a> */}
              </li>
              <li>
                <Link href='/marketplace/UIUXDesign'>
                  {allCat['UI/UX Design']}
                  {allCat.Courses}
                </Link>
                {/* <a>UI/UX Design Courses</a> */}
              </li>
              <li>
                <Link href='/marketplace/GraphicDesign'>
                  {allCat['Graphic Design']}
                  {allCat.Courses}
                </Link>
              </li>
              <li>
                <Link href='/marketplace/3DModeling'>
                  {allCat['3D Modeling']}
                  {allCat.Courses}
                </Link>
                {/* <a>3D Modelling Courses</a> */}
              </li>
              <li>
                <Link href='/marketplace/VideoEditing'>
                  {allCat['Video Editing']}
                  {allCat.Courses}
                </Link>
                {/* <a>Video Editing Courses</a> */}
              </li>
            </ul>
          </div>

          <input
            className='input input-bordered w-[30%] ml-2 max-sm:hidden'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                // setSerchQuery(event.target.value.toLowerCase())
                handleSearch()
              }
            }}
            type='text'
            placeholder={topNav.Search_Placeholder}
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

        <div className='dropdown dropdown-end'>
          <label tabIndex={0}>
            <ReactCountryFlag
              countryCode={languages[lang]}
              className='emojiFlag rounded-md mx-1 px-2 py-2 hover:bg-gray-300 cursor-pointer'
              style={{
                fontSize: '35px',
                lineHeight: '35px',
              }}
              svg
            />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-32'
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
                <a className='flex justify-start gap-2 items-center'>
                  <ReactCountryFlag
                    countryCode={languages[language]}
                    className='emojiFlag rounded-md  cursor-pointer'
                    style={{
                      fontSize: '20px',
                      lineHeight: '20px',
                    }}
                    svg
                  />
                  <p className='font-bold text-[12px]'>
                    {languages_selection[language]}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {user ? (
          <div className='flex justify-center items-center'>
            <div className='hidden lg:flex dropdown dropdown-end'>
              <label
                tabIndex={0}
                className='btn btn-ghost rounded-btn max-sm:!pr-0'
              >
                <div className='flex flex-row items-center text-[12px] gap-2 mr-2'>
                  <BsBook className='inline-block mx-[0.5px]' />
                  <p>{topNav.My_Learning}</p>
                </div>
              </label>
              <MyLearningMenu tabIndex={0} topNav={topNav} />
            </div>
          </div>
        ) : null}

        {/* <div className='lg:hidden flex flex-row gap-2 pr-5 max-lg:pr-0'> */}
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
              className='mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-80'
            >
              <div className=' flex flex-row  items-center border-b border-slate-400 p-2 mb-2 w-full'>
                <div className='w-20 rounded-full pr-2'>
                  <img
                    src={
                      user?.picture?.Location !== undefined
                        ? user.picture.Location
                        : '/guest.png'
                    }
                    width='60px'
                    height='60px'
                  />
                </div>
                <div className='flex flex-col'>
                  <p className='pb-2 font-bold'>{user.name}</p>
                  <p className='text-gray-600'>{user.email}</p>
                </div>
              </div>
              <li>
                <Link href='/user/profile'>{topNav.Profile}</Link>
              </li>
              {user &&
              user.role &&
              (user.role.includes('Instructor') ||
                user.role.includes('Pending')) ? (
                <li>
                  <Link href='/instructor'>{topNav.Dashboard}</Link>
                  <Link href='/instructor/course/create'>
                    {topNav.Create_Course}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href='/user/become-instructor'
                    onClick={() => setCurrentPage('login')}
                  >
                    {topNav.Become_Instructor}
                  </Link>
                </li>
              )}
              <li>
                <Link href='/user'>{topNav.My_Learning}</Link>
              </li>
              {/* <li>
                  <a>Settings</a>
                </li> */}
              <li>
                <a onClick={logout}>{topNav.Logout}</a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <div className='hidden md:block mr-5'>
              <Link
                href='/login'
                className=' cursor-pointer border-transparent'
                onClick={() => setCurrentPage('login')}
              >
                <label
                  tabIndex={0}
                  className='ml-1 btn btn-ghost rounded-btn  max-md:!pl-4 px-2'
                >
                  <div className='flex flex-row items-center text-[12px]'>
                    <div className='flex flex-row items-center'>
                      <AiOutlineLogin className='inline-block mx-[0.5px]' />
                      <p className='mx-1'>{topNav.Login}</p>
                    </div>
                  </div>
                </label>
              </Link>
              <Link
                href='/register'
                className=' cursor-pointer border-transparent '
                onClick={() => setCurrentPage('register')}
              >
                <label
                  tabIndex={0}
                  className='mx-1 btn btn-ghost rounded-btn  max-md:!pl-4 px-2 border-indigo-500 '
                >
                  <div className='flex flex-row items-center text-[12px] '>
                    <div className='flex flex-row items-center'>
                      <RiRegisteredLine className='  inline-block mx-[0.5px]' />
                      <p className='mx-1 '>{topNav.Signup}</p>
                    </div>
                  </div>
                </label>
              </Link>
            </div>
            <div className='dropdown dropdown-end m-2 font-sans block md:hidden'>
              <label
                tabIndex={0}
                className='btn btn-ghost btn-circle justify-center items-center'
              >
                <div className='w-8 rounded-full'>
                  <RiMenu3Line size={24} />
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
                      <p className='mx-1'>{topNav.Login}</p>
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
                      <p className='mx-1'>{topNav.Signup}</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {/* </div> */}
      </div>
      <div className='text-center bg-gradient-to-r from-sky-500 to-indigo-500 text-yellow-100 w-full rounded h-[4px] flex flex-col justify-center text-[28px] items-start font-bold '></div>
    </div>
  )
}

export default TopNav
