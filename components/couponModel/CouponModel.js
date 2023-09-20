import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css'
import 'react-calendar/dist/Calendar.css'

export default function CouponModel({
  coupon,
  setcoupon,
  discountTypeSelection,
  courses,
  isDropdownOpen,
  toggleDropdown,
  handleCourseSelection,
  getCourseNameById,
  dropdownRef,
}) {
  return (
    <dialog id='coupon_model' className='modal '>
      <div className='modal-box min-h-[600px]'>
        <div className='flex justify-between items-center w-full'>
          <div className='relative form-control w-2/3'>
            <label className='label'>
              <span className='label-text'>Coupon Name</span>
            </label>
            <input
              type='text'
              placeholder='Name'
              maxLength='32'
              value={coupon.name}
              onChange={(e) => setcoupon({ ...coupon, name: e.target.value })}
              className='input input-bordered w-full pr-8 text-xs input-sm' // Added padding to prevent overlap
            />
            <span className='absolute right-2 top-[65%]  text-xs text-gray-400'>
              {`${32 - coupon.name.length}`}
            </span>
          </div>
          <div className='form-control w-1/3 ml-2'>
            <label className='label'>
              <span className='label-text'>Usage Limit</span>
            </label>
            <input
              type='number'
              placeholder='No limit by default'
              className='input input-bordered w-full input-sm text-xs'
              value={coupon.usageLimit}
              onChange={(e) => {
                let value = e.target.value
                if (value === '') {
                  value = null
                }
                setcoupon({ ...coupon, usageLimit: value })
              }}
            />
          </div>
        </div>
        <div className='flex w-full justify-between items-center'>
          <div className='form-control w-2/3'>
            <label className='label'>
              <span className='label-text'>
                Discount Type (percentage/fixed price)
              </span>
            </label>
            <select
              className='select select-bordered select-sm'
              onChange={(e) => {
                setcoupon({ ...coupon, discountType: e.target.value })
              }}
            >
              {discountTypeSelection.map((item, index) => (
                <option
                  key={index}
                  value={item.value}
                  selected={coupon.discountType === item.value}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-control w-1/3 ml-2'>
            <label className='label'>
              <span className='label-text'>Discount (Max 90%)</span>
            </label>
            <input
              type='number'
              placeholder={coupon.discountType === 'percentage' ? '%' : '$'}
              value={coupon.discount}
              onChange={(e) => {
                let value = e.target.value

                // If discountType is 'percentage' and value is greater than 90, set value to 90.
                if (
                  coupon.discountType === 'percentage' &&
                  parseFloat(value) > 90
                ) {
                  value = '90'
                }

                setcoupon({ ...coupon, discount: value })
              }}
              className='input input-bordered w-full text-xs input-sm'
            />
          </div>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='form-control w-1/5 '>
            <label className='label'>
              <span className='label-text'>Expiration</span>
            </label>
            <select
              className='select select-bordered select-sm w-full'
              onChange={(e) =>
                setcoupon({
                  ...coupon,
                  expiration: e.target.value === 'true' ? true : false,
                })
              }
            >
              <option value={true} selected={coupon.expiration === true}>
                True
              </option>
              <option value={false} selected={coupon.expiration === false}>
                False
              </option>
            </select>
          </div>
          <div className='form-control w-full pl-5'>
            <label className='label'>
              <span className='label-text'>Code Valid From and To</span>
            </label>
            <DateRangePicker
              className='border-red-100 border-5 rounded-xl text-[14px]'
              calendarClassName='rounded-xl text-[15px] px-4 border-2'
              calendarIcon={null}
              disabled={!coupon.expiration}
              rangeDivider='--'
              //   required={coupon.expiration}
              value={
                coupon.expiration ? [coupon.validFrom, coupon.validTo] : []
              }
              onChange={(value) => {
                if (value === null) {
                  value = ['', '']
                }
                setcoupon({
                  ...coupon,
                  validFrom: value[0],
                  validTo: value[1],
                })
              }}
            />
          </div>
        </div>
        <div className='form-control w-full mt-4'>
          <label className='label'>
            <span className='label-text'>Courses valid for this coupon</span>
          </label>
          <div className='relative' ref={dropdownRef}>
            <input
              type='text'
              placeholder={
                courses.length === 0
                  ? 'No courses available'
                  : 'Select courses...'
              }
              className='input input-bordered w-full'
              readOnly
              onClick={() => toggleDropdown()}
              disabled={courses.length === 0}
            />
            <div
              className={`absolute z-10 mt-2 w-full border bg-white rounded-md shadow-lg ${
                isDropdownOpen ? '' : 'hidden'
              } overflow-y-auto`}
              style={{ maxHeight: '200px' }} // Adjust this value as needed
            >
              {courses.map((course) => (
                <label
                  key={course._id}
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  <input
                    type='checkbox'
                    className='mr-2'
                    value={course._id}
                    checked={coupon.coursesValidFor.includes(course._id)}
                    onChange={() => handleCourseSelection(course._id)}
                  />
                  {course.name}
                </label>
              ))}
            </div>
          </div>
          <div className='mt-2 flex flex-wrap w-full overflow-y-auto h-[150px]'>
            <div
              className='mt-2 flex flex-wrap w-full overflow-y-auto '
              style={{ maxHeight: '100px' }}
            >
              {' '}
              {coupon.coursesValidFor.map((id) => (
                <div
                  key={id}
                  className='bg-blue-100 text-blue-600 mr-2 mb-2 px-2 py-1 h-[30px] rounded-full text-[10px]'
                >
                  {getCourseNameById(id)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='modal-action h-full justify-between'>
          <button>Halo</button>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
