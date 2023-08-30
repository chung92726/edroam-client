'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { ImCancelCircle } from 'react-icons/im'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Quill = dynamic(
  () => {
    return import('react-quill')
  },
  { ssr: false }
)

const QuizPage = ({ params }) => {
  const { slug, id } = params
  const router = useRouter()
  const [quiz, setQuiz] = useState([])
  const [startQuiz, setStartQuiz] = useState(false)
  const [answers, setAnswers] = useState([])
  const fetchQuiz = async () => {
    const { data } = await axios.get(`/api/quiz/user-get-quiz/${id}`)
    setQuiz(data)
  }
  useEffect(() => {
    fetchQuiz()
  }, [slug, id])

  useEffect(() => {
    if (quiz.questions) {
      quiz.questions.forEach((question) => {
        setAnswers((prev) => [
          ...prev,
          {
            questionId: question._id,
            selectedAnswers: [],
          },
        ])
      })
    }
  }, [quiz])

  useEffect(() => {
    console.log(answers)
  }, [answers])

  const onChangeSingleCorrectAnswer = (e, questionId, answerId) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.questionId === questionId
          ? {
              ...answer,
              selectedAnswers: e.target.checked
                ? [answerId]
                : answer.selectedAnswers.filter((id) => id !== answerId),
            }
          : answer
      )
    )
  }

  const onChangeMultipleCorrectAnswer = (e, questionId, answerId) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.questionId === questionId
          ? {
              ...answer,
              selectedAnswers: e.target.checked
                ? [...answer.selectedAnswers, answerId]
                : answer.selectedAnswers.filter((id) => id !== answerId),
            }
          : answer
      )
    )
  }

  const submitQuiz = async () => {
    if (window.confirm('Are you sure you want to submit the quiz?')) {
      if (
        answers.some((answer) => answer.selectedAnswers.length === 0) ||
        answers.length === 0
      ) {
        alert('Please answer all the questions')
        return
      }

      toast.success('Quiz submitted successfully')
      const { data } = await axios.post(`/api/quiz/user-submit-quiz/${id}`, {
        answers,
      })
      console.log(data)
      router.push(`/user/course/${slug}`)
    }
  }
  return (
    <>
      {quiz && (
        <div className='flex flex-col justify-start items-center w-full'>
          <div className='flex flex-row justify-between items-center w-full py-6 px-8 border-b-2'>
            <h1 className='text-[20px] font-bold text-gray-700'>
              {quiz.title}
            </h1>
            <ImCancelCircle
              className='text-[24px] text-red-500 cursor-pointer'
              onClick={() => {
                router.push(`/user/course/${slug}`)
              }}
            />
          </div>
          {startQuiz && answers ? (
            <div className='flex flex-col justify-start items-start mt-6 w-11/12'>
              {quiz.questions.map((question, i) => (
                <div className='flex flex-col justify-start items-start w-full border-b-2 mb-4'>
                  <h1 className='font-bold text-black text-[16px] mb-4'>
                    Question {i + 1}:{' '}
                    <span className='text-gray-400 text-[14px] ml-2'>
                      (
                      {question.multipleCorrectAnswers
                        ? 'Multiple Correct Answers'
                        : 'Single Correct Answer'}
                      )
                    </span>
                  </h1>
                  <Quill
                    modules={{
                      toolbar: false,
                    }}
                    theme='snow'
                    className='custom-quill-container-none w-full mb-4'
                    value={question.text}
                    readOnly={true}
                  />
                  <div className='flex justify-between  w-full flex-wrap gap-4 mb-8 items-stretch '>
                    {question.multipleCorrectAnswers
                      ? question.answers.map((answer, i) => (
                          <div className='flex justify-start items-center  w-full md:w-[49%] gap-3 px-4 py-4 border-2 rounded-lg '>
                            <p className='text-[14px] font-bold text-gray-700 w-[4%]'>
                              {i + 1}.
                            </p>
                            <input
                              type='checkbox'
                              className='checkbox mr-2'
                              checked={
                                answers
                                  .find(
                                    (ans) => ans.questionId === question._id
                                  )
                                  ?.selectedAnswers.includes(answer._id) ||
                                false
                              }
                              onChange={(e) => {
                                onChangeMultipleCorrectAnswer(
                                  e,
                                  question._id,
                                  answer._id
                                )
                              }}
                            />
                            <p className='text-[16px] text-gray-700'>
                              {answer.text}
                            </p>
                          </div>
                        ))
                      : question.answers.map((answer, i) => (
                          <div className='flex  justify-start items-center w-full md:w-[49%] gap-3 px-4 py-4 border-2 rounded-lg '>
                            <p className='text-[14px] font-bold text-gray-700 w-[4%]'>
                              {i + 1}.
                            </p>
                            <input
                              type='checkbox'
                              className='checkbox mr-2 rounded-full'
                              checked={
                                answers
                                  .find(
                                    (ans) => ans.questionId === question._id
                                  )
                                  ?.selectedAnswers.includes(answer._id) ||
                                false
                              }
                              onChange={(e) => {
                                onChangeSingleCorrectAnswer(
                                  e,
                                  question._id,
                                  answer._id
                                )
                              }}
                            />
                            <p className='text-[16px] text-gray-700'>
                              {answer.text}
                            </p>
                          </div>
                        ))}
                  </div>
                </div>
              ))}
              <div className='flex flex-col justify-start items-center w-full'>
                <button
                  className='btn  btn-secondary w-[250px] my-4'
                  onClick={() => {
                    submitQuiz()
                  }}
                >
                  Submit Quiz
                </button>
                <button
                  className='btn w-[250px] mb-4'
                  onClick={() => {
                    setStartQuiz(false)
                  }}
                >
                  Return To Quiz Description
                </button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col justify-start items-center w-full my-4'>
              <Quill
                modules={{
                  toolbar: false,
                }}
                theme='snow'
                className='custom-quill-container-none w-11/12'
                value={quiz.description}
                readOnly={true}
              />

              <button
                className='btn  btn-secondary w-[250px] my-4'
                onClick={() => {
                  setStartQuiz(true)
                }}
              >
                Start Quiz
              </button>
              <button
                className='btn w-[250px] mb-4'
                onClick={() => {
                  router.push(`/user/course/${slug}`)
                }}
              >
                Return To Course
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default QuizPage
