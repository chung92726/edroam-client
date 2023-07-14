'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import HomeCourseCard from '../cards/HomeCourseCard';

const HomePage = ({ params }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = params
        ? await axios.get(`/api/courses/${params}`)
        : await axios.get(`/api/courses/`);

      const limitedPrograms = data.slice(0, 3);

      setCourses(limitedPrograms);
      console.log(limitedPrograms);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <div className=' bg-base-000 mx-auto py-10 px-2 sm:px-6 lg:px-8 w-full overflow-x-hidden'>
        {/* Hero Section */}
        <div className='hero py-10 mx-auto w-full '>
          {/* blob background   */}
          <div className=' flex items-center justify-center  w-full overflow-x-hidden'>
            <div className='absolute lg:relative w-full max-w-lg  '>
              <div className='absolute top-0 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob  overflow-x-hidden max-sm:w-40 max-sm:h-40 max-sm:left-10'></div>
              <div className='absolute -top-20 left-5 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000 overflow-x-hidden max-sm:w-40 max-sm:h-10 max-sm:left-10'></div>
              <div className='absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000 overflow-x-hidden max-sm:w-40 max-sm:h-10 max-sm:left-20'></div>
            </div>
          </div>

          <div className='hero-content flex-col items-center justify-center lg:flex-row-reverse w-full'>
            <img
              src='./heropic.png'
              alt='hero'
              className=' max-w-sm py-10 rounded-lg max-sm:w-[300px]'
            />

            <div className=''>
              <h1 className='  font-sans text-6xl font-bold max-w-xl text-left max-sm:text-[48px]'>
                Up Your
                <span className='animate-pulse text-transparent bg-clip-text bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500'>
                  {' '}
                  Digital Design Skills{' '}
                </span>
                To Advance Your Career Path
              </h1>

              <p className='font-sans text-s text-left max-w-sm my-5 '>
                Provides you with the latest online learning system and material
                that help your digital design knowledge growing.
              </p>

              {/* <div className='flex space-x-3 my-5'>
              <div className='flex items-center box-border rounded-lg space-x-2 border-2 border-indigo-400 bg-zinc-100  p-2 '>
                <span className='bg-indigo-500 p-1 rounded-lg text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                    />
                  </svg>
                </span>
                <div className='static'>
                  <p>Expert Tutors</p>
                  <strong className='text-xl font-bold'></strong>
                </div>
              </div>

              <div className='flex items-center box-border rounded-lg space-x-2 border-2 border-indigo-400 bg-zinc-100  p-2 '>
                <span className='bg-indigo-500 p-1 rounded-lg text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z'
                    />
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z'
                    />
                  </svg>
                </span>
                <div className='static'>
                  <p>Course</p>
                  <strong className='text-xl font-bold'></strong>
                </div>
              </div>

              <div className='flex items-center box-border rounded-lg space-x-2 border-2 border-indigo-400 bg-zinc-100  p-2 '>
                <span className='bg-indigo-500 p-1 rounded-lg text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
                    />
                  </svg>
                </span>

                <div className='static'>
                  <p>Video Courses</p>
                  <strong className='text-xl font-bold'></strong>
                </div>
              </div>
            </div> */}

              <div className=' space-x-3 '>
                <Link href='/marketplace'>
                  <button className='btn btn-primary bg-indigo-500'>
                    Get Started
                  </button>
                </Link>
                {/* <button className='btn btn-primary'>Get free trial</button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Our Services Section */}
        <div className='py-10 w-ful'>
          <p className='font-sans text-s font-bold text-indigo-500 text-center my-2 '>
            Course Categories
          </p>
          <h1 className='font-sans text-4xl font-bold text-center '>
            Fostering a playful & engaging learning environment
          </h1>

          <div className='flex flex-col items-center justify-center  gap-5 p-10  lg:flex-row'>
            <div className='w-72 h-72  rounded-lg bg-indigo-500 text-primary-content border border-slate-200 drop-shadow-;g'>
              <div className='card-body'>
                <div className='flex gap-4'>
                  <img src='./uiuxlogo.png' alt='uiuxlogo' />
                  <h2 className='card-title'>UI/UX Design</h2>
                </div>
                <p className='my-3'>
                  Lessons on design that cover the most recent developments.
                </p>
                <Link href='/marketplace/UIUXDesign'>
                  <div className='card-actions'>
                    <button className='btn'>Learn More</button>
                  </div>
                </Link>
              </div>
            </div>

            <div className='w-72 h-72 rounded-lg  bg-white text-black border border-slate-200  drop-shadow-lg'>
              <div className='card-body'>
                <div className='flex gap-4'>
                  <img src='./3dlogo.png' alt='uiuxlogo' />
                  <h2 className='card-title'>3D Modeling</h2>
                </div>
                <p className='my-3'>
                  3D Modeling courses that cover the most recent 3D trends.
                </p>
                <Link href='/marketplace/3DModeling'>
                  <div className='card-actions '>
                    <button className='btn '>Learn More</button>
                  </div>
                </Link>
              </div>
            </div>

            <div className='w-72 h-72 rounded-lg bg-white text-black border border-slate-200 drop-shadow-lg'>
              <div className='card-body'>
                <div className='flex gap-4'>
                  <img src='./videoeditlogo.png' alt='videoedit' />
                  <h2 className='card-title'>Video Editing</h2>
                </div>
                <p className='my-3'>
                  Lessons in video editing learning form offline editing to
                  special effects.{' '}
                </p>
                <Link href='/marketplace/VideoEditing'>
                  <div className='card-actions'>
                    <button className='btn'>Learn More</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Explore Button */}
          <div className='flex justify-center'>
            <Link href='/marketplace'>
              <button className='btn  bg-slate-200 text-black hover:text-white border border-slate-400'>
                Explore All Category
              </button>
            </Link>
          </div>
        </div>

        {/* Explore Programs Section */}
        <div className='py-10'>
          <div className='items-center justify-center grid  '>
            <p className='text-center font-sans text-s font-bold text-indigo-500 my-2 '>
              Explore Programs
            </p>
            <h1 className='font-sans text-4xl font-bold text-center '>
              Our Most Popular Programs
            </h1>
            <p className='font-sans text-xl text-slate-500 text-center my-2 '>
              Let's join our famous courses, the knowledge provided will
              definitely be useful for your career.
            </p>
          </div>

          {/* Crouse Card */}
          <div className='flex flex-col gap-5 p-10 w-full justify-center items-center lg:flex-row  '>
            {courses.map((course) => (
              <HomeCourseCard key={course.id} course={course} />
            ))}
            {/* Card 1 */}
            {/* <a href='/#'>
              <div className='w-72 card '>
                <img
                  className='w-full h-full object-cover'
                  src='./figma.jpg'
                  alt='figma'
                />

                <div className='p-3 flex-col asp-3'>
                  <div className='flex items-center gap-2'>
                    <span className='badgeuidesign'>UI Design</span>
                  </div>
                  <div>
                    <h2 className='product-title' title='Figma UI UX Design'>
                      Figma UI UX Design..
                    </h2>
                    <p className='text-xs font-bold'>Drnchrj Academy</p>
                  </div>
                  <div>
                    <span className='flex font-sans text-s text-slate-500 my-2'>
                      Use Figma to get a job in UI Design, User Interface, User
                      Experience design.
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <span className='text-lg font-black'>$350</span>
                    <span className='text-slate-400 line-through '>$500</span>
                  </div>
                </div>
              </div>
            </a> */}

            {/* Card 2 */}
            {/* <a href='/#'>
              <div className='w-72 card'>
                <img
                  className='w-full h-full object-cover'
                  src='./spline.jpg'
                  alt='figma'
                />

                <div className='p-3 flex-col asp-3'>
                  <div className='flex items-center gap-2'>
                    <span className='badgeuidesign'>UI Design</span>
                    <span className='badgeddd'>3D Modeling</span>
                  </div>
                  <div>
                    <h2 className='product-title' title='Figma UI UX Design'>
                      Spline 3D Modeling & Website Design
                    </h2>
                    <p className='text-xs font-bold'>Drnchrj Academy</p>
                  </div>
                  <div>
                    <span className='flex font-sans text-s text-slate-500 my-2'>
                      Use Spline to design 3D model, Animation, 3D Website
                      Design. and Make a real 3D website.
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <span className='text-lg font-black'>$350</span>
                    <span className='text-slate-400 line-through '>$500</span>
                  </div>
                </div>
              </div>
            </a> */}

            {/* Card 3 */}
            {/* <a href='/#'>
              <div className='w-72 card'>
                <img
                  className='w-full h-full object-cover'
                  src='./videoedit.jpg'
                  alt='figma'
                />

                <div className='p-3 flex-col asp-3'>
                  <div className='flex items-center gap-2'>
                    <span className='badgevideo'>Video Editing</span>
                  </div>
                  <div>
                    <h2 className='product-title' title='Figma UI UX Design'>
                      Davinci Resolve Video Editing
                    </h2>
                    <p className='text-xs font-bold'>Drnchrj Academy</p>
                  </div>
                  <div>
                    <span className='flex font-sans text-s text-slate-500 my-2'>
                      Use Davinci Resolve to Offline Video Editing, Motion
                      Tracking, Video Effects Editing.
                    </span>
                  </div>
                  <div className='flex gap-2'>
                    <span className='text-lg font-black'>$350</span>
                    <span className='text-slate-400 line-through '>$500</span>
                  </div>
                </div>
              </div>
            </a> */}
          </div>

          {/* Explore Button */}
          <div className='flex justify-center'>
            <Link href='/marketplace'>
              <button className='btn  bg-slate-200 text-black hover:text-white border border-slate-400'>
                Explore All Programs
              </button>
            </Link>
          </div>
        </div>

        {/* Tutors Section */}
        <div className='py-10'>
          <div className='w-ful px-10'>
            <p className='font-sans text-s font-bold text-indigo-500 text-center my-2 '>
              Tutors
            </p>
            <h1 className='font-sans text-4xl font-bold text-center '>
              Meet the Heroes
            </h1>
            <p className=' font-sans text-xl text-slate-500 text-center my-2 '>
              On ProEdu, instructors from all over the world instruct millions
              of students. We offer the knowledge and abilities.
            </p>
          </div>

          {/* Tutors Card */}
          <div className='flex flex-col items-center justify-center gap-5 p-10 lg:flex-row'>
            {/* Card 1 */}
            <div className='card w-72 bg-zinc-50 shadow-xl'>
              <figure className=' px-10 pt-10 '>
                <div className='avatar'>
                  <div className='w-20 rounded-full'>
                    <img src='./devanddesignlogo.jpg' />
                  </div>
                </div>
              </figure>
              <div className='h-60 card-body items-center text-center '>
                <h2 className='card-title text-lg '>Dev And Design</h2>
                <p className='text-xs font-bold text-indigo-500'>
                  UI Design & Codeing Institute
                </p>
                <p className='text-xs'>
                  Welcome to Dev And Design. We are committed to teaching you
                  how to design and code products from idea stage to final
                  product stage.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className='card w-72 bg-zinc-50 shadow-xl'>
              <figure className='px-10 pt-10'>
                <div className='avatar'>
                  <div className='w-20 rounded-full'>
                    <img src='https://yt3.googleusercontent.com/wk_ZmU4xaPeIsjbSaIGEIuwPEMhZlmnvoMnsZY3lE0MMgcyWdwb-3vHtS0BS21EeAxmzfBbbfg=s176-c-k-c0x00ffffff-no-rj' />
                  </div>
                </div>
              </figure>
              <div className='h-60 card-body items-center text-center'>
                <h2 className='card-title text-lg '>Minh Pham</h2>
                <p className='text-xs font-bold text-indigo-500'>
                  3D Website Designer
                </p>
                <p className='text-xs overflow-ellipsis overflow-hidden '>
                  Award-winning Designer with 14+ years of experience in GUI,
                  Interaction, Animation, and 3D design. Design Lead at Fantasy
                  Interactive, sharing tools and inspiration to help designers
                  bring ideas to life.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className='card w-72 bg-zinc-50 shadow-xl'>
              <figure className='px-10 pt-10'>
                <div className='avatar'>
                  <div className='w-20 rounded-full'>
                    <img src='https://yt3.googleusercontent.com/ytc/AGIKgqNtYihfN7yJ2nS00KYqxP87dVZgUAbCMPaAY35Y0w=s176-c-k-c0x00ffffff-no-rj' />
                  </div>
                </div>
              </figure>
              <div className='h-60 card-body items-center text-center'>
                <h2 className='card-title text-lg '>GFXMentor</h2>
                <p className='text-xs font-bold text-indigo-500'>
                  UI Design & Codeing Institute
                </p>
                <p className='text-xs'>
                  I have experience of 21 years in graphic design teaching. Now
                  I'm teaching it to everyone especially those who can't afford
                  expensive institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className='carousel w-full'>
        {/* Slide1 */}
        <div id='slide1' className='carousel-item relative w-full'>
          <section className='relative isolate carousel w-full overflow-hidden bg-zinc-50 px- py-24 sm:py-32 lg:px-8'>
            <div className='carousel-item w-full mx-auto max-w-2xl lg:max-w-4xl'>
              {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
              <figure className='mt-10'>
                <blockquote className='text-center px-2 text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9'>
                  <p>
                    "For UI/UX designers like myself, this platform offers
                    up-to-date courses, practical insights, and a collaborative
                    learning environment that have had a profound impact on my
                    professional growth."
                  </p>
                </blockquote>
                <figcaption className='mt-10'>
                  <img
                    className='mx-auto h-20 w-20 rounded-full'
                    src='https://i.pinimg.com/736x/e8/cc/a0/e8cca04986164dfd7bdbeaf24b701275.jpg'
                    alt=''
                  />
                  <div className='mt-4 flex items-center justify-center space-x-3 text-base'>
                    <div className='font-semibold text-gray-900'>
                      Rebecca Thompson
                    </div>
                    <svg
                      viewBox='0 0 2 2'
                      width={3}
                      height={3}
                      aria-hidden='true'
                      className='fill-gray-900'
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className='text-gray-600'>UI/UX Designer</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 xl:justify-around'>
            <a
              href='#slide4'
              className='btn border-none bg-transparent btn-circle'
            >
              ❮
            </a>
            <a
              href='#slide2'
              className='btn border-none bg-transparent btn-circle'
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide2 */}
        <div id='slide2' className='carousel-item relative w-full'>
          <section className='relative isolate carousel w-full overflow-hidden bg-zinc-50 px-6 py-24 sm:py-32 lg:px-8'>
            <div className='carousel-item w-full mx-auto max-w-2xl lg:max-w-4xl'>
              {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
              <figure className='mt-10'>
                <blockquote className='text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9'>
                  <p>
                    "This online learning platform transformed my video editing
                    skills, providing comprehensive courses and expert
                    instruction that significantly improved the quality of my
                    projects."
                  </p>
                </blockquote>
                <figcaption className='mt-10'>
                  <img
                    className='mx-auto h-20 w-20 rounded-full'
                    src='./MEN1.jpg'
                    alt=''
                  />
                  <div className='mt-4 flex items-center justify-center space-x-3 text-base'>
                    <div className='font-semibold text-gray-900'>
                      James Roberts
                    </div>
                    <svg
                      viewBox='0 0 2 2'
                      width={3}
                      height={3}
                      aria-hidden='true'
                      className='fill-gray-900'
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className='text-gray-600'>Freelance Videographer</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 xl:justify-around'>
            <a
              href='#slide1'
              className='btn border-none bg-transparent btn-circle'
            >
              ❮
            </a>
            <a
              href='#slide3'
              className='btn border-none bg-transparent btn-circle'
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide3 */}
        <div id='slide3' className='carousel-item relative w-full'>
          <section className='relative isolate carousel w-full overflow-hidden bg-zinc-50 px-6 py-24 sm:py-32 lg:px-8'>
            <div className='carousel-item w-full mx-auto max-w-2xl lg:max-w-4xl'>
              {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
              <figure className='mt-10'>
                <blockquote className='text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9'>
                  <p>
                    "With its tailored courses, experienced instructors, and
                    engaging hands-on learning approach, this online platform
                    empowered me to become a confident 3D modeler."
                  </p>
                </blockquote>
                <figcaption className='mt-10'>
                  <img
                    className='mx-auto h-20 w-20 rounded-full'
                    src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                  <div className='mt-4 flex items-center justify-center space-x-3 text-base'>
                    <div className='font-semibold text-gray-900'>
                      Amanda Nelson
                    </div>
                    <svg
                      viewBox='0 0 2 2'
                      width={3}
                      height={3}
                      aria-hidden='true'
                      className='fill-gray-900'
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className='text-gray-600'>Aspiring 3D Modeler</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 xl:justify-around'>
            <a
              href='#slide2'
              className='btn border-none bg-transparent btn-circle'
            >
              ❮
            </a>
            <a
              href='#slide4'
              className='btn border-none bg-transparent btn-circle'
            >
              ❯
            </a>
          </div>
        </div>

        {/* Slide4 */}
        <div id='slide4' className='carousel-item relative w-full'>
          <section className='relative isolate carousel w-full overflow-hidden bg-zinc-50 px-6 py-24 sm:py-32 lg:px-8'>
            <div className='carousel-item w-full mx-auto max-w-2xl lg:max-w-4xl'>
              {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
              <figure className='mt-10'>
                <blockquote className='text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9'>
                  <p>
                    "As an architecture student, this platform's dedicated
                    section on 3D modeling and visualization, featuring courses
                    on AutoCAD, Revit, and rendering techniques, provided
                    invaluable hands-on experience for creating stunning
                    architectural visualizations."
                  </p>
                </blockquote>
                <figcaption className='mt-10'>
                  <img
                    className='mx-auto h-20 w-20 rounded-full'
                    src='./MEN2.jpg'
                    alt=''
                  />
                  <div className='mt-4 flex items-center justify-center space-x-3 text-base'>
                    <div className='font-semibold text-gray-900'>
                      Alex Ramirez
                    </div>
                    <svg
                      viewBox='0 0 2 2'
                      width={3}
                      height={3}
                      aria-hidden='true'
                      className='fill-gray-900'
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className='text-gray-600'>Architecture Student</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 xl:justify-around'>
            <a
              href='#slide3'
              className='btn border-none bg-transparent btn-circle'
            >
              ❮
            </a>
            <a
              href='#slide1'
              className='btn border-none bg-transparent btn-circle'
            >
              ❯
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='footer p-10 bg-base-200 text-base-content'>
        <div>
          <img src='/Proedu.png' className='w-[150px] mb-10' />
          <p>
            Top learning experiences that create more <br /> talent in the
            world.
          </p>
        </div>
        <div>
          <span className='footer-title'>Browse Course</span>
          <Link href='/marketplace'>
            <div className='link link-hover'>All Courses</div>
          </Link>
          <Link href='/marketplace/WebDesign'>
            <div className='link link-hover'>WebDesign</div>
          </Link>
          <Link href='/marketplace/UIUXDesign'>
            <div className='link link-hover'>UI/UX Design Courses</div>
          </Link>
          <Link href='/marketplace/GraphicDesign'>
            <div className='link link-hover'>Graphic Design Courses</div>
          </Link>
          <Link href='/marketplace/3DModeling'>
            <div className='link link-hover'>3D Modelling Courses</div>
          </Link>
          <Link href='/marketplace/VideoEditing'>
            <div className='link link-hover'>Video Editing Courses</div>
          </Link>
        </div>
        <div>
          <span className='footer-title'>Company</span>
          <a className='link link-hover'>About us</a>
          <a className='link link-hover'>Contact us</a>
          <a className='link link-hover'>Corporate Services</a>
        </div>
        <div>
          <span className='footer-title'>Legal</span>
          <Link href='/terms'>
            <div className='link link-hover'>Terms of use</div>
          </Link>
          <Link href='/privacy'>
            <div className='link link-hover'>Privacy policy</div>
          </Link>
          <Link href='/cookies'>
            <div className='link link-hover'>Cookies policy</div>
          </Link>
        </div>
      </footer>

      {/* Copy Right */}
      <footer className='footer footer-center p-4 bg-base-300 text-base-content'>
        <div>
          <p>Copyright © 2023 - All right reserved by ProEdu Ltd</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
