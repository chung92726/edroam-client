import React, { useRef, useState } from 'react'

const FullScreenContainer = ({ children }) => {
  const containerRef = useRef(null)

  const handleFullScreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if (containerRef.current.mozRequestFullScreen) {
        /* Firefox */
        containerRef.current.mozRequestFullScreen()
      } else if (containerRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        containerRef.current.webkitRequestFullscreen()
      } else if (containerRef.current.msRequestFullscreen) {
        /* IE/Edge */
        containerRef.current.msRequestFullscreen()
      }
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'auto', // 'hidden' to clip content, 'scroll' to always show scrollbar
        height: '67vh', // adjust this to set the container height
      }}
      className='bg-gray-100'
    >
      <button
        onClick={handleFullScreen}
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
        Full Screen
      </button>
      {children}
    </div>
  )
}

export default FullScreenContainer
