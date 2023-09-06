'use client'

import { MdOutlineSaveAlt } from 'react-icons/md'
import Select from 'react-select'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { IoAddCircleOutline } from 'react-icons/io5'
import { CiCircleRemove } from 'react-icons/ci'

const optionList = [
  { value: 'WebDesign', label: 'Web Design' },
  { value: 'UIUXDesign', label: 'UI/UX Design' },
  { value: 'GraphicDesign', label: 'Graphic Design' },
  { value: '3DModeling', label: '3D Modeling' },
  { value: 'VideoEditing', label: 'Video Editing' },
  { value: 'Others', label: 'Others' },
]

const Quill = dynamic(
  () => {
    return import('react-quill')
  },
  { ssr: false }
)

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
}

const CourseCreateForm = ({
  handleImage,
  handleSubmit,
  handleChange,
  values,
  setValues,
  preview,
  image,
  handleImageRemove,
  handleOptionsChange,
  imgRef,
  editPage = false,
  handleAddBullet,
  handleRemoveBullet,
  handleBulletChange,
}) => {
  const children = []
  for (let i = 1.99; i <= 100.99; i++) {
    children.push(
      <option
        key={i.toFixed(2)}
        value={i.toFixed(2)}
        selected={values.price == i.toFixed(2)}
      >
        ${i.toFixed(2)}
      </option>
    )
  }
  const [details, setDetails] = useState('')

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-full items-center justify-center my-5'
      >
        <div className='flex flex-col justify-center items-center gap-3 mt-5 w-[90%]'>
          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>Course Name</span>
            </label>
            <input
              type='text'
              name='name'
              placeholder='Course Name'
              value={values.name}
              onChange={handleChange}
              className='input input-bordered '
            />
            <label className='label'>
              <span className='label-text-alt'></span>
              <span className='label-text-alt'>Max: 50 characters</span>
            </label>
          </div>

          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>Course Category</span>
            </label>
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              placeholder='Select Course Category'
              isMulti
              name='colors'
              options={optionList}
              className='w-full text-[1rem] '
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: 'hsl(214,30%,32%, 0.2)',
                  borderRadius: '0.5rem',
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: 'hsl(214,30%,32%, 0.2)',
                },
              })}
              classNamePrefix='select'
              onChange={handleOptionsChange}
              value={values.category}
            />
          </div>
          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>Short Description</span>
            </label>
            <textarea
              type='text'
              name='description'
              placeholder='Short Description'
              onChange={handleChange}
              value={values.description}
              className='textarea textarea-bordered textarea-sm w-full min-h-[6rem]'
            />
            <label className='label'>
              <span className='label-text-alt'></span>
              <span className='label-text-alt'>Max: 300 characters</span>
            </label>
          </div>
          {/* bullet point input for requirement and what you'll learn */}
          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>What students will learn</span>
            </label>
            {values.whatYouWillLearn.map((point, index) => (
              <div key={index} className='flex items-center my-2'>
                <input
                  type='text'
                  value={point}
                  onChange={(e) =>
                    handleBulletChange('whatYouWillLearn', index, e)
                  }
                  className='input input-bordered flex-grow mr-2 text-[14px]'
                  placeholder={
                    index == 0
                      ? `e.g Become an advanced JavaScript developer from scratch`
                      : `Point ${index + 1}`
                  }
                />
                <button
                  onClick={(e) =>
                    handleRemoveBullet('whatYouWillLearn', index, e)
                  }
                >
                  <CiCircleRemove size={24} className='text-red-500' />
                </button>
              </div>
            ))}
            <button
              onClick={(e) => handleAddBullet('whatYouWillLearn', e)}
              className='flex justify-center items-center gap-2 text-gray-500'
            >
              <p className='text-[14px]'>Add Point</p>
              <IoAddCircleOutline />
            </button>
          </div>

          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>Course Requirements</span>
            </label>
            {values.requirements.map((point, index) => (
              <div key={index} className='flex items-center my-2'>
                <input
                  type='text'
                  value={point}
                  onChange={(e) => handleBulletChange('requirements', index, e)}
                  className='input input-bordered flex-grow mr-2 text-[14px]'
                  placeholder={
                    index == 0
                      ? `e.g No coding experience is necessary to take this course`
                      : `Requirement ${index + 1}`
                  }
                />
                <button
                  onClick={(e) => handleRemoveBullet('requirements', index, e)}
                >
                  <CiCircleRemove size={24} className='text-red-500' />
                </button>
              </div>
            ))}
            <button
              onClick={(e) => handleAddBullet('requirements', e)}
              className='flex justify-center items-center gap-2 text-gray-500'
            >
              <p className='text-[14px]'>Add Requirement</p>
              <IoAddCircleOutline />
            </button>
          </div>

          {/* bullet point input for requirement and what you'll learn */}
          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>Detail Description</span>
            </label>
            <Quill
              modules={modules}
              theme='snow'
              className='custom-quill-container w-full border-2 rounded-lg bg-white'
              name='detailDescription'
              value={values.detailDescription}
              onChange={(e) =>
                setValues({
                  ...values,
                  detailDescription: e,
                })
              }
            />
          </div>
          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>Level</span>
            </label>
            <select
              className='select select-bordered w-full'
              onChange={handleChange}
            >
              <option
                selected={values.level === 'All Levels'}
                value='All Levels'
              >
                All Levels
              </option>
              <option selected={values.level === 'Beginner'} value='Beginner'>
                Beginner
              </option>
              <option
                selected={values.level === 'Intermediate'}
                value='Intermediate'
              >
                Intermediate
              </option>
              <option selected={values.level === 'Expert'} value='Expert'>
                Expert
              </option>
            </select>
          </div>
          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>Language</span>
            </label>
            <select
              className='select select-bordered w-full'
              onChange={handleChange}
            >
              <option selected={values.language === 'English'} value='English'>
                English
              </option>
              <option selected={!values.language === 'Chinese'} value='Chinese'>
                Chinese
              </option>
            </select>
          </div>
          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>Free / Paid Course</span>
            </label>
            <select
              className='select select-bordered w-full '
              onChange={(v) => {
                if (v.target.value == 'true') {
                  setValues({ ...values, paid: true, price: 9.99 })
                } else {
                  setValues({ ...values, paid: false, price: 0 })
                }
              }}
            >
              <option selected={values.paid} value={true}>
                Paid Course
              </option>
              <option selected={!values.paid} value={false}>
                Free Course
              </option>
            </select>
          </div>
          {values.paid && (
            <>
              {/* <label className='label mx-2'>SELECT COURSE PRICE</label> */}
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Price</span>
                </label>
                <select
                  className='select select-bordered w-full'
                  onChange={(v) =>
                    setValues({ ...values, price: v.target.value })
                  }
                  // defaultValue={values.price}
                >
                  {children}
                </select>
              </div>
            </>
          )}

          {preview && (
            <div className='avatar my-4'>
              <div className='w-full rounded relative max-w-xl'>
                <div
                  className='badge badge-secondary h-[20px] w-[20px] bg-red-600 badge-sm absolute right-0 cursor-pointer '
                  onClick={handleImageRemove}
                >
                  X
                </div>
                <img src={preview} />
              </div>
            </div>
          )}

          {values.image && editPage && !preview && (
            <div className='avatar my-4'>
              <div className='w-full rounded relative max-w-xl'>
                <img src={values.image.Location} />
              </div>
            </div>
          )}

          <div className='form-control w-full max-w-xl mx-2'>
            <label className='label'>
              <span className='label-text'>
                {values.uploading ? 'Uploading . . .' : 'UPLOAD COURSE IMAGE'}
              </span>
            </label>
            <input
              type='file'
              name='image'
              onChange={handleImage}
              accept='image/*'
              className='file-input file-input-bordered w-full '
              ref={imgRef}
            />
          </div>

          <button
            className='btn mt-3 btn-wide btn-primary mb-5'
            onClick={handleSubmit}
            disabled={
              values.loading ||
              values.uploading ||
              !values.name ||
              !values.description
            }
          >
            {values.loading || values.uploading ? (
              <>
                <span className='loading loading-spinner'></span>
                loading
              </>
            ) : (
              <>
                <MdOutlineSaveAlt />
                Save and Continue
              </>
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default CourseCreateForm
