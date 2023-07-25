'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BiMessageSquareDots } from 'react-icons/bi'

const Mystudents = () => {
  const [students, setStudents] = useState([])
  const loadStudents = async () => {
    try {
      const { data } = await axios.get('/api/instructor/students')
      setStudents(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    loadStudents()
  }, [])
  return (
    <div className='w-full'>
      <div className='text-center  bg-gray-700 text-white w-full  py-[50px] flex flex-col justify-center text-[28px] items-start font-bold '>
        <h1 className='text-4xl pl-10'>My Students</h1>
      </div>
      <div className='overflow-x-auto'>
        <table className='table bg-gray-100'>
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Student Icon</th>
              <th>Student Name</th>
              <th>Enrolled Courses (Your Courses)</th>
              {/* <th>Message</th> */}
            </tr>
          </thead>
          <tbody className='font-bold'>
            {/* row 1 */}
            {students &&
              students[0] &&
              students.map((student, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className='avatar'>
                      <div className='w-12 rounded-full'>
                        <img
                          src={
                            student.picture
                              ? student.picture.Location !== undefined
                                ? student.picture.Location
                                : '/guest.png'
                              : '/guest.png'
                          }
                        />
                      </div>
                    </div>
                  </td>
                  <td>{student.name}</td>
                  <td>
                    <div
                      className='tooltip tooltip-left'
                      data-tip='Click to view all courses'
                    >
                      <div className='collapse '>
                        <input type='checkbox' />
                        <div className='collapse-title text-[12px] w-full flex justify-start items-center'>
                          <p>{student.courses.length} Courses</p>
                        </div>
                        <div className='collapse-content flex flex-col justify-start items-start'>
                          {student.courses &&
                            student.courses.map((course, index) => (
                              <p key={index} className='my-2'>
                                <span>{index + 1}. </span>
                                {course.name}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* <td>
                    <div
                      className='tooltip tooltip-left'
                      data-tip='message this student'
                    >
                      <BiMessageSquareDots
                        size={25}
                        className='cursor-pointer'
                      />
                    </div>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Mystudents
