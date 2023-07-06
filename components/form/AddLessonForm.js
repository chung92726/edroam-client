import React from 'react'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { BsFillTrash3Fill } from 'react-icons/bs'

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  handleVideo,
  progress,
  handleVideoRemove,
  video_input,
  supplementary,
  setSupplementary,
  handleAddSupplementary,
  supplementary_input,
  handleSupplementary,
  handleSupplementaryRemove,
}) => {
  return (
    <div>
      <dialog id='my_modal_3' className='modal'>
        <form method='dialog' className='modal-box w-[350px]'>
          <h3 className='font-bold text-md my-2'>Add Supplementary File</h3>
          <input
            type='text'
            name='title'
            placeholder='Title'
            onChange={(e) =>
              setSupplementary({ ...supplementary, title: e.target.value })
            }
            value={supplementary.title}
            className='input input-bordered w-11/12 my-2'
            required
            autoFocus
          />
          {/* <select
            className='select select-bordered w-11/12 my-2'
            onChange={(v) => {
              setSupplementary({ ...supplementary, file_type: v.target.value })
            }}
            defaultValue={supplementary.file_type}
          >
            <option value='zip'>zip</option>
            <option value='pdf'>pdf</option>
            <option value='doc'>doc</option>
            <option value='txt'>txt</option>
            <option value='ppt'>ppt</option>
            <option value='picture'>picture</option>
            <option value='other'>other</option>
          </select> */}
          <textarea
            type='text'
            name='description'
            placeholder='Description'
            onChange={(e) =>
              setSupplementary({
                ...supplementary,
                description: e.target.value,
              })
            }
            value={supplementary.description}
            className='textarea textarea-bordered textarea-sm w-11/12  pb-10'
          />
          <input
            type='file'
            className='file-input file-input-bordered w-11/12 my-2'
            onChange={handleAddSupplementary}
            ref={supplementary_input}
          />
          {/* <pre>{JSON.stringify(supplementary, null, 4)}</pre> */}
          <div className='modal-action'>
            {/* if there is a button in form, it will close the modal */}
            <button
              className='btn  btn-info'
              disabled={supplementary.uploading}
              onClick={() => {
                handleSupplementary()
                window.my_modal_3.close()
              }}
            >
              {supplementary.uploading ? (
                <div className='flex justify-center items-center'>
                  <span className='loading loading-spinner'></span>
                  "loading"
                </div>
              ) : (
                'Add File'
              )}
            </button>
            <button
              className='btn btn-error'
              onClick={() => window.my_modal_3.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
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
                {values.uploading ? 'Uploading . . .' : 'Upload Lesson Video'}
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
          <div className='form-control w-full max-w-md '>
            <label className='label'>
              <span className='label-text'>
                {values.uploading ? 'Uploading . . .' : 'Add Supplemental File'}
              </span>
              {!values.uploading && (
                <AiOutlineFolderAdd
                  className='text-2xl text-blue-500 cursor-pointer'
                  size={25}
                  onClick={() => window.my_modal_3.showModal()}
                />
              )}
            </label>
          </div>
          <h1 className='font-bold'>Supplementary files: </h1>
          <div className='flex flex-col justify-center items-start gap-2 w-full max-w-md mx-2'>
            {values.supplementary_resources.map((file, i) => (
              <div className='flex justify-between items-center max-w-md w-full '>
                <a
                  className='text-[16px] link link-secondary '
                  href={file.file.Location}
                  target='_blank'
                >
                  {file.title}
                </a>
                <div className='tooltip tooltip-left' data-tip='Delete File'>
                  <BsFillTrash3Fill
                    className='text-red-500 cursor-pointer'
                    onClick={() => {
                      handleSupplementaryRemove(i)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

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
