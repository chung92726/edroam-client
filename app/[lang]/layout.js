// 'use client'

import './globals.css';
import { Inter } from 'next/font/google';
import TopNav from '@/components/TopNav';
import LearningCard from '@/components/cards/LearningCard';
import Footer from '@/components/Footer';
import { Provider } from '../../context/index';
import { getDictionary } from './dictionaries.js';
// import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'XLearners',
  description: 'Your best experience in Learning and Teaching',
};

export default async function RootLayout({ children, params: { lang } }) {
  const { dict, topNav, allCat, footer } = await getDictionary(lang);
  // set cookie to lang

  // const [isOpen, setIsOpen] = useState(false)

  // useEffect(() => {
  //   // Function to prevent scrolling
  //   const preventScroll = (e) => {
  //     e.preventDefault()
  //   }

  //   if (isOpen) {
  //     // Add the no-scroll class to the body
  //     document.body.classList.add('no-scroll')

  //     // Add the event listener to prevent default scrolling
  //     window.addEventListener('touchmove', preventScroll, { passive: false })
  //     window.addEventListener('wheel', preventScroll, { passive: false })
  //   } else {
  //     // Remove the no-scroll class from the body
  //     document.body.classList.remove('no-scroll')

  //     // Remove the event listener
  //     window.removeEventListener('touchmove', preventScroll)
  //     window.removeEventListener('wheel', preventScroll)
  //   }

  //   // Cleanup on component unmount
  //   return () => {
  //     document.body.classList.remove('no-scroll')
  //     window.removeEventListener('touchmove', preventScroll)
  //     window.removeEventListener('wheel', preventScroll)
  //   }
  // }, [isOpen])

  return (
    <html lang={lang} data-theme='winter'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <TopNav
            LearningCard={LearningCard}
            dict={dict}
            lang={lang}
            topNav={topNav}
            allCat={allCat}
            // setIsOpen={setIsOpen}
            // isOpen={isOpen}
          />
          <div className='pt-[70px] font-sans'>
            {children}
            {/* {isOpen && (
              <div
                className='fixed inset-0 z-10 bg-black opacity-50 blur'
                onClick={() => setIsOpen(false)}
              ></div>
            )} */}
          </div>
          <Footer footer={footer} allCat={allCat} />
        </Provider>
      </body>
    </html>
  );
}
