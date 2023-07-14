import { useState } from "react"

const SingleCourseLessons = ({ lessons, setPreview, handlePreview }) => {
  const [displayedLessons, setDisplayedLessons] = useState(5)
  const loadMoreLessons = () => {
    setDisplayedLessons(lessons.length)
  }
  return (
    <div className='flex justify-center item-center'>
      <div className=' w-full lg:max-w-[1080px]'>
        <div className='flex flex-col justify-start mx-10 pt-6 pb-3'>
          <h4 className='text-[20px] font-bold mb-4'>Course content</h4>
          <h4 className='text-[16px] font-bold'>
            {lessons && lessons.length} Lessons
          </h4>
        </div>
        <div className=' w-full'>
          {lessons &&
            lessons.slice(0, displayedLessons).map((lesson, index) => (
              <div
                tabIndex={index}
                key={index}
                className='collapse border-b-2 border-blue-200 rounded-none bg-gray-100  '
                style={{
                  transition: "opacity 0.5s",
                  opacity: displayedLessons >= index + 1 ? 1 : 0,
                }}
              >
                {/* <input type='checkbox' /> */}
                <div className='collapse-title text-xl font-medium flex w-full pr-0'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center'>
                      <div className='avatar placeholder'>
                        <div className='w-8 h-8 rounded-full bg-blue-200 text-black'>
                          <span className='text-[14px]'>{index + 1}</span>
                        </div>
                      </div>
                      {lesson.free_preview ? (
                        <span
                          className='mx-8 text-[14px] sm:text-[16px] link text-purple-500 z-50'
                          onClick={() => {
                            handlePreview(lesson.video)
                          }}
                        >
                          {lesson.title}
                        </span>
                      ) : (
                        <div className='mx-8 text-[14px] sm:text-[16px]'>
                          {lesson.title}
                        </div>
                      )}
                    </div>
                    {lesson.free_preview ? (
                      <div
                        className='text-[14px] z-50 link text-purple-500 text-center min-w-[101px] mr-2'
                        onClick={() => {
                          handlePreview(lesson.video)
                        }}
                      >
                        Preview
                      </div>
                    ) : (
                      <div className='badge badge-success gap-2 min-w-[101px] mr-2'>
                        Paid Lesson
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className='collapse-content'>
                  <p>{lesson.content}</p>
                </div> */}
              </div>
            ))}
          {displayedLessons < lessons.length && (
            <div className='flex justify-center my-4 w-full'>
              <button
                className='btn btn-active w-[90%]'
                onClick={loadMoreLessons}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleCourseLessons
