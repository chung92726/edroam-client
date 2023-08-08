'use client'

import { useState } from 'react'

export const openModal = () => {
  window.popup_rating.showModal()
}

const PopupRating = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  return (
    <dialog id='popup_rating' className='modal'>
      <form method='dialog' className='modal-box'>
        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
          ✕
        </button>
        <h3 className='font-bold text-lg'>Hello!</h3>
        <p className='py-4'>Press ESC key or click on ✕ button to close</p>
      </form>
    </dialog>
  )
}

export default PopupRating
