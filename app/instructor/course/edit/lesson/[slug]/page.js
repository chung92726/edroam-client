'use client'

import { useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
// import ReactMarkDown from 'react-markdown'
// import AddLessonForm from '@/components/form/AddLessonForm'
// import { AiOutlineCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { IoArrowBackSharp } from 'react-icons/io5'
import { AiFillEdit } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import UpdateLessonForm from '@/components/form/UpdateLessonForm'

const CourseView = ({ params }) => {
  const [course, setCourse] = useState('')
  const [currentLesson, setCurrentLesson] = useState({})
  const [signedUrl, setSignedUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const video_input = useRef(null)
  const router = useRouter()
  const { slug } = params
  useEffect(() => {
    loadCourse()
  }, [slug])

  // function for adding lessons

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/course/${slug}`)
      setCourse(data)
      console.log(data.lessons.length)
    } catch (err) {
      console.log(err)
    }
  }
  const handleDrag = (e, index) => {
    e.dataTransfer.setData('itemIndex', index)
  }

  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData('itemIndex')
    const targetItemIndex = index

    let allLessons = course.lessons
    let movingItem = allLessons[movingItemIndex]
    allLessons.splice(movingItemIndex, 1) // remove one item from index
    allLessons.splice(targetItemIndex, 0, movingItem) // insert moving item to target index
    setCourse({ ...course, lessons: [...allLessons] })

    // save the new lessons order in db
    try {
      const { data } = await axios.put(`/api/course/${slug}`, { ...course })
      toast.success('Lessons reordered')
    } catch (err) {
      toast.error('Lessons reorder failed')
    }
  }

  const handleDelete = async (index) => {
    const answer = window.confirm('Are you sure you want to delete?')
    if (!answer) return
    let allLessons = course.lessons
    const removed = allLessons.splice(index, 1)
    setCourse({ ...course, lessons: [...allLessons] })
    // send request to server to remove lesson from db
    try {
      const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`)
      toast.success('Lessons deleted')
    } catch (err) {
      toast.error('Lesson delete failed')
    }
  }

  const handleVideo = async (e) => {
    setUploading(true)
    try {
      // remove previous video
      if (currentLesson.video && currentLesson.video.Location) {
        const res = await axios.post(
          `/api/course/video-remove/${course.instructor._id}`,
          currentLesson.video
        )
      }
      // upload new video
      const file = e.target.files[0]
      const videoData = new FormData()
      videoData.append('video', file)
      videoData.append('courseId', course._id)
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
      setCurrentLesson({ ...currentLesson, video: data })
      setUploading(false)
      setProgress(0)
      toast.success('Video upload successful')
    } catch (err) {
      setUploading(false)
      toast.error('Video upload failed')
    }
  }

  const handleUpdateLesson = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `/api/course/lesson/${slug}/${currentLesson._id}`,
        currentLesson
      )
      window.my_modal.close()

      let arr = course.lessons
      const index = arr.findIndex((el) => el._id === currentLesson._id)
      arr[index] = currentLesson
      setCourse({ ...course, lessons: arr })
      toast.success('Lesson updated')
    } catch (err) {
      toast.error('Lesson update failed')
    }
  }

  return (
    <>
      {course.lessons && (
        <div className='flex flex-col items-center mb-5 w-full mt-10'>
          {/* model for update lesson */}

          <dialog id='my_modal' className='modal modal-bottom sm:modal-middle'>
            <form method='dialog' className=' modal-box '>
              <div className='flex justify-end text-red-600  mb-10'>
                <AiOutlineCloseCircle
                  size={25}
                  className='cursor-pointer fixed'
                  onClick={() => window.my_modal.close()}
                />
              </div>
              <UpdateLessonForm
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
                uploading={uploading}
                setUploading={setUploading}
                progress={progress}
                handleVideo={handleVideo}
                handleUpdateLesson={handleUpdateLesson}
                video_input={video_input}
                signedUrl={signedUrl}
              />
              {/* <pre>{JSON.stringify(currentLesson, null, 4)}</pre> */}
            </form>
            <form method='dialog' className='modal-backdrop'></form>
          </dialog>

          {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
          <div className=' w-10/12  max-w-screen-2xl mb-5'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-bold'>{`${
                course && course.lessons && course.lessons.length
              } Lessons`}</h1>
              <div
                className='tooltip cursor-pointer'
                data-tip='Back to course'
                onClick={() => router.push(`/instructor/course/view/${slug}`)}
              >
                <IoArrowBackSharp size={25} className='mx-4' />
              </div>
            </div>
            <div onDragOver={(e) => e.preventDefault()}>
              {course.lessons.map((lesson, index) => (
                <div
                  tabIndex={index}
                  className='collapse border-b-2 border-base-200 mt-2 mb-0 pt-3 rounded-none bg-white'
                  draggable
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <input type='checkbox' />
                  <div className='collapse-title text-xl font-medium'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='avatar placeholder'>
                          <div className='w-8 rounded-full bg-base-200 text-black'>
                            <span className='text-[14px]'>{index + 1}</span>
                          </div>
                        </div>
                        <span className='mx-8 text-[16px] font-bold'>
                          {lesson && lesson.title}
                        </span>

                        {lesson.free_preview ? (
                          <div className='badge badge-info gap-2'>
                            Free Lesson
                          </div>
                        ) : (
                          <div className='badge badge-success gap-2'>
                            Paid Lesson
                          </div>
                        )}
                      </div>
                      <div className='flex items-center'>
                        <div
                          className='tooltip cursor-pointer z-30'
                          data-tip='Delete Lesson'
                          onClick={() => handleDelete(index)}
                        >
                          <MdDeleteForever
                            size={20}
                            className='mx-2 text-red-600'
                          />
                        </div>
                        <div
                          className='tooltip cursor-pointer z-30'
                          data-tip='Edit Lesson'
                          onClick={async () => {
                            setCurrentLesson(lesson)

                            if (lesson.video && lesson.video.Location) {
                              const { data } = await axios.post(
                                `/api/course/get-signedurl`,
                                {
                                  filename: lesson.video.Key,
                                }
                              )
                              setSignedUrl(data)
                            }

                            window.my_modal.showModal()
                          }}
                        >
                          <AiFillEdit size={20} className='mx-2' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='collapse-content'>
                    <p>{lesson && lesson.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseView
