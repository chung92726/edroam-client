import React from 'react'

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  handleVideo,
  progress,
  handleVideoRemove,
  video_input,
}) => {
  return (
    <div>
      <form onSubmit={handleAddLesson}>
        <div className='flex flex-col justify-center items-center gap-3 w-full'>
          <input
            type='text'
            name='title'
            placeholder='Title'
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            value={values.title}
            className='input input-bordered w-full max-w-md mx-2'
            required
            autoFocus
          />
          <textarea
            type='text'
            name='content'
            placeholder='Content'
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            value={values.content}
            className='textarea textarea-bordered textarea-sm w-full max-w-md mx-2 pb-10'
          />
          <select
            className='select select-bordered w-full max-w-md mx-2'
            onChange={(v) => {
              setValues({ ...values, free_preview: v.target.value })
            }}
            defaultValue={values.free_preview}
          >
            <option value={true}>Free Preview Video</option>
            <option value={false}>Paid to Watch Video</option>
          </select>
          <div className='form-control w-full max-w-md mx-2'>
            <label className='label'>
              <span className='label-text'>
                {values.uploading ? 'Uploading . . .' : 'UPLOAD LESSON VIDEO'}
              </span>
              {!values.uploading && values.video.Location && (
                <span
                  className='justify-end text-red-500 cursor-pointer'
                  onClick={handleVideoRemove}
                >
                  Remove Video
                </span>
              )}
            </label>
            <input
              type='file'
              name='video'
              onChange={handleVideo}
              accept='video/*'
              className='file-input file-input-bordered w-full max-w-md'
              ref={video_input}
            />
          </div>
          {progress > 0 && (
            <progress
              className='progress progress-info w-full max-w-md'
              value={progress}
              max='100'
            ></progress>
          )}
          <button
            className='btn btn-block btn-info'
            onClick={handleAddLesson}
            disabled={values.uploading}
          >
            {values.uploading ? (
              <div className='flex justify-center items-center'>
                <span className='loading loading-spinner'></span>
                "loading"
              </div>
            ) : (
              'Add Lesson'
            )}
          </button>
          {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
        </div>
      </form>
    </div>
  )
}

export default AddLessonForm
