'use client';

import Link from 'next/link';

const Footer = ({ footer, allCat }) => {
  return (
    <div>
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
