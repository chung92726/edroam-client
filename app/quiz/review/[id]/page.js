'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { ImCancelCircle } from 'react-icons/im'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/navigation'

const Quill = dynamic(
  () => {
    return import('react-quill')
  },
  { ssr: false }
)

const QuizReview = ({ params }) => {
  const [quiz, setQuiz] = useState([])
  const [quizResponse, setQuizResponse] = useState([])
  const router = useRouter()
  const { id } = params
  const fetchQuizReview = async () => {
    const { data } = await axios.get(`/api/quiz/user-get-quiz-review/${id}`)
    setQuiz(data)
  }

  const fetchHighestScore = async () => {
    try {
      const { data } = await axios.get(
        `/api/quiz/get-highest-quiz-response/${id}`
      )
      console.log(data)
      setQuizResponse(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchQuizReview()
    fetchHighestScore()
  }, [id])

  return (
    <>
      <div className='flex flex-col justify-start items-center w-full'>
        <div className='flex flex-row justify-between items-center w-full py-6 px-8 border-b-2'>
          <h1 className='text-[20px] font-bold text-gray-700'>{quiz.title}</h1>
          <ImCancelCircle
            className='text-[24px] text-red-500 cursor-pointer'
            onClick={() => {
              router.push(`/user/course/${quiz.courseId.slug}`)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default QuizReview
