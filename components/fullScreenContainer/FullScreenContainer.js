'use client'

import React, { useRef, useState } from 'react'

import { AiOutlineFullscreen } from 'react-icons/ai'

const FullScreenContainer = ({ children }) => {
  const containerRef = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const handleFullScreen = () => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      // Current document is in full screen mode, so let's exit
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      setIsFullScreen(false)
    } else {
      // Current document is not in full screen mode, so let's enter
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen()
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen()
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen()
      }
      setIsFullScreen(true)
    }
  }

  return (
    <div ref={containerRef} className='h-[61vh]'>
      <div
        style={{
          position: 'relative',
          overflow: 'auto', // 'hidden' to clip content, 'scroll' to always show scrollbar
          height: '95%', // adjust this to set the container height
        }}
        className='bg-gray-100 '
      >
        {children}
      </div>
      <div className='bg-gray-700  px-4 py-2 text-white flex w-full justify-end items-center bottom-0 '>
        <div className='tooltip tooltip-left' data-tip='Full Screen'>
          <AiOutlineFullscreen
            onClick={handleFullScreen}
            className='text-2xl cursor-pointer'
          />
        </div>
      </div>
    </div>
  )
}

export default FullScreenContainer
