import React from 'react'
import ReactPlayer from 'react-player'

const UpdateLessonForm = ({
  currentLesson,
  setCurrentLesson,
  uploading,
  setUploading,
  progress,
  handleUpdateLesson,
  handleVideo,
  signedUrl,

  video_input,
}) => {
  return (
    <div>
      {currentLesson && (
        <form onSubmit={handleUpdateLesson}>
          <div className='flex flex-col justify-center items-center gap-3 w-full'>
            <input
              type='text'
              name='title'
              placeholder='Title'
              onChange={(e) =>
                setCurrentLesson({ ...currentLesson, title: e.target.value })
              }
              value={currentLesson.title}
              className='input input-bordered w-full max-w-screen-xl mx-2'
              required
              autoFocus
            />
            <textarea
              type='text'
              name='content'
              placeholder='Content'
              onChange={(e) =>
                setCurrentLesson({ ...currentLesson, content: e.target.value })
              }
              value={currentLesson.content}
              className='textarea textarea-bordered textarea-sm w-full max-w-screen-xl mx-2 pb-10'
            />
            <select
              className='select select-bordered w-full max-w-screen-xl mx-2'
              onChange={(v) => {
                setCurrentLesson({
                  ...currentLesson,
                  free_preview: v.target.value,
                })
              }}
              //   defaultValue={currentLesson.free_preview}
            >
              <option value={true} selected={currentLesson.free_preview}>
                Free Preview Video
              </option>
              <option value={false} selected={!currentLesson.free_preview}>
                Paid to Watch Video
              </option>
            </select>
            <div className='form-control w-full max-w-screen-xl mx-2 flex flex-row justify-between items-center'>
              <label className='label'>
                <span className='label-text'>
                  {uploading ? 'Uploading . . .' : 'UPDATE LESSON VIDEO'}
                </span>
              </label>
              {!uploading &&
              currentLesson &&
              currentLesson.video &&
              currentLesson.video.Location ? (
                <label className='w-[120px]'>
                  <input
                    type='file'
                    name='video'
                    onChange={handleVideo}
                    accept='video/*'
                    style={{ display: 'none' }}
                    className='w-full'
                  />
                  <span className='justify-end text-blue-400 cursor-pointer'>
                    Change Video
                  </span>
                </label>
              ) : (
                !uploading && (
                  <label className='w-[120px]'>
                    <input
                      type='file'
                      name='video'
                      onChange={handleVideo}
                      accept='video/*'
                      style={{ display: 'none' }}
                      className='w-full'
                    />
                    <span className='justify-end text-blue-400 cursor-pointer'>
                      Upload a Video
                    </span>
                  </label>
                )
              )}
              {/* <input
                type='file'
                name='video'
                onChange={handleVideo}
                accept='video/*'
                className='file-input file-input-bordered w-full max-w-screen-xl'
                ref={video_input}
              /> */}
            </div>
            {progress > 0 && (
              <progress
                className='progress progress-info w-full max-w-screen-xl'
                value={progress}
                max='100'
              ></progress>
            )}
            {!uploading &&
              currentLesson &&
              currentLesson.video &&
              currentLesson.video.Location && (
                <div className='flex justify-center items-center mb-4 rounded'>
                  <ReactPlayer
                    url={signedUrl}
                    width='100%'
                    height='100%'
                    controls={true}
                    className='rounded'
                  />
                </div>
              )}
            <button
              className='btn btn-block btn-info'
              onClick={handleUpdateLesson}
              disabled={uploading}
            >
              {uploading ? (
                <div className='flex justify-center items-center'>
                  <span className='loading loading-spinner'></span>
                  "loading"
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
            {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
          </div>
        </form>
      )}
    </div>
  )
}

export default UpdateLessonForm
