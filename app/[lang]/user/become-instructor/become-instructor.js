'use client';

import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsCameraVideo, BsRobot, BsShop } from 'react-icons/bs';
import { MdComputer, MdEventNote } from 'react-icons/md';
import { Context } from '@/context/index';
import Footer from '@/components/Footer';

const BecomeInstructor = async ({ userBeInstructorPage, footer, allCat }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // global state
  const { state } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (!user) router.push('/login');
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className='flex flex-col w-full items-center justify-center mb-10'>
        <div className=' flex w-full min-h-[58vh] bg-gradient-to-r from-indigo-300 justify-center items-center pt-10 mb-5'>
          <div className=' flex flex-row justify-between items-center md:max-w-[1000px] w-full max-md:px-10'>
            <div className='md:max-w-xl w-full'>
              <div className='flex gap-3 '>
                <div>
                  <MdComputer className='h-6 w-6 ' />
                </div>
                <div className=' mb-5'>
                  <h1 className='font-bold'>Learners' Shop</h1>
                  <p>
                    Xlearners provides a complimentary platform for creators to
                    showcase their video courses.
                  </p>
                </div>
              </div>
              <div className='flex gap-3 '>
                <div>
                  <BsCameraVideo className='h-6 w-6 ' />
                </div>
                <div className=' mb-5'>
                  <h1 className='font-bold'>Video Production Service</h1>
                  <p>
                    Xlearners offers a video production service. This ensures
                    that all courses maintain a standard of excellence.
                  </p>
                </div>
              </div>
              <div className='flex gap-3 '>
                <div>
                  <BsShop className='h-6 w-6' />
                </div>
                <div className=' mb-5'>
                  <h1 className='font-bold'>E-commerce Functionality</h1>
                  <p>
                    Students have the opportunity to purchase a variety of
                    products from instructors.
                  </p>
                </div>
              </div>
              <div className='flex gap-3 '>
                <div>
                  <BsRobot size={20} className='h-6 w-6' />
                </div>
                <div className=' mb-5'>
                  <h1 className='font-bold'>AI Review Innovation</h1>
                  <p>
                    While students provide their feedback, our AI system also
                    reviews the course.
                  </p>
                </div>
              </div>
              <div className='flex gap-3 '>
                <div>
                  <MdEventNote size={20} className='h-6 w-6' />
                </div>
                <div className=' mb-5'>
                  <h1 className='font-bold'>Event Creator</h1>
                  <p>
                    Instructors can create real life events to attract more
                    students.
                  </p>
                </div>
              </div>
              <Link
                href='/user/register-instructor'
                className='btn btn-primary my-5 ml-10'
              >
                {userBeInstructorPage.BeInstructor}
              </Link>
            </div>
            <img alt='Testing' src='/hero2.png' width={390} />
          </div>
        </div>

        <div className='flex my-5'>
          <p className='text-[12px]'>
            By registering as an Instructor, you agree to the
          </p>
          &nbsp;
          <Link
            href='/user/instructor-agreement'
            className='text-[12px] link link-primary'
          >
            Instructor Agreement
          </Link>
        </div>
        <div className=' flex my-5 md:max-w-2xl w-full justify-center'>
          <ReactPlayer
            url='https://www.youtube.com/watch?v=ZNIlRRvRiWs'
            controls
            playing={false}
          />
        </div>

        <div className=' flex flex-col my-5 md:max-w-xl w-full '>
          <h1 className=' text-[16px] font-bold text-center mb-5'>
            Partnership Highlights
          </h1>
          <table className='px-10'>
            <tbody>
              <tr>
                <td className='border border-r-0 border-slate-300 text-left rounded-tl-md py-3 pl-10 font-semibold'>
                  Direct Link Sales
                </td>
                <td className='border border-l-0 rounded-tr-md border-slate-300 text-center font-bold text-violet-500'>
                  90%
                </td>
              </tr>
              <tr>
                <td className='border border-r-0 border-slate-300 text-left py-3 pl-10 font-semibold'>
                  Platform-Driven Sales
                </td>
                <td className='border border-l-0 border-slate-300 text-center font-bold text-violet-500'>
                  60%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Link href='/user/register-instructor' className='btn btn-primary my-5'>
          {userBeInstructorPage.BeInstructor}
        </Link>
        <div className='flex my-5'>
          <p className='text-[12px]'>
            By registering as an Instructor, you agree to the
          </p>
          &nbsp;
          <Link
            href='/user/instructor-agreement'
            className='text-[12px] link link-primary'
          >
            Instructor Agreement
          </Link>
        </div>
      </div>
      <Footer footer={footer} allCat={allCat} />
    </>
  );
};

export default BecomeInstructor;
