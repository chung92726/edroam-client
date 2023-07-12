'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MdArrowBack } from 'react-icons/md'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import ReactPlayer from 'react-player'

const adminLesson = ({ params }) => {
  const { slug, courseSlug } = params
  const [course, setCourse] = useState('')
  const [lesson, setLesson] = useState('')
  const router = useRouter()
  const loadLesson = async () => {
    try {
      const { data } = await axios.get(
        `/api/admin/course/${courseSlug}/${slug}`
      )
      setLesson(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/admin/course/${courseSlug}`)
      setCourse(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  const deleteLesson = async () => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(
        `/api/admin/lesson/${course._id}/${lesson._id}`
      )

      router.push(`/admin/courses/${courseSlug}`)
    }
  }

  useEffect(() => {
    loadCourse()
    loadLesson()
  }, [slug, courseSlug])
  return (
    <div className=' my-8 w-full flex flex-col items-center justify-start'>
      <div className='w-[95%] flex flex-row justify-between items-center'>
        <div className='tooltip tooltip-right' data-tip='Back to Course'>
          <MdArrowBack
            size={26}
            className='cursor-pointer'
            onClick={() => {
              router.push(`/admin/courses/${course.slug}`)
            }}
          />
        </div>
        <div className='tooltip tooltip-left' data-tip='Delete Lesson'>
          <MdOutlineDeleteForever
            size={26}
            className='cursor-pointer text-red-500'
            onClick={deleteLesson}
          />
        </div>
      </div>
      {course && lesson && (
        <div className='w-[95%] bg-base-100 shadow-xl card mt-4'>
          <figure>
            <div className='w-full mt-2'>
              <ReactPlayer
                url={lesson.video && lesson.video.Location}
                controls={true}
                width='100%'
              />
            </div>
          </figure>
          <div className='card-body'>
            <h2 className='card-title text-[18px]'>
              Course:{' '}
              <span
                className='link link-primary'
                onClick={() => {
                  router.push(`/admin/courses/${course.slug}`)
                }}
              >
                {course && course.name}
              </span>
            </h2>
            <h2 className='card-title text-[18px]'>
              Lesson: {lesson && lesson.title}
            </h2>
            <p className='text-[12px] mt-2'>
              {`Created At: ${new Date(
                lesson.createdAt
              ).toLocaleDateString()}    Updated At: ${new Date(
                lesson.updatedAt
              ).toLocaleDateString()}`}
            </p>
            <p>{lesson && lesson.content}</p>
            <div className='card-actions justify-end'>
              <div className='badge badge-secondary'>
                {lesson.free_preview ? 'Free Preview' : 'Paid to Watch'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default adminLesson
