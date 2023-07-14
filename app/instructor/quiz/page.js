'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Table } from 'antd'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { MdOutlineUnpublished } from 'react-icons/md'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'
const Quill = dynamic(
  () => {
    return import('react-quill')
  },
  { ssr: false }
)

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const instructorQuiz = () => {
  const [courses, setCourses] = useState([])
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [quizzes, setQuizzes] = useState([])

  const [value, setValue] = useState({
    title: '',
    description: '',
    passingRate: 50,

    lesson: {},
    coursePassing: false,
  })

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    const { data } = await axios.get('/api/instructor-courses')
    console.log(data)
    setCourses(data)
  }

  const loadQuiz = async () => {
    const { data } = await axios.get(`/api/quiz/get-quizzes?search=${search}`)
    console.log(data)
    setQuizzes(data)
  }

  const publishQuiz = async (id) => {
    const { data } = await axios.put(`/api/quiz/publish-quiz/${id}`)
    toast.success('Quiz Published')
    loadQuiz()
  }

  const unPublishQuiz = async (id) => {
    const { data } = await axios.put(`/api/quiz/unpublish-quiz/${id}`)
    toast.success('Quiz Unpublished')
    loadQuiz()
  }
  const deleteQuiz = async (id) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(`/api/quiz/delete-quiz/${id}`)
      toast.success('Quiz Deleted')
      loadQuiz()
    }
  }
  useEffect(() => {
    loadQuiz()
  }, [search])

  const handleQuizCreate = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/quiz/create-quiz`, value)
      console.log(data)
      setLoading(false)
      toast.success('Quiz Created')
      setValue({
        title: '',
        description: '',
        passingRate: 50,

        lesson: {},
        coursePassing: false,
      })
      window.location.reload()
    } catch (err) {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'Quiz Title',
      width: '30%',

      render: (e) => {
        return (
          <Link
            href={`/instructor/quiz/${e._id}`}
            className='link link-primary text-[12px] font-bold'
          >
            {e.title}
          </Link>
        )
      },
      sorter: (a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        }
        return 0
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Course Title',

      dataIndex: 'courseTitle',
      render: (e) => {
        return <p className='text-[12px] font-bold'>{e}</p>
      },
      sorter: (a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        }
        return 0
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Lesson Title',

      dataIndex: 'lessonTitle',
      render: (e) => {
        return <p className='text-[12px] font-bold'>{e}</p>
      },
      sorter: (a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        }
        return 0
      },
      sortDirections: ['ascend', 'descend'],
    },

    {
      title: '',
      key: 'operation',
      //   fixed: 'right',
      width: 80,

      render: (e) => (
        <div className='flex md:flex-row flex-col justify-start items-center gap-2'>
          {/* <div className='tooltip tooltip-left' data-tip='Edit'>
            <AiFillEdit size={20} className='cursor-pointer' />
          </div> */}
          {e.published ? (
            <div className='tooltip tooltip-left' data-tip='Unpublish Quiz'>
              <MdOutlineUnpublished
                size={20}
                className='text-red-500 cursor-pointer'
                onClick={() => {
                  unPublishQuiz(e._id)
                }}
              />
            </div>
          ) : (
            <div className='tooltip tooltip-left' data-tip='publish Quiz'>
              <MdOutlinePublishedWithChanges
                size={20}
                className={`${
                  e.questions.length > 0 ? 'text-green-500' : 'text-gray-500'
                } cursor-pointer`}
                onClick={
                  e.questions.length > 0
                    ? () => {
                        publishQuiz(e._id)
                      }
                    : null
                }
              />
            </div>
          )}
          <div className='tooltip tooltip-left' data-tip='Delete Quiz'>
            <MdOutlineDeleteForever
              size={20}
              className='text-red-500 cursor-pointer'
              onClick={() => {
                deleteQuiz(e._id)
              }}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='w-full flex flex-col justify-start items-center  bg-blue-50 pb-6'>
      <div className='text-center  bg-gray-700 text-white w-full  py-[50px] flex flex-col justify-center text-[28px] items-start font-bold '>
        <h1 className='text-4xl pl-10'>My Quiz</h1>
      </div>
      <div className='w-[100%] flex flex-col justify-start items-start mt-4'>
        <h1 className='font-bold text-[24px] pl-10'>Create Quiz</h1>
      </div>
      <div className='w-[90%] flex flex-col md:flex-row justify-center items-start mt-2'>
        <div className='form-control w-full max-w-xs mx-0 md:mx-4'>
          <label className='label'>
            <span className='label-text text-gray-500'>Course</span>
          </label>
          <select
            className='select select-bordered select-sm'
            onChange={(e) => {
              console.log(e)
              setValue({ ...value, course: e.target.value })
              setLessons(courses[e.target.selectedIndex - 1].lessons)
            }}
          >
            <option disabled selected>
              Choose Which Course to Add Quiz
            </option>
            {courses.map((course, i) => (
              <option key={i} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-control w-full max-w-xs mx-0 md:mx-4'>
          <label className='label'>
            <span className='label-text text-gray-500'>Lesson</span>
          </label>
          <select
            className='select select-bordered select-sm'
            disabled={!value.course}
            onChange={(e) =>
              setValue({
                ...value,
                lesson: e.target.value,
              })
            }
          >
            <option disabled selected>
              Choose Which Lesson to Add Quiz
            </option>
            {lessons &&
              lessons.map((lesson) => (
                <option key={lesson._id} value={lesson._id} name={lesson.title}>
                  {lesson.title}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='w-[90%] flex flex-col md:flex-row justify-center items-start mt-2'>
        <div className='form-control w-full max-w-xs mx-0 md:mx-4'>
          <label className='label'>
            <span className='label-text text-gray-500'>Quiz Title</span>
          </label>
          <input
            type='text'
            placeholder='Quiz Title'
            onChange={(e) => setValue({ ...value, title: e.target.value })}
            value={value.title}
            className='input input-bordered w-full max-w-xs input-sm'
          />
        </div>
        <div className='form-control w-full max-w-xs mx-0 md:mx-4'>
          <label className='label'>
            <span className='label-text text-gray-500'>Passing Rate</span>
          </label>
          <select
            className='select select-bordered select-sm'
            onChange={(e) => {
              setValue({ ...value, passingRate: e.target.value })
            }}
          >
            <option disabled selected>
              Choose Quiz Passing Rate
            </option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
            <option value={30}>30%</option>
            <option value={40}>40%</option>
            <option value={50}>50%</option>
            <option value={60}>60%</option>
            <option value={70}>70%</option>
            <option value={80}>80%</option>
            <option value={90}>90%</option>
            <option value={100}>100%</option>
          </select>
        </div>
      </div>
      <div className='form-control w-[90%] max-w-[670px] flex flex-col justify-start items-start mt-2'>
        <label className='cursor-pointer label'>
          <span className='label-text '>
            Course Passing Quiz
            <div
              className='tooltip'
              data-tip='Checked if this quiz is essestial for student to pass the course'
            >
              <AiOutlineQuestionCircle
                size={16}
                className='inline-block mx-2 text-gray-500'
              />
            </div>
          </span>

          <input
            type='checkbox'
            className='toggle toggle-secondary mx-4'
            checked={value.coursePassing}
            onChange={() => {
              setValue({ ...value, coursePassing: !value.coursePassing })
            }}
          />
        </label>
      </div>
      <div className='w-[88%] max-w-[660px] mt-4 flex flex-col justify-start items-center'>
        <div className='flex justify-start items-center w-full'>
          <h1 className='text-[14px] mb-3 text-gray-500'>Quiz Description</h1>
        </div>
        <Quill
          modules={modules}
          theme='snow'
          className='w-full  border-2 rounded-lg border-opacity-20'
          value={value.description}
          onChange={(e) => {
            setValue({ ...value, description: e })
          }}
        />
      </div>
      <div className='w-[90%] max-w-[660px] mt-4 flex flex-col justify-start items-end'>
        <button
          className='btn btn-active btn-secondary'
          onClick={handleQuizCreate}
        >
          Create Quiz
        </button>
      </div>
      <div className='w-full border-t-4 pt-8 mt-8'>
        <div className='w-full flex flex-col justify-start items-start mt-4'>
          <h1 className='font-bold text-[24px] pl-10'>Your Quizzes</h1>
        </div>
        <div className=' flex flex-col justify-start items-center '>
          <input
            type='text'
            placeholder='Search Quiz'
            className='input    w-[90%] max-w-sm mb-2 '
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table
            columns={columns}
            dataSource={quizzes}
            className='mt-8'
            pagination={{
              pageSize: 20,
            }}
            scroll={{
              y: 480,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default instructorQuiz
