'use client';

import { Context } from '@/context';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const Footer = ({ footer, allCat }) => {
  const router = useRouter();

  // global state
  const { state } = useContext(Context);
  const { user } = state;

  const handleKnowMore = () => {
    try {
      if (!user) router.push('/login');
    } catch (error) {
      toast.error(
        'Please log in to learn more about becoming an instructor on XLearners.'
      );
    } finally {
      if (user) router.push('/user/become-instructor');
    }
  };

  return (
    <div>
      <div className='flex max-sm:flex-col footer p-10 bg-base-200 text-base-content items-center justify-between border-b-2 border-slate-400'>
        <div className=''>
          <h1 className='text-[25px] font-bold leading-relaxed'>
            {footer.WannaTeach}
          </h1>
          <p>{footer.WannaTeach_sub}</p>
        </div>

        <div className='flex justify-end w-[8rem] md:mr-4'>
          <button
            onClick={handleKnowMore}
            className=' cursor-pointer border-transparent'
          >
            <label
              tabIndex={0}
              className='mx-1 btn btn-ghost rounded-btn px-2 border-indigo-500 '
            >
              <div className='flex items-center text-[12px]'>
                <p className='mx-1 '>{footer.LearnMore}</p>
              </div>
            </label>
          </button>
        </div>
      </div>
      <footer className='footer p-10 bg-base-200 text-base-content'>
        <div>
          <img src='/xltra.png' className='w-[250px] mb-10' />
          <p>{footer.Footer_descr}</p>
        </div>
        <div>
          <span className='footer-title'>{footer.Browse_Course}</span>
          <Link href='/marketplace'>
            <div className='link link-hover'>{footer.All_Course}</div>
          </Link>
          <Link href='/marketplace/WebDesign'>
            <div className='link link-hover'>
              {allCat['Web Design']}
              {allCat.Courses}
            </div>
          </Link>
          <Link href='/marketplace/UIUXDesign'>
            <div className='link link-hover'>
              {allCat['UI/UX Design']}
              {allCat.Courses}
            </div>
          </Link>
          <Link href='/marketplace/GraphicDesign'>
            <div className='link link-hover'>
              {allCat['Graphic Design']}
              {allCat.Courses}
            </div>
          </Link>
          <Link href='/marketplace/3DModeling'>
            <div className='link link-hover'>
              {allCat['3D Modeling']}
              {allCat.Courses}
            </div>
          </Link>
          <Link href='/marketplace/VideoEditing'>
            <div className='link link-hover'>
              {allCat['Video Editing']}
              {allCat.Courses}
            </div>
          </Link>
        </div>
        <div>
          <span className='footer-title'>{footer.Footer_Company}</span>
          <Link href='/about'>
            <div className='link link-hover'>{footer.Footer_About}</div>
          </Link>
          <Link href='/about#contact'>
            <div className='link link-hover'>{footer.Footer_Contact}</div>
          </Link>
          {/* <a className='link link-hover'>Corporate Services</a> */}
        </div>
        <div>
          <span className='footer-title'>{footer.Footer_Legal}</span>
          <Link href='/terms'>
            <div className='link link-hover'>{footer.Footer_Terms}</div>
          </Link>
          <Link href='/privacy'>
            <div className='link link-hover'>{footer.Footer_Privacy}</div>
          </Link>
          <Link href='/cookies'>
            <div className='link link-hover'>{footer.Footer_Cookies}</div>
          </Link>
        </div>
      </footer>

      {/* Copy Right */}
      <footer className='footer footer-center p-4 bg-base-300 text-base-content'>
        <div>
          <p>{footer.Copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
