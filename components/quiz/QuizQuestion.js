import React from 'react'
import dynamic from 'next/dynamic'

import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { MdCancelPresentation } from 'react-icons/md'

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

const QuizQuestion = ({
  questions,
  setQuestions,
  addAnswer,
  singleAnswer,
  setSingleAnswer,
  questionFilter,
  deleteQuestion,
}) => {
  return (
    <>
      {questions.map((question, index) => (
        <div className='flex flex-col w-full justify-start items-center px-2 py-4 border-2 rounded-lg my-2'>
          {questionFilter === 'all' && (
            <div className='w-11/12 max-w-[935px] flex justify-between items-center'>
              <h1 className='text-[18px] font-bold'>Question {index + 1}</h1>
              <div className='tooltip tooltip-left' data-tip='Delete Question'>
                <MdCancelPresentation
                  size={24}
                  className='cursor-pointer text-red-500'
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this question?'
                      )
                    ) {
                      deleteQuestion(index)
                    }
                  }}
                />
              </div>
            </div>
          )}
          <div className='w-11/12 max-w-[935px] mt-4 flex flex-col justify-start items-center'>
            <Quill
              modules={modules}
              theme='snow'
              className='w-full custom-quill-container-quiz   border-2 rounded-lg border-opacity-20'
              value={question.text}
              onChange={(e) => {
                setQuestions((prev) => {
                  const newQuestions = [...prev]
                  newQuestions[index].text = e
                  return newQuestions
                })
              }}
            />
          </div>
          <div className='w-11/12 max-w-[935px] flex justify-end items-center mt-2'>
            <select
              className='select select-bordered select-sm w-full max-w-xs'
              onChange={() => {
                setQuestions((prev) => {
                  const newQuestions = [...prev]
                  newQuestions[index].multipleCorrectAnswers =
                    !newQuestions[index].multipleCorrectAnswers
                  return newQuestions
                })
              }}
            >
              <option selected={!question.multipleCorrectAnswers}>
                ⭕ Single Answer
              </option>
              <option selected={question.multipleCorrectAnswers}>
                ☑️ Multiple Answers
              </option>
            </select>
          </div>
          {question.answers.length > 0 ? (
            question.multipleCorrectAnswers ? (
              // Multiple Answers
              // Multiple Answers
              // Multiple Answers
              question.answers.map((answer, i) => (
                <div className='w-11/12 max-w-[935px] flex flex-col justify-start items-center mt-4 px-4 py-4 border-2 rounded-lg'>
                  <div className='flex justify-between items-center w-full mb-4'>
                    <h1 className='font-bold text-[16px]  '>Answer {i + 1}</h1>
                    <div
                      className='tooltip tooltip-left'
                      data-tip='Delete Answer'
                    >
                      <MdOutlineDeleteForever
                        size={24}
                        className='cursor-pointer text-red-500'
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this answer?'
                            )
                          ) {
                            setQuestions((prev) => {
                              const newQuestions = [...prev]
                              newQuestions[index].answers.splice(i, 1)
                              return newQuestions
                            })
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center w-full '>
                    <input
                      type='text'
                      placeholder='Answer Text'
                      className='input input-bordered input-sm w-11/12 md:w-10/12 mb-2 md:mb-0'
                      value={answer.text}
                      onChange={(e) => {
                        setQuestions((prev) => {
                          const newQuestions = [...prev]
                          newQuestions[index].answers[i].text = e.target.value
                          return newQuestions
                        })
                      }}
                    />
                    <div className='form-control mb-2 md:mb-0'>
                      <label className='label cursor-pointer'>
                        <span className='label-text mr-2 font-bold'>
                          {answer.isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                        <input
                          type='checkbox'
                          className='toggle toggle-success'
                          onChange={() => {
                            setQuestions((prev) => {
                              const newQuestions = [...prev]
                              newQuestions[index].answers[i].isCorrect =
                                !newQuestions[index].answers[i].isCorrect
                              return newQuestions
                            })
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className='w-full  mt-4 flex flex-col justify-start items-center'>
                    <Quill
                      modules={modules}
                      theme='snow'
                      className='w-full custom-quill-container-quiz  border-2 rounded-lg border-opacity-20'
                      value={answer.explanation}
                      onChange={(e) => {
                        setQuestions((prev) => {
                          const newQuestions = [...prev]
                          newQuestions[index].answers[i].explanation = e
                          return newQuestions
                        })
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              // Single Answer
              // Single Answer
              // Single Answer
              question.answers.map((answer, i) => (
                <div className='w-11/12 max-w-[935px] flex flex-col justify-start items-center mt-4 px-4 py-4 border-2 rounded-lg'>
                  <div className='flex justify-between items-center w-full mb-4'>
                    <h1 className='font-bold text-[16px]  '>Answer {i + 1}</h1>
                    <div
                      className='tooltip tooltip-left'
                      data-tip='Delete Answer'
                    >
                      <MdOutlineDeleteForever
                        size={24}
                        className='cursor-pointer text-red-500'
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this answer?'
                            )
                          ) {
                            setQuestions((prev) => {
                              const newQuestions = [...prev]
                              newQuestions[index].answers.splice(i, 1)
                              return newQuestions
                            })
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center w-full '>
                    <input
                      type='text'
                      placeholder='Answer Text'
                      className='input input-bordered input-sm w-11/12 md:w-10/12 mb-2 md:mb-0'
                      value={answer.text}
                      onChange={(e) => {
                        setQuestions((prev) => {
                          const newQuestions = [...prev]
                          newQuestions[index].answers[i].text = e.target.value
                          return newQuestions
                        })
                      }}
                    />
                    <div className='form-control mb-2 md:mb-0'>
                      <label className='label cursor-pointer'>
                        <span className='label-text mr-2 font-bold'>
                          {answer.isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                        <input
                          type='checkbox'
                          className='toggle toggle-success'
                          disabled={singleAnswer && singleAnswer !== i + 1}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSingleAnswer(i + 1)
                            } else {
                              setSingleAnswer(null)
                            }
                            setQuestions((prev) => {
                              const newQuestions = [...prev]
                              newQuestions[index].answers[i].isCorrect =
                                !newQuestions[index].answers[i].isCorrect
                              return newQuestions
                            })
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className='w-full  mt-4 flex flex-col justify-start items-center'>
                    <div className='flex justify-start items-center w-full mb-4'>
                      <h1 className='font-bold text-[14px]  '>
                        Explain Answer (Why is this answer correct/incorrect?)
                      </h1>
                    </div>
                    <Quill
                      modules={modules}
                      theme='snow'
                      className='w-full custom-quill-container-quiz  border-2 rounded-lg border-opacity-20'
                      value={answer.explanation}
                      onChange={(e) => {
                        setQuestions((prev) => {
                          const newQuestions = [...prev]
                          newQuestions[index].answers[i].explanation = e
                          return newQuestions
                        })
                      }}
                    />
                  </div>
                </div>
              ))
            )
          ) : (
            <div className='w-11/12 max-w-[935px] flex justify-center items-center mt-4'>
              <h1 className='text-[16px] font-bold text-gray-400'>
                No answers added yet
              </h1>
            </div>
          )}
          <div
            className='w-11/12 max-w-[935px] flex justify-start items-center mt-4 cursor-pointer'
            onClick={() => {
              addAnswer(index)
            }}
          >
            <p className='flex text-[14px] text-gray-400 items-center hover:text-blue-300'>
              <IoMdAddCircleOutline size={18} className=' mr-2' />
              Add Answer
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

export default QuizQuestion
