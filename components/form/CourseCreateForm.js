'use client'

import { MdOutlineSaveAlt } from 'react-icons/md'

const CourseCreateForm = ({
  handleImage,
  handleSubmit,
  handleChange,
  values,
  setValues,
  preview,
  image,
  handleImageRemove,
  imgRef,
  editPage = false,
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

  return (
    <form onSubmit={handleSubmit}>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
      <div className='flex flex-col justify-center items-center gap-3 w-full'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={handleChange}
          value={values.name}
          className='input input-bordered w-full  mx-2'
        />
        <input
          type='text'
          name='category'
          placeholder='Course Category'
          onChange={handleChange}
          value={values.category}
          className='input input-bordered w-full  mx-2'
        />
        <textarea
          type='text'
          name='description'
          placeholder='Description'
          onChange={handleChange}
          value={values.description}
          className='textarea textarea-bordered textarea-sm w-full  mx-2 min-h-[20rem]'
        />
        <select
          className='select select-bordered w-full  mx-2'
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
        {values.paid && (
          <>
            <label className='label mx-2'>SELECT COURSE PRICE</label>

            <select
              className='select select-bordered w-full  mx-2'
              onChange={(v) => setValues({ ...values, price: v.target.value })}
              // defaultValue={values.price}
            >
              {children}
            </select>
          </>
        )}

        <div className='form-control w-full  mx-2'>
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
        {preview && (
          <div className='avatar my-4'>
            <div className='w-32 rounded relative'>
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
            <div className='w-32 rounded relative'>
              <img src={values.image.Location} />
            </div>
          </div>
        )}
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
        {/* <pre>{JSON.stringify(values, null, 4)}</pre>
        <hr />
        <pre>{JSON.stringify(image, null, 4)}</pre> */}
      </div>
    </form>
  )
}

export default CourseCreateForm
