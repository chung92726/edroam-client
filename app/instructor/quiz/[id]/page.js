'use client'

import React, { useState, useEffect } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import Link from 'next/link'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import axios from 'axios'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import { IoMdArrowBack } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { MdOutlineUnpublished } from 'react-icons/md'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'
import { IoMdAddCircleOutline } from 'react-icons/io'
import QuizQuestion from '@/components/quiz/QuizQuestion'

import { MdOutlineDeleteForever } from 'react-icons/md'

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

const QuizPage = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])

  const [questionFilter, setQuestionFilter] = useState('all')

  const [published, setPublished] = useState(false)
  const [value, setValue] = useState({
    title: '',
    description: '',
    passingRate: 50,

    lesson: {},
    coursePassing: false,
  })
  const loadQuiz = async () => {
    const { data } = await axios.get(`/api/quiz/get-quiz/${id}`)
    setValue({
      title: data.title,
      description: data.description,
      passingRate: data.passingRate,
      course: data.courseId,
      lesson: data.lessonId,
      coursePassing: data.coursePassingQuiz,
    })
    setQuestions(data.questions)
    setPublished(data.published)
  }
  useEffect(() => {
    loadCourses()
  }, [])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        answers: [],
        multipleCorrectAnswers: false,
      },
    ])
  }

  const addAnswer = (index) => {
    const newQuestions = [...questions]
    newQuestions[index].answers.push({
      text: '',
      isCorrect: false,
      explanation: '',
    })
    setQuestions(newQuestions)
  }

  useEffect(() => {
    console.log(questions)
  }, [questions])

  const updateQuestions = async () => {
    try {
      const { data } = await axios.put(`/api/quiz/update-question/${id}`, {
        questions,
      })
      loadQuiz()
      toast.success('Questions updated')
    } catch (error) {
      console.log(error)
      toast.error('Error updating questions')
    }
  }

  const deleteQuestion = (index) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  const loadCourses = async () => {
    const { data } = await axios.get('/api/instructor-courses')
    console.log(data)
    setCourses(data)
  }

  const publishQuiz = async (id) => {
    const { data } = await axios.put(`/api/quiz/publish-quiz/${id}`)
    toast.success('Quiz Published')
    loadQuiz()
  }

  const deleteQuiz = async (id) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(`/api/quiz/delete-quiz/${id}`)
      toast.success('Quiz Deleted')
      loadQuiz()
    }
  }

  const unPublishQuiz = async (id) => {
    const { data } = await axios.put(`/api/quiz/unpublish-quiz/${id}`)
    toast.success('Quiz Unpublished')
    loadQuiz()
  }

  const loadLesson = async (courseId) => {
    const { data } = await axios.get(`/api/course/lessons/${courseId}`)
    console.log(data.lessons)
    setLessons(data.lessons)
  }

  const updateQuiz = async () => {
    try {
      setLoading(true)
      const { data } = await axios.put(`/api/quiz/update-quiz/${id}`, {
        ...value,
      })
      console.log(data)
      setLoading(false)
      toast.success('Quiz Updated')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (value.course) {
      loadLesson(value.course)
    }
  }, [value.course])

  useEffect(() => {
    loadQuiz()
  }, [])

  return (
    <>
      {value.course && value.lesson && (
        <div className='w-full pb-4 flex flex-col justify-center items-center'>
          <div className='flex w-11/12 justify-start items-center pt-6'>
            <div
              className='tooltip  tooltip-right'
              data-tip='Back to Your Quizzes'
            >
              <IoMdArrowBack
                size={25}
                className='cursor-pointer'
                onClick={() => {
                  router.push('/instructor/quiz')
                }}
              />
            </div>
          </div>
          <div className='w-full border-b-2 flex justify-center items-center'>
            <div className='flex justify-between w-10/12 items-center py-4 '>
              <h1 className='font-bold text-[20px] mb-2 text-gray-800 flex items-center gap-2'>
                Edit Quiz
              </h1>
              <div className='flex items-center gap-2'>
                {published ? (
                  <div
                    className='tooltip tooltip-left'
                    data-tip='Unpublish Quiz'
                  >
                    <MdOutlineUnpublished
                      size={24}
                      className='text-red-500 cursor-pointer'
                      onClick={() => {
                        unPublishQuiz(id)
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className='tooltip tooltip-left'
                    data-tip={
                      questions.length > 0
                        ? 'Publish Quiz'
                        : `Not Ready To Publish At Least 1 Quesion Needed`
                    }
                  >
                    <MdOutlinePublishedWithChanges
                      size={24}
                      className={`${
                        questions.length > 0
                          ? 'text-green-500'
                          : 'text-gray-500'
                      } cursor-pointer`}
                      onClick={
                        questions.length > 0
                          ? () => {
                              publishQuiz(id)
                            }
                          : null
                      }
                    />
                  </div>
                )}
                <div className='tooltip ' data-tip='Delete Quiz'>
                  <Link href='/instructor/quiz'>
                    <MdOutlineDeleteForever
                      size={24}
                      className='text-red-500 cursor-pointer'
                      onClick={() => {
                        deleteQuiz(id)
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col justify-start items-center pb-8 border-b-2'>
            <div className='w-11/12 flex flex-col md:flex-row justify-center items-start mt-2'>
              <div className='form-control w-full max-w-md mx-0 md:mx-4'>
                <label className='label'>
                  <span className='label-text text-gray-500'>Course</span>
                </label>
                <select
                  className='select select-bordered select-sm'
                  onChange={(e) => {
                    console.log(e)
                    setValue({ ...value, course: e.target.value })
                    // setLessons(courses[e.target.selectedIndex - 1].lessons)
                  }}
                >
                  <option disabled selected>
                    Choose Which Course to Add Quiz
                  </option>
                  {courses.map((course, i) => (
                    <option
                      key={i}
                      value={course._id}
                      selected={value.course === course._id}
                    >
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-control w-full max-w-md mx-0 md:mx-4'>
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
                      <option
                        key={lesson._id}
                        value={lesson._id}
                        name={lesson.title}
                        selected={value.lesson === lesson._id}
                      >
                        {lesson.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className='w-11/12  flex flex-col md:flex-row justify-center items-start mt-2'>
              <div className='form-control w-full max-w-md mx-0 md:mx-4'>
                <label className='label'>
                  <span className='label-text text-gray-500'>Quiz Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Quiz Title'
                  onChange={(e) =>
                    setValue({ ...value, title: e.target.value })
                  }
                  value={value.title}
                  className='input input-bordered input-sm'
                />
              </div>
              <div className='form-control w-full max-w-md mx-0 md:mx-4'>
                <label className='label'>
                  <span className='label-text text-gray-500'>Passing Rate</span>
                </label>
                <select
                  className='select select-bordered select-sm'
                  onChange={(e) => {
                    setValue({ ...value, passingRate: e.target.value })
                  }}
                >
                  <option disabled>Choose Quiz Passing Rate</option>
                  <option value={10} selected={value.passingRate === 10}>
                    10%
                  </option>
                  <option value={20} selected={value.passingRate === 20}>
                    20%
                  </option>
                  <option value={30} selected={value.passingRate === 30}>
                    30%
                  </option>
                  <option value={40} selected={value.passingRate === 40}>
                    40%
                  </option>
                  <option value={50} selected={value.passingRate === 50}>
                    50%
                  </option>
                  <option value={60} selected={value.passingRate === 60}>
                    60%
                  </option>
                  <option value={70} selected={value.passingRate === 70}>
                    70%
                  </option>
                  <option value={80} selected={value.passingRate === 80}>
                    80%
                  </option>
                  <option value={90} selected={value.passingRate === 90}>
                    90%
                  </option>
                  <option value={100} selected={value.passingRate === 100}>
                    100%
                  </option>
                </select>
              </div>
            </div>
            <div className='form-control w-11/12 max-w-[925px] flex flex-col justify-start items-start mt-2'>
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
            <div className='w-11/12 max-w-[915px] mt-4 flex flex-col justify-start items-center'>
              <div className='flex justify-start items-center w-full'>
                <h1 className='text-[14px] mb-3 text-gray-500'>
                  Quiz Description
                </h1>
              </div>
              <Quill
                modules={modules}
                theme='snow'
                className='w-full custom-quill-container  border-2 rounded-lg border-opacity-20'
                value={value.description}
                onChange={(e) => {
                  setValue({ ...value, description: e })
                }}
              />
            </div>
            <div className='w-11/12 max-w-[925px] mt-4 flex flex-col justify-start items-end'>
              <button className='btn  btn-secondary' onClick={updateQuiz}>
                Save Changes
              </button>
            </div>
          </div>
          {/* add question section */}
          <div className='w-11/12 max-w-[925px] mt-4 flex flex-col justify-start items-center'>
            <div className='flex flex-col md:flex-row justify-between items-center w-full mb-2'>
              <h1 className='font-bold text-gray-500 mb-2 md:mb-0'>
                Questions Settings
              </h1>
              <select
                className='select select-bordered select-sm w-full max-w-xs'
                onChange={(e) => {
                  setQuestionFilter(e.target.value)
                }}
              >
                <option selected value='all'>
                  All Question
                </option>
                {questions.length > 0
                  ? questions.map((question, index) => (
                      <option key={index} value={index}>
                        Question {index + 1}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {questions.length > 0 ? (
              <QuizQuestion
                questions={
                  questionFilter === 'all'
                    ? questions
                    : [questions[questionFilter]]
                }
                setQuestions={setQuestions}
                addAnswer={addAnswer}
                questionFilter={questionFilter}
                deleteQuestion={deleteQuestion}
              />
            ) : (
              <h1 className='text-gray-500'>No Questions in This Quiz</h1>
            )}
            <button
              className='btn mt-4 border-1 border-gray-200 text-gray-500 w-full rounded-3xl'
              onClick={() => {
                addQuestion()
              }}
            >
              Add Question
              <IoMdAddCircleOutline
                size={24}
                className='inline-block text-gray-500'
              />
            </button>
            <button
              className='btn btn-secondary w-full my-4 rounded-3xl'
              onClick={() => {
                updateQuestions()
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default QuizPage
