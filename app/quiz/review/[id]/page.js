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
  const [questions, setQuestions] = useState([])
  const [quizResponse, setQuizResponse] = useState([])
  const [questionFilter, setQuestionFilter] = useState('all')
  const router = useRouter()
  const { id } = params
  const fetchQuizReview = async () => {
    const { data } = await axios.get(`/api/quiz/user-get-quiz-review/${id}`)
    console.log(data)
    setQuiz(data)

    setQuestions(data.questions)
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
        <div className='flex flex-col justify-start items-start w-11/12 py-6'>
          <div className='flex w-full justify-end items-center'>
            <select
              className='select select-bordered w-full max-w-xs'
              onChange={(e) => {
                if (e.target.value === 'all') {
                  setQuestions(quiz.questions)
                  setQuestionFilter('all')
                } else {
                  setQuestions([quiz.questions[e.target.value]])
                  setQuestionFilter(e.target.value)
                }
              }}
            >
              <option selected value='all'>
                All Questions
              </option>
              {quiz &&
                quiz.questions &&
                quiz.questions.map((question, index) => (
                  <option value={index}>Question {index + 1}</option>
                ))}
            </select>
          </div>
          {questions &&
            questions.map((question, index) => (
              <div className='w-full'>
                <h1 className='text-[16px] font-bold text-gray-700 w-full'>
                  Question
                  {questionFilter === 'all'
                    ? index + 1
                    : Number(questionFilter) + 1}
                  .{' '}
                  <span className='text-[14px] font-bold text-gray-400'>
                    {question.multipleCorrectAnswers
                      ? '( Multiple Answers )'
                      : '( Single Answer )'}{' '}
                  </span>
                  <br />{' '}
                  <Quill
                    modules={{
                      toolbar: false,
                    }}
                    theme='snow'
                    className='custom-quill-container-none  mx-5 w-full'
                    value={question.text}
                    readOnly={true}
                  />
                </h1>
                {question.answers.map((answer, i) => (
                  <div
                    className={`flex flex-col justify-start items-start w-full px-6 py-4 border-2 mb-4 rounded-lg ${
                      answer.isCorrect && 'bg-green-200'
                    }`}
                  >
                    <div className='form-control'>
                      <label className='cursor-pointer label'>
                        <input
                          type='checkbox'
                          checked={answer.isCorrect}
                          className='checkbox checkbox-success '
                          disabled={true}
                        />
                        <span className='label-text mx-4'>{answer.text}</span>
                      </label>
                    </div>
                    <h1 className='text-[14px] font-bold text-gray-400 my-2'>
                      Answer Description:
                    </h1>
                    <Quill
                      modules={{
                        toolbar: false,
                      }}
                      theme='snow'
                      className='custom-quill-container-none  mx-5 w-full'
                      value={answer.explanation}
                      readOnly={true}
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default QuizReview
