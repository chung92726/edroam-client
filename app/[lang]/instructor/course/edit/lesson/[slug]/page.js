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
import { AiOutlineCloseCircle, AiOutlinePlaySquare } from 'react-icons/ai'
import UpdateLessonForm from '@/components/form/UpdateLessonForm'
import { calculateVideoDuration, formatDuration } from '@/utils/helpers'
import { FaPhotoVideo } from 'react-icons/fa'

const CourseView = ({ params }) => {
  const [course, setCourse] = useState('')
  const [currentLesson, setCurrentLesson] = useState({
    title: '',
    content: '',
    duration: 1,
    video: {},
  })
  const [signedUrl, setSignedUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [supplementary, setSupplementary] = useState({
    title: '',
    file: {},
    description: '',
    file_type: 'pdf',
    uploading: false,
  })
  const video_input = useRef(null)
  const supplementary_input = useRef()
  const router = useRouter()
  const { slug } = params
  useEffect(() => {
    loadCourse()
  }, [slug])

  // function for adding lessons

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/course/instuctor/${slug}`)
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
    // console.log(allLessons.length)
    if (allLessons.length === 5) {
      const answer = window.confirm(
        'You have to keep at least 5 lessons, otherwise your course will be unpublished'
      )
      if (!answer) return
    }
    const removed = allLessons.splice(index, 1)
    // if (course.mainPreview.video.Key === removed[0]?.video?.Key) {
    //   const answer = window.confirm(
    //     'You have to keep at least 1 free lessons for main preview, otherwise your course will be unpublished'
    //   )
    //   if (!answer) return
    // }
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
      const durationInMinutes = await calculateVideoDuration(file)
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
      setCurrentLesson({
        ...currentLesson,
        video: data,
        duration: durationInMinutes,
      })
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
      loadCourse()
      toast.success('Lesson updated')
    } catch (err) {
      toast.error('Lesson update failed')
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
    setCurrentLesson({
      ...currentLesson,
      supplementary_resources: [
        ...currentLesson.supplementary_resources,
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
        `/api/course/supplementary-update-remove/${course.instructor._id}/${currentLesson._id}`,
        currentLesson.supplementary_resources[index].file
      )
      let allSupplementary = currentLesson.supplementary_resources
      let filtered = allSupplementary.filter((item, i) => i !== index)
      setCurrentLesson({ ...currentLesson, supplementary_resources: filtered })
      toast.success('Supplementary Resource Removed')
    } catch (err) {
      console.log(err)
      toast.error('Supplementary Resource Remove Failed')
    }
  }

  const handleMainPreviewLesson = async (e, lessonToUpdate) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `/api/course/lesson/${slug}/${lessonToUpdate._id}`,
        lessonToUpdate
      )

      let arr = course.lessons
      const index = arr.findIndex((el) => el._id === lessonToUpdate._id)
      arr[index] = lessonToUpdate
      setCourse({ ...course, lessons: arr })
      loadCourse()
      toast.success('Lesson updated')
    } catch (err) {
      toast.error('Lesson update failed')
    }
  }

  useEffect(() => {
    console.log(currentLesson)
  }, [currentLesson])

  return (
    <>
      {course.lessons && (
        <div className='flex flex-col items-center mb-5 w-full mt-10'>
          {/* model for update lesson */}

          <dialog id='my_modal' className='modal modal-bottom sm:modal-middle'>
            <div method='dialog' className=' modal-box '>
              <div className='flex justify-end text-red-600  mb-10'>
                <AiOutlineCloseCircle
                  size={25}
                  className='cursor-pointer fixed'
                  onClick={() => window.my_modal.close()}
                />
              </div>
              <UpdateLessonForm
                course={course}
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
                uploading={uploading}
                setUploading={setUploading}
                progress={progress}
                handleVideo={handleVideo}
                handleUpdateLesson={handleUpdateLesson}
                video_input={video_input}
                signedUrl={signedUrl}
                supplementary={supplementary}
                setSupplementary={setSupplementary}
                handleAddSupplementary={handleAddSupplementary}
                handleSupplementary={handleSupplementary}
                handleSupplementaryRemove={handleSupplementaryRemove}
                supplementary_input={supplementary_input}
              />
              {/* <pre>{JSON.stringify(currentLesson, null, 4)}</pre> */}
            </div>
            <form method='dialog' className='modal-backdrop'></form>
          </dialog>

          {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
          <div className=' w-10/12  max-w-screen-2xl mb-5'>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col md:flex-row w-full items-start md:items-center '>
                <h1 className='text-2xl font-bold'>{`${
                  course && course.lessons && course.lessons.length
                } Lessons`}</h1>
                <p className='text-sm text-gray-500 max-md:pb-3 md:px-5'>
                  (Rearrange lessons by dragging them up or down.)
                </p>
              </div>
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
                  key={index}
                  tabIndex={index}
                  className='border-b-2 border-base-200 mt-2 mb-0 pt-3 rounded-md bg-white'
                  draggable
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {/* <input type='checkbox' /> */}
                  <div className='collapse-title text-xl font-medium max-sm:px-3'>
                    <div className='flex items-center w-full flex-col sm:flex-row'>
                      <div className='flex flex-col items-start sm:flex-row sm:items-center justify-between w-full '>
                        <div className='flex items-center'>
                          <div className='avatar placeholder'>
                            <div className='w-8 rounded-full bg-base-200 text-black'>
                              <span className='text-[14px]'>{index + 1}</span>
                            </div>
                          </div>
                          <div className='mx-2 md:mx-8 text-[14px] md:text-[16px] break-all max-md:overflow-x-hidden '>
                            {lesson && lesson.title}
                          </div>
                          <p className='mx-2 md:mx-8 text-[14px] md:text-[16px] break-all max-md:overflow-x-hidden '>
                            {lesson.video ? (
                              <div className='flex justify-start items-center gap-2'>
                                <span className='text-gray-400'>
                                  {formatDuration(lesson.duration)}
                                </span>
                                <FaPhotoVideo className='mx-2' />
                              </div>
                            ) : (
                              <span className='text-gray-400'>
                                {Math.ceil(lesson.duration)} minutes
                              </span>
                            )}
                          </p>
                        </div>
                        <div className='min-w-[110px]'>
                          {course?.mainPreview?.video?.Key !== undefined &&
                          course?.mainPreview?.video?.Key ===
                            lesson?.video?.Key ? (
                            <div className='badge badge-error gap-2 min-w-[110px] mr-2  max-sm:ml-10 max-sm:mt-2'>
                              Main Preview
                            </div>
                          ) : lesson.free_preview ? (
                            <div className='badge badge-info gap-2  min-w-[101px] mr-2 max-sm:ml-10'>
                              Free Lesson
                            </div>
                          ) : (
                            <div className='badge badge-success gap-2 min-w-[101px] mr-2  max-sm:ml-10'>
                              Paid Lesson
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='flex self-end sm:self-center'>
                        <div
                          className='tooltip cursor-pointer z-30'
                          data-tip='Delete Lesson'
                          onClick={() => {
                            if (course?.mainPreview?.video?.Key !== undefined) {
                              if (
                                course.mainPreview.video.Key !==
                                lesson?.video?.Key
                              ) {
                                handleDelete(index)
                              }
                            } else {
                              handleDelete(index)
                            }
                          }}
                        >
                          <MdDeleteForever
                            size={20}
                            // className='mx-2 text-red-600'
                            className={`mx-2 ${
                              course?.mainPreview?.video?.Key !== undefined
                                ? course?.mainPreview?.video?.Key !==
                                  lesson?.video?.Key
                                  ? 'text-red-600'
                                  : 'text-gray-300'
                                : 'text-red-600'
                            }`}
                          />
                        </div>
                        <div
                          className='tooltip cursor-pointer z-30'
                          data-tip='Edit Lesson'
                          onClick={async () => {
                            setCurrentLesson(lesson)

                            if (lesson?.video && lesson?.video?.Location) {
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
                        <div
                          className='tooltip cursor-pointer z-30'
                          data-tip='Set as Main Preview'
                          onClick={(e) => {
                            if (course?.mainPreview?.video?.Key !== undefined) {
                              if (
                                course.mainPreview.video.Key !==
                                  lesson?.video?.Key &&
                                lesson.free_preview === true
                              ) {
                                // console.log('click')
                                const updatedLesson = {
                                  ...lesson,
                                  mainPreview: true,
                                }
                                handleMainPreviewLesson(e, updatedLesson)
                              }
                            }
                          }}
                        >
                          <AiOutlinePlaySquare
                            size={20}
                            className={`mx-2 ${
                              course?.mainPreview?.video?.Key !== undefined
                                ? course.mainPreview.video.Key !==
                                    lesson?.video?.Key &&
                                  lesson.free_preview === true
                                  ? ''
                                  : 'text-gray-300'
                                : 'text-gray-300'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className='collapse-content'>
                    <p>{lesson && lesson.content}</p>
                  </div> */}
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
