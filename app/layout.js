'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import TopNav from '../components/TopNav'
import { Provider } from '../context/index'
import LearningCard from '../components/cards/LearningCard'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EdRoam',
  description: 'Your best experience in Learning and Teaching',
}

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)

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
    <html lang='en' data-theme='winter'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <TopNav
            LearningCard={LearningCard}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />

          {/* <div className='relative pt-[70px] font-sans'>
            <div className='z-10'>{children}</div>

            <div className=' absolute w-full h-screen] z-20 bg-black'>
              <div
                className='fixed inset-0 z-20 bg-black opacity-50 blur'
                onClick={() => setIsOpen(false)}
              ></div>
            </div>
          </div> */}

          <div className='pt-[70px] font-sans'>
            {children}
            {isOpen && (
              <div
                className='fixed inset-0 z-10 bg-black opacity-50 blur'
                onClick={() => setIsOpen(false)}
              ></div>
            )}
          </div>

          {/* <div
            className={`pt-[70px] font-sans ${
              isOpen ? 'inset-0 opacity-50 z-10 blur overflow-hidden' : ''
            }`}
            onClick={() => {
              isOpen && setIsOpen(false)
            }}
          >
            <div className={isOpen ? 'pointer-events-none ' : ''}>
              {children}
            </div>
          </div> */}

          {/* {isOpen == false ? (
            <div className='pt-[70px] font-sans'>{children}</div>
          ) : (
            <div
              className='pt-[70px] font-sans fixed inset-0 opacity-20 z-10'
              onClick={() => setIsOpen(false)} // Close dropdown when mask is clicked
            >
              <div className='pointer-events-none'>{children}</div>
            </div>
          )} */}
        </Provider>
      </body>
    </html>
  )
}
