'use client'

import { useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Tabs } from 'antd'
import { toast } from 'react-toastify'
import LessonTaps from '@/components/adminPage/LessonTaps'
import { MdArrowBack } from 'react-icons/md'
import StudentTaps from '@/components/adminPage/StudentTaps'

const CourseView = ({ params }) => {
  const [course, setCourse] = useState('')
  const [taps, setTaps] = useState('1')
  const router = useRouter()
  const [students, setStudents] = useState([])

  const { slug } = params
  useEffect(() => {
    loadCourse()
  }, [slug])
  useEffect(() => {
    getCourseStudents()
  }, [course])
  const items = [
    {
      key: '1',
      label: `Lessons`,
    },
    {
      key: '2',
      label: `Students`,
    },
    {
      key: '3',
      label: `Q&A`,
    },
  ]

  const tapsChange = (key) => {
    setTaps(key)
  }

  const getCourseStudents = async () => {
    const { data } = await axios.post(`/api/admin/course/students`, {
      courseId: course._id,
    })
    setStudents(data)
    console.log(data)
  }

  const removeStudent = async (courseId, studentId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(
        `/api/admin/course/${courseId}/remove-student/${studentId}`
      )
      toast.success('Student Removed')
      getCourseStudents()
    }
  }

  // function for adding lessons

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/admin/course/${slug}`)
      setCourse(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteLesson = async (courseId, lessonId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(
        `/api/admin/lesson/${courseId}/${lessonId}`
      )
      toast.success('Lesson Deleted')
      loadCourse()
    }
  }

  const handlePublish = async (e, courseId) => {
    let answer = window.confirm(
      'Once you publish your course, it will be live in the marketplace for students to enroll. Are you sure you want to publish this course?'
    )
    if (!answer) return
    try {
      const { data } = await axios.put(`/api/admin/course/publish/${courseId}`)
      setCourse(data)
      toast.success('Course Published')
    } catch (err) {
      toast.error('Course Publish Failed')
    }
  }

  const handleUnpublish = async (e, courseId) => {
    let answer = window.confirm(
      'Once you unpublish your course, it will no longer be live in the marketplace for students to enroll. Are you sure you want to unpublish this course?'
    )
    if (!answer) return
    try {
      const { data } = await axios.put(
        `/api/admin/course/unpublish/${courseId}`
      )
      setCourse(data)
      toast.success('Course Unpublished')
    } catch (err) {
      toast.error('Course Unpublish Failed')
    }
  }

  const deleteCourse = async (slug) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(`/api/admin/courses/${slug}`)
      toast.success('Course Deleted')
      fetchCourses()
    }
  }

  // student count
  const [studentCount, setStudentCount] = useState(0)

  const getStudentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    })
    setStudentCount(data.length)
  }

  useEffect(() => {
    course && getStudentCount()
  }, [course])

  return (
    <>
      {course && (
        <div className='flex flex-col items-center mb-10 '>
          <div className='card-side w-[95%]  max-w-screen-2xl lg:card-side bg-base-100 shadow-xl '>
            <div className='flex w-full justify-start mt-10 ml-8 cursor-pointer'>
              <div
                className='tooltip'
                data-tip='Back To All Courses'
                onClick={() => router.push('/admin/courses')}
              >
                <MdArrowBack size={30} />
              </div>
            </div>
            <figure className='w-full rounded flex justify-center items-center'>
              <img
                src={course.image ? course.image.Location : '/course.png'}
                alt='CoursePic'
                className='rounded w-8/12 mt-4'
              />
            </figure>
            <div className='card-body p-4 '>
              <div className='w-full flex justify-between'>
                <div
                  className={`badge mx-4 ${
                    course.published
                      ? 'badge-success'
                      : course.lessons.length > 5
                      ? 'badge-info'
                      : 'badge-error'
                  }`}
                >
                  {course.published
                    ? 'Published'
                    : course.lessons.length > 5
                    ? 'Ready to Publish'
                    : `Not Ready  ${
                        5 - course.lessons.length
                      } more lessons needed`}
                </div>

                {/* <div
                  className='tooltip cursor-pointer'
                  data-tip='Edit Course Details'
                  onClick={() => router.push(`/instructor/course/edit/${slug}`)}
                >
                  <AiFillEdit size={25} className='mx-4' />
                </div> */}
              </div>
              <div className='stats shadow my-5 text-blue-500'>
                <div className='stat place-items-center'>
                  <div className='stat-title'>Enrolled</div>
                  <div className='stat-value'>{studentCount}</div>
                  {/* <div className='stat-desc'>
                    From January 1st to February 1st
                  </div> */}
                </div>

                <div className='stat place-items-center'>
                  <div className='stat-title'>Total Revenue</div>
                  <div className='stat-value '>{course.TotalRevenue}</div>
                  {/* <div className='stat-desc '>↗︎ 40 (2%)</div> */}
                </div>
              </div>
              <h1 className='card-title mt-2'>
                Author: {course.instructor.name}
              </h1>
              <h1 className='card-title mt-2'>{course.name}</h1>

              <div className='py-2'>{course.description}</div>

              <div className='flex flex-row justify-start flex-wrap items-end h-full gap-2'>
                <div className='justify-start card-actions flex flex-wrap gap-2 items-center'>
                  {course.published ? (
                    <button
                      className='btn btn-accent w-[150px] '
                      onClick={(e) => handleUnpublish(e, course._id)}
                    >
                      Unpublish Course
                    </button>
                  ) : (
                    <button
                      className='btn btn-accent w-[150px]'
                      disabled={course.lessons.length < 5 ? true : false}
                      onClick={(e) => handlePublish(e, course._id)}
                    >
                      Publish Course
                    </button>
                  )}
                </div>
                <div className='justify-start card-actions w-[150px]'>
                  <button
                    className='btn btn-error'
                    onClick={() => {
                      deleteCourse(slug)
                      router.push('/admin/courses')
                    }}
                  >
                    Delete Course
                  </button>
                </div>
              </div>
              <div className='card-actions justify-end mt-2'>
                <div className='badge badge-secondary'>
                  {course.paid ? 'Paid Course' : 'Free Course'}
                </div>
                <div className='badge badge-primary'>
                  Language: {course.language && course.language}
                </div>
                <div className='badge badge-info'>
                  Level: {course.level && course.level}
                </div>
              </div>
            </div>
            <Tabs
              defaultActiveKey='1'
              items={items}
              onChange={tapsChange}
              className='px-4 font-bold text-[16px]'
            />
            <div className='px-4'>
              {taps === '1' && (
                <LessonTaps course={course} deleteLesson={deleteLesson} />
              )}
              {taps === '2' && (
                <StudentTaps
                  course={course}
                  students={students}
                  removeStudent={removeStudent}
                />
              )}
              {taps === '3' && <h1>Tap3</h1>}
            </div>
          </div>
          {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        </div>
      )}
    </>
  )
}

export default CourseView
