const SingleCourseLessons = ({ lessons, setPreview, handlePreview }) => {
  return (
    <div className='bg-gray-100'>
      <div className='flex flex-col justify-start mx-10 pt-6 pb-3'>
        <h4 className='text-[20px] font-bold mb-4'>Course content</h4>
        <h4 className='text-[16px] font-bold'>
          {lessons && lessons.length} Lessons
        </h4>
      </div>
      <div className=' w-full'>
        {lessons &&
          lessons.map((lesson, index) => (
            <div
              tabIndex={index}
              key={index}
              className='collapse border-b-2 border-blue-200 rounded-none bg-gray-100 mx-6 w-[90%]'
            >
              <input type='checkbox' />
              <div className='collapse-title text-xl font-medium flex w-full'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='w-8 rounded-full bg-blue-200 text-black'>
                      <span className='text-[14px]'>{index + 1}</span>
                    </div>
                  </div>
                  {lesson.free_preview ? (
                    <span
                      className='mx-8 text-[16px] link text-purple-500 z-50'
                      onClick={() => {
                        handlePreview(lesson.video)
                      }}
                    >
                      {lesson.title}
                    </span>
                  ) : (
                    <span className='mx-8 text-[16px]'>{lesson.title}</span>
                  )}
                  {lesson.free_preview ? (
                    <div
                      className='text-[14px] z-50 link text-purple-500'
                      onClick={() => {
                        handlePreview(lesson.video)
                      }}
                    >
                      Preview
                    </div>
                  ) : (
                    <div className='badge badge-success gap-2'>Paid Lesson</div>
                  )}
                </div>
              </div>
              {/* <div className='collapse-content'>
                  <p>{lesson.content}</p>
                </div> */}
            </div>
          ))}
      </div>
    </div>
  )
}

export default SingleCourseLessons
