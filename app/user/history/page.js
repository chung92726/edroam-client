'use client'
import UserRoute from '@/components/routes/UserRoutes'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

const EnrollmentHistory = () => {
  const [history, setHistory] = useState([])
  useEffect(() => {
    const loadEnrollmentHistory = async () => {
      try {
        const { data } = await axios.get('/api/user/enrollment-history')
        setHistory(data)
      } catch (err) {
        console.log(err)
      }
    }
    loadEnrollmentHistory()
  }, [])
  return (
    <UserRoute>
      <div className='text-center bg-gray-700 text-white w-full  py-[50px] flex flex-col justify-center text-[28px] items-start font-bold '>
        <h1 className='text-4xl pl-10'>My Enrollment History</h1>
      </div>
      <div className='overflow-x-auto'>
        <table className='table bg-gray-100'>
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Course Name</th>
              <th>Instructor Name</th>
              <th>price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {history &&
              history[0] &&
              history.map((enrollment, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{enrollment.course.name}</td>
                  <td>{enrollment.instructor.name}</td>
                  <td>{enrollment.price > 0 ? enrollment.price : 'Free'}</td>
                  <td>{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </UserRoute>
  )
}

export default EnrollmentHistory
