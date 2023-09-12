'use client';

import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Context } from '@/context/index';
import Footer from '@/components/Footer';

const BecomeInstructor = async ({ userBeInstructorPage, footer, allCat }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // const [ok, setOk] = useState(false);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const { data } = await axios.get('/api/current-user');
  //       // console.log(data)
  //       if (data.ok) setOk(true);
  //     } catch (err) {
  //       console.log(err);
  //       router.push('/login');
  //     }
  //   };
  //   fetchUser();
  // }, []);
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
      {/* {ok && (
        <> */}
      <div className='flex flex-col w-full items-center justify-center my-10'>
        <div className=' flex flex-row justify-between md:max-w-2xl w-full max-md:px-10 mb-5'>
          <div>0 Fees to join our platform as an instructor</div>
          <img alt='Testing' />
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
        <div className=' flex my-5 md:max-w-2xl w-full justify-center'>
          <ReactPlayer
            url='https://www.youtube.com/watch?v=ZNIlRRvRiWs'
            controls
            playing={false}
          />
        </div>

        <div className='my-5'>Partnership details</div>

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
    //   )}
    // </>
  );
};

export default BecomeInstructor;
