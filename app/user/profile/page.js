'use client'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/context/index'
import UserRoute from '@/components/routes/UserRoutes'
import axios from 'axios'

const ProfilePage = () => {
  return (
    <UserRoute>
      <div className='flex flex-row w-full bg-gray-300 items-center'>
        <h1>Profile Page</h1>
      </div>
    </UserRoute>
  )
}

export default ProfilePage
