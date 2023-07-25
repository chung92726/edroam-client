'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Quiz = ({ course, currentLesson, slug }) => {
  const [quizzes, setQuizzes] = useState([])
  const [highestScore, setHighestScores] = useState([])
  const router = useRouter()
  const fetchQuizzes = async () => {
    try {
      const { data } = await axios.get(
        `/api/quiz/get-quiz-by-courseId-lessonId/${course._id}/${course.lessons[currentLesson]._id}`
      )
      console.log(data)
      setQuizzes(data)
    } catch (err) {
      console.log(err)
    }
  }
  const fetchHighestScore = async (quizId) => {
    try {
      const { data } = await axios.get(
        `/api/quiz/get-highest-quiz-response/${quizId}`
      )
      console.log(data)
      setHighestScores((prev) => ({ ...prev, [quizId]: data[0].score }))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    quizzes.forEach((quiz) => {
      fetchHighestScore(quiz._id)
    })
  }, [quizzes])

  useEffect(() => {
    console.log(highestScore)
  }, [highestScore])

  useEffect(() => {
    fetchQuizzes()
  }, [currentLesson, course, slug])
  return (
    <>
      {quizzes.length > 0 ? (
        <div className='flex items-stretch flex-wrap gap-2 justify-start  py-4 w-full'>
          {quizzes.map((quiz, i) => (
            <div
              key={i}
              className='flex flex-col items-start justify-start px-4 py-4 bg-white w-[300px] rounded-lg shadow-md'
            >
              <h1 className='text-[16px] font-bold border-b-2 pb-2 w-full'>
                {quiz.title}
              </h1>
              <div className='flex flex-row items-end justify-between w-full'>
                <div className='flex flex-col justify-start items-start '>
                  <p className='text-[14px] font-bold text-red-300'>
                    {quiz.coursePassingQuiz ? 'Course Passing Quiz' : ''}
                  </p>
                  <p className='text-[14px] font-bold my-2 text-gray-400'>
                    {quiz.questions.length} Questions
                  </p>
                  <p className='text-[14px] font-bold mb-2 text-gray-400'>
                    Passing Rate: {quiz.passingRate}%
                  </p>
                  {highestScore[quiz._id] ? (
                    <p className='text-[14px] font-bold mb-2 text-gray-400'>
                      Your Score:{' '}
                      {Number(highestScore[quiz._id]) >
                      Number(quiz.passingRate) ? (
                        <span className='text-green-500'>
                          {highestScore[quiz._id]}%
                        </span>
                      ) : (
                        <span className='text-red-500'>
                          {highestScore[quiz._id]}%
                        </span>
                      )}
                    </p>
                  ) : null}
                  {highestScore[quiz._id] ? (
                    Number(highestScore[quiz._id]) >
                    Number(quiz.passingRate) ? (
                      <p className='text-[14px] font-bold mb-2 text-green-400'>
                        Passed ✅
                      </p>
                    ) : (
                      <p className='text-[14px] font-bold mb-2 text-red-400'>
                        Failed ❌
                      </p>
                    )
                  ) : (
                    <p>Not Completed</p>
                  )}
                </div>
                <div className='flex flex-col justify-start items-start '>
                  <button className='btn btn-secondary mt-4 mb-2 w-[100px] btn-sm '>
                    <p
                      className='text-[12px]'
                      onClick={() => {
                        router.push(`/quiz/review/${quiz._id}`)
                      }}
                    >
                      Review
                    </p>
                  </button>
                  <button className='btn btn-secondary mb-2 w-[100px] btn-sm '>
                    <Link
                      href={`/quiz/${slug}/${quiz._id}`}
                      className='text-[12px]'
                    >
                      Go Quiz
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className='text-[14px] py-4 font-bold'>No Quiz in This Lesson</h1>
      )}
    </>
  )
}

export default Quiz
