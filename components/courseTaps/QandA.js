'use client'
import { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import dynamic from 'next/dynamic'
import axios from 'axios'
// import Quill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import { MdComment } from 'react-icons/md'
import DetailsPage from './DetailsPage'

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
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const QandA = ({ course, currentLesson, qa_tap }) => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [questions, setQuestions] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [detailsPage, setDetailsPage] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [comment, setComment] = useState('')
  const [displayAllLesson, setDisplayAllLesson] = useState(true)

  const loadCourseQuestions = async () => {
    try {
      if (displayAllLesson) {
        const { data } = await axios.get(
          `/api/question?courseId=${course._id}&search=${search}`
        )
        setQuestions(data.questions)
        setQuestionCount(data.totalCount)
      } else {
        const { data } = await axios.get(
          `/api/question?courseId=${course._id}&lessonIndex=${currentLesson}&search=${search}`
        )
        setQuestions(data.questions)
        setQuestionCount(data.totalCount)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const clickToDetailsPage = (question) => {
    setCurrentQuestion(question)
    setDetailsPage(true)
  }

  const backToQandA = () => {
    setDetailsPage(false)
    setCurrentQuestion(null)
  }

  useEffect(() => {
    loadCourseQuestions()
  }, [search, displayAllLesson])

  const publishQuestion = async () => {
    if (!title || !details) {
      return toast.error('Please fill all fields')
    }
    setLoading(true)
    try {
      const { data } = await axios.post(
        `/api/question/${course._id}/${currentLesson}`,
        {
          title,
          details,
          instructorId: course.instructor._id,
        }
      )
      toast.success('Question published')
      console.log(data)
      setLoading(false)
      loadCourseQuestions()
      setTitle('')
      setDetails('')
    } catch (err) {
      console.log(err)
      toast.error('Question publishing failed')
    }
  }

  const publishComment = async (questionId) => {
    try {
      if (!comment) {
        return toast.error('Please fill all fields')
      }
      const { data } = await axios.post(`/api/question/${questionId}`, {
        comment,
      })
      console.log(data)
      toast.success('Answer published')
      setCurrentQuestion(data)
      setComment('')
    } catch (err) {
      console.log(err)
      toast.error('Failed to publish answer')
    }
  }

  return (
    <div className='w-full'>
      {detailsPage ? (
        <div className='w-full'>
          <DetailsPage
            backToQandA={backToQandA}
            currentQuestion={currentQuestion}
            comment={comment}
            setComment={setComment}
            publishComment={publishComment}
            course={course}
            detailsPage={qa_tap.detailsPage}
          />
        </div>
      ) : (
        <div className='w-full flex flex-col justify-start items-start max-w-2x1 '>
          <div className='flex flex-col md:flex-row w-full  items-center justify-center md:items-end '>
            <div className='flex flex-row justify-center items-center w-full max-w-md mx-2 mb-2 bg-white border-2 rounded-lg'>
              <input
                type='text'
                placeholder={qa_tap.placeholder.search_all}
                className='input  input-ghost  w-full max-w-md '
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <div className='px-3 py-3.5 bg-black rounded-lg cursor-pointer'>
                <BsSearch size={20} className='text-white' />
              </div> */}
            </div>

            <select
              className='select select-secondary w-full max-w-md md:max-w-[12rem] mb-2'
              onChange={(e) => {
                setDisplayAllLesson(e.target.value === 'true' ? true : false)
              }}
            >
              <option value={true}>{qa_tap.all_lesson}</option>
              <option value={false}>{qa_tap.current_lesson}</option>
            </select>
          </div>
          <h1 className='font-bold text-[20px] my-4'>
            {qa_tap.all_qs}
          </h1>
          {questions &&
            questions.map((question) => (
              <div className='w-full  flex  justify-center items-center mb-4 hover:bg-gray-200 py-2 px-2'>
                <img
                  src={question.askedBy.picture}
                  className='w-8 h-8 mr-2 rounded-full'
                />
                <div className='flex flex-col justify-start items-start w-11/12'>
                  <h1 className='font-bold text-[16px]'>{question.title}</h1>
                  <div className='flex flex-row justify-start items-center'>
                    <p className='text-[12px] text-blue-500 mr-1'>
                      {qa_tap.by}{question.askedBy.name}
                    </p>
                    <p className='text-[12px] text-blue-500 mr-1'>
                      {qa_tap.lesson}{question.lessonIndex + 1}
                    </p>
                    <p className='text-[12px] text-gray-500 mr-1'>
                      {qa_tap.on}{new Date(question.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className='flex gap-1 flex-row justify-start items-center'>
                  <p className='font-bold text-[14px]'>
                    {question.answers.length}
                  </p>
                  <div className='tooltip' data-tip='View All Reply'>
                    <MdComment
                      size={20}
                      className='text-gray-500 cursor-pointer'
                      onClick={() => clickToDetailsPage(question)}
                    />
                  </div>
                </div>
              </div>
            ))}

          {/* // ask question area */}
          <h1 className='font-bold text-[20px] my-4'>{qa_tap.ask_new_qs}</h1>
          <p className='font-bold text-[14px] my-2'>{qa_tap.qstitle}</p>
          <input
            type='text'
            className='input input-secondary w-full h-[38px] mr-2'
            placeholder={qa_tap.placeholder.enter_qstitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className='font-bold text-[14px] my-2'>{qa_tap.details}</p>
          <div className='w-full mb-4'>
            <Quill
              modules={modules}
              theme='snow'
              className='custom-quill-container w-full border-2 rounded-lg'
              value={details}
              onChange={setDetails}
            />
          </div>
          <button
            className='btn w-full btn-secondary mb-4'
            disabled={loading}
            onClick={publishQuestion}
          >
            {loading ? (
              <div>
                <span className='loading loading-spinner'></span>
                {qa_tap.loading}
              </div>
            ) : qa_tap.publish}
          </button>
        </div>
      )}
    </div>
  )
}

export default QandA
