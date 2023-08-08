import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

const Quill = dynamic(
  () => {
    return import('react-quill')
  },
  { ssr: false }
)

const LessonContentCard = ({ course, currentLesson, content }) => {
  return (
    <div className='flex justify-center item-center my-2 h-full'>
      <div className='w-full lg:max-w-[1080px]'>
        {course.lessons[currentLesson].content.length > 0 ? (
          <Quill
            modules={{
              toolbar: false,
            }}
            theme='snow'
            className='custom-quill-container-none mx-10 max-sm:mx-0'
            value={content}
            readOnly={true}
          />
        ) : (
          <h1 className='font-bold my-4'>
            There is no additional contents in this lesson
          </h1>
        )}
      </div>
    </div>
  )
}

export default LessonContentCard
