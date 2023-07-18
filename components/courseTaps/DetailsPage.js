import React from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
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

const DetailsPage = ({
  backToQandA,
  currentQuestion,
  comment,
  setComment,
  publishComment,
  course,
}) => {
  return (
    <div className='w-full flex flex-col justify-start items-start mb-4'>
      <button
        className='btn  btn-neutral mb-6 !text-[12px]'
        onClick={backToQandA}
      >
        Back to All Questions
      </button>
      <div className='flex flex-col justify-start items-start w-full'>
        <div className='w-full  flex  justify-between items-center mb-4 hover:bg-gray-200 py-2 px-2'>
          <img
            src={currentQuestion.askedBy.picture}
            className='w-10 h-10 mr-2 rounded-full'
          />
          <div className='flex flex-col justify-start items-start w-11/12'>
            <h1 className='font-bold text-[18px]'>{currentQuestion.title}</h1>
            <div className='flex flex-row justify-start items-center'>
              <p className='text-[12px] text-blue-500 mr-1'>
                By {currentQuestion.askedBy.name}
              </p>
              <p className='text-[12px] text-blue-500 mr-1'>
                Lesson {currentQuestion.lessonIndex + 1}
              </p>
              <p className='text-[12px] text-gray-500 mr-1'>
                on {new Date(currentQuestion.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <Quill
          modules={{
            toolbar: false,
          }}
          theme='snow'
          className='w-full h-full border-2 rounded-lg'
          value={currentQuestion.content}
          readOnly={true}
        />
        {/* <div
          className='w-full'
          dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
        /> */}
      </div>
      <p className='font-bold text-[16px] my-2'>
        {currentQuestion.answers.length} replies
      </p>
      {currentQuestion.answers.length > 0 ? (
        currentQuestion.answers.map((answer) => (
          <div className='w-full  flex  justify-between items-start mb-4 hover:bg-gray-200 py-2 px-2'>
            <img
              src={answer.answeredBy.picture}
              className='w-10 h-10 mr-2 rounded-full'
            />
            <div className='flex flex-col justify-start items-start w-11/12'>
              <h1 className='font-bold text-[16px] mb-2 text-blue-500 flex items-center gap-2'>
                {answer.answeredBy.name}{' '}
                {answer.role === 'instructor' && (
                  <div className='badge badge-warning gap-2'>Instructor</div>
                )}
              </h1>
              <p className='text-[12px] text-gray-500 mr-1 mb-2'>
                on {new Date(answer.createdAt).toLocaleDateString()}
              </p>
              <Quill
                modules={{
                  toolbar: false,
                }}
                theme='snow'
                className='w-full h-full border-2 rounded-lg'
                value={answer.content}
                readOnly={true}
              />
              {/* <div
                className='w-full'
                dangerouslySetInnerHTML={{ __html: answer.content }}
              /> */}
            </div>
          </div>
        ))
      ) : (
        <h1 className='font-bold my-4'>There is no reply for this question</h1>
      )}
      <p className='font-bold text-[16px] my-2'>Write Your Reply Here:</p>
      <Quill
        modules={modules}
        theme='snow'
        className='custom-quill-container w-full border-2 rounded-lg'
        value={comment}
        onChange={setComment}
      />
      <div className='w-full flex justify-end'>
        <button
          className='btn btn-neutral mr-2 !text-[12px]'
          onClick={() => {
            publishComment(currentQuestion._id)
          }}
        >
          Add an answer
        </button>
      </div>
    </div>
  )
}

export default DetailsPage
