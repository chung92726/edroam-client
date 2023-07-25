import React from 'react';
import ReactPlayer from 'react-player';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { BsFillTrash3Fill } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const Quill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
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
};

const UpdateLessonForm = ({
  values,
  setValues,
  currentLesson,
  setCurrentLesson,
  uploading,
  setUploading,
  progress,
  handleUpdateLesson,
  handleVideo,
  signedUrl,
  supplementary,
  setSupplementary,
  video_input,
  handleAddSupplementary,
  handleSupplementary,
  handleSupplementaryRemove,
  supplementary_input,
}) => {
  return (
    <div>
      <dialog id='my_modal_3' className='modal '>
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
                handleSupplementary();
                window.my_modal_3.close();
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
            {/* <textarea
              type='text'
              name='content'
              placeholder='Content'
              onChange={(e) =>
                setCurrentLesson({ ...currentLesson, content: e.target.value })
              }
              value={currentLesson.content}
              className='textarea textarea-bordered textarea-sm w-full max-w-screen-xl mx-2 pb-10'
            /> */}
            <Quill
              modules={modules}
              theme='snow'
              className='custom-quill-container w-full border-2 rounded-lg bg-white mb-8'
              name='content'
              value={currentLesson.content}
              onChange={(e) =>
                setCurrentLesson({ ...currentLesson, content: e })
              }
            />
            <select
              className='select select-bordered w-full max-w-screen-xl mx-2'
              onChange={(v) => {
                setCurrentLesson({
                  ...currentLesson,
                  free_preview: v.target.value,
                });
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
            <div className='form-control w-full max-w-md '>
              <label className='label'>
                <span className='label-text'>
                  {uploading ? 'Uploading . . .' : 'Add Supplemental File'}
                </span>
                {!uploading && (
                  <AiOutlineFolderAdd
                    className='text-2xl text-blue-500 cursor-pointer'
                    size={25}
                    onClick={() => window.my_modal_3.showModal()}
                  />
                )}
              </label>
            </div>
            <h1 className='font-bold'>Supplementary files: </h1>
            <div className='flex flex-col justify-center items-start gap-2 w-full max-w-md'>
              {currentLesson &&
                currentLesson.supplementary_resources &&
                currentLesson.supplementary_resources.map((file, i) => (
                  <div className='flex justify-between items-center max-w-md w-full '>
                    <a
                      className='text-[16px] link link-secondary '
                      href={file.file.Location}
                      target='_blank'
                    >
                      {file.title}
                    </a>
                    <div
                      className='tooltip tooltip-left'
                      data-tip='Delete File'
                    >
                      <BsFillTrash3Fill
                        className='text-red-500 cursor-pointer'
                        onClick={() => {
                          handleSupplementaryRemove(i);
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
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
  );
};

export default UpdateLessonForm;
