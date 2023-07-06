'use client'

import { useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ReactMarkDown from 'react-markdown'
import AddLessonForm from '@/components/form/AddLessonForm'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { AiFillEdit } from 'react-icons/ai'

const CourseView = ({ params }) => {
  const [course, setCourse] = useState('')
  const video_input = useRef()
  const router = useRouter()
  const supplementary_input = useRef()
  const { slug } = params
  useEffect(() => {
    loadCourse()
  }, [slug])

  // function for adding lessons
  const [values, setValues] = useState({
    title: '',
    content: '',
    video: {},
    uploading: false,
    free_preview: false,
    supplementary_resources: [],
  })
  const [progress, setProgress] = useState(0)
  const [supplementary, setSupplementary] = useState({
    title: '',
    file: {},
    description: '',
    file_type: 'pdf',
    uploading: false,
  })

  const handleAddLesson = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      )
      setValues({
        ...values,
        title: '',
        content: '',
        video: {},
        uploading: false,
        free_preview: false,
        supplementary_resources: [],
      })
      setProgress(0)
      setCourse(data)
      toast.success('Lesson Added')
      video_input.current.value = ''
      window.my_modal.close()
    } catch (err) {
      console.log(err)
      toast.error('Lesson Creation Failed')
    }
  }

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/course/${slug}`)
      setCourse(data)
      console.log(data.lessons.length)
    } catch (err) {
      console.log(err)
    }
  }

  const handleVideo = async (e) => {
    setValues({ ...values, uploading: true })
    try {
      const file = e.target.files[0]
      const videoData = new FormData()
      videoData.append('video', file)
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) =>
            setProgress(Math.round((100 * e.loaded) / e.total)),
        }
      )
      // once response is received
      toast.success('Video Uploaded')

      setValues({ ...values, uploading: false, video: data })
    } catch (err) {
      console.log(err)
      toast.error('Video Upload Failed')
      setValues({ ...values, uploading: false })
    }
  }

  const handleVideoRemove = async () => {
    setValues({ ...values, uploading: true })
    try {
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      )
      video_input.current.value = ''
      setValues({ ...values, uploading: false, video: {} })
      setProgress(0)
      toast.success('Video Removed')
    } catch (err) {
      console.log(err)
      toast.error('Video Remove Failed')
      setValues({ ...values, uploading: false })
    }
  }

  const handleAddSupplementary = async (e) => {
    e.preventDefault()
    setSupplementary({ ...supplementary, uploading: true })
    try {
      const file = e.target.files[0]
      const suppleMentaryData = new FormData()
      suppleMentaryData.append('supplementary', file)
      const { data } = await axios.post(
        `/api/course/supplementary-upload/${course.instructor._id}`,
        suppleMentaryData
      )
      setSupplementary({
        ...supplementary,
        uploading: false,
        file: data,
      })
      toast.success('Supplementary Resource Uploaded')
    } catch (err) {
      toast.error('Supplementary Resource Upload Failed')
      setSupplementary({ ...supplementary, uploading: false })
    }
  }

  const handleSupplementary = async (e) => {
    setValues({
      ...values,
      supplementary_resources: [
        ...values.supplementary_resources,
        supplementary,
      ],
    })
    supplementary_input.current.value = ''
    setSupplementary({
      title: '',
      file: {},
      description: '',
      file_type: 'pdf',
      uploading: false,
    })
  }

  const handleSupplementaryRemove = async (index) => {
    try {
      const { data } = await axios.post(
        `/api/course/supplementary-remove/${course.instructor._id}`,
        values.supplementary_resources[index].file
      )
      let allSupplementary = values.supplementary_resources
      let filtered = allSupplementary.filter((item, i) => i !== index)
      setValues({ ...values, supplementary_resources: filtered })
      toast.success('Supplementary Resource Removed')
    } catch (err) {
      console.log(err)
      toast.error('Supplementary Resource Remove Failed')
    }
  }

  const handlePublish = async (e, courseId) => {
    let answer = window.confirm(
      'Once you publish your course, it will be live in the marketplace for students to enroll. Are you sure you want to publish this course?'
    )
    if (!answer) return
    try {
      const { data } = await axios.put(`/api/course/publish/${courseId}`)
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
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`)
      setCourse(data)
      toast.success('Course Unpublished')
    } catch (err) {
      toast.error('Course Unpublish Failed')
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
        <div className='flex flex-col items-center mb-10 mt-10'>
          <div className='card-side w-10/12  max-w-screen-2xl lg:card-side bg-base-100 shadow-xl mt-6'>
            <dialog id='my_modal' className='modal'>
              <form method='dialog' className='modal-box relative'>
                <div className='flex justify-end text-red-600 mb-4'>
                  <AiOutlineCloseCircle
                    size={25}
                    className='cursor-pointer'
                    onClick={() => window.my_modal.close()}
                  />
                </div>
                <AddLessonForm
                  values={values}
                  setValues={setValues}
                  handleAddLesson={handleAddLesson}
                  handleVideo={handleVideo}
                  progress={progress}
                  handleVideoRemove={handleVideoRemove}
                  video_input={video_input}
                  supplementary={supplementary}
                  setSupplementary={setSupplementary}
                  handleAddSupplementary={handleAddSupplementary}
                  supplementary_input={supplementary_input}
                  handleSupplementary={handleSupplementary}
                  handleSupplementaryRemove={handleSupplementaryRemove}
                />
              </form>
              <form method='dialog' className='modal-backdrop'></form>
            </dialog>
            <figure className='w-full pr-4 rounded flex justify-center items-center'>
              <img
                src={course.image ? course.image.Location : '/course.png'}
                alt='CoursePic'
                className='rounded w-6/12'
              />
            </figure>
            <div className='card-body p-4 '>
              <div className='w-full flex justify-between'>
                <div
                  className={`badge  ${
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

                <div
                  className='tooltip cursor-pointer'
                  data-tip='Edit Course Details'
                  onClick={() => router.push(`/instructor/course/edit/${slug}`)}
                >
                  <AiFillEdit size={25} className='mx-4' />
                </div>
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
                  <div className='stat-title'>Users</div>
                  <div className='stat-value '>4,200</div>
                  {/* <div className='stat-desc '>↗︎ 40 (2%)</div> */}
                </div>

                <div className='stat place-items-center'>
                  <div className='stat-title'>New Registers</div>
                  <div className='stat-value'>1,200</div>
                  {/* <div className='stat-desc'>↘︎ 90 (14%)</div> */}
                </div>
              </div>
              <h1 className='card-title mt-2'>{course.name}</h1>

              <div className='py-6'>{course.description}</div>
              <div className='flex flex-row justify-start items-end h-full'>
                <div className='justify-start card-actions mx-2'>
                  <button
                    className='btn btn-info'
                    onClick={() => window.my_modal.showModal()}
                  >
                    Add Lesson
                  </button>
                </div>
                <div className='justify-start card-actions mx-2'>
                  {course.published ? (
                    <button
                      className='btn btn-accent'
                      onClick={(e) => handleUnpublish(e, course._id)}
                    >
                      Unpublish Course
                    </button>
                  ) : (
                    <button
                      className='btn btn-accent'
                      disabled={course.lessons.length < 5 ? true : false}
                      onClick={(e) => handlePublish(e, course._id)}
                    >
                      Publish Course
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
          <div className=' w-[1000px]  max-w-screen-2xl mt-16'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-bold'>{`${course.lessons.length} Lessons in this Course`}</h1>
              <div
                className='tooltip cursor-pointer'
                data-tip='Edit Lessons Details'
                onClick={() =>
                  router.push(`/instructor/course/edit/lesson/${slug}`)
                }
              >
                <AiFillEdit size={25} className='mx-4' />
              </div>
            </div>
            {course.lessons.map((lesson, index) => (
              <div
                tabIndex={index}
                className='collapse border-b-2 border-base-200 mt-4 rounded-none bg-white'
              >
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>
                  <div>
                    <div className='avatar placeholder'>
                      <div className='w-8 rounded-full bg-base-200 text-black'>
                        <span className='text-[14px]'>{index + 1}</span>
                      </div>
                    </div>
                    <span className='mx-8 text-[16px]'>{lesson.title}</span>
                    {lesson.free_preview ? (
                      <div className='badge badge-info gap-2'>Free Lesson</div>
                    ) : (
                      <div className='badge badge-success gap-2'>
                        Paid Lesson
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className='collapse-content'>
                  <p>{lesson.content}</p>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CourseView
