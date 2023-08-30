'use client'
import { useContext, useEffect, useState } from 'react'
import { Context } from '@/context/index'
import UserRoute from '@/components/routes/UserRoutes'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { MdOutlineSaveAlt } from 'react-icons/md'

const ProfilePage = () => {
  const { state, dispatch } = useContext(Context)
  const { user } = state
  const [img, setImg] = useState('')
  const [values, setValues] = useState({
    name: '',
    gender: '',
    ageRange: '',
    website: '',
    youtube: '',
    facebook: '',
    instagram: '',
    twitter: '',
    wechat: '',
    tiktok: '',
    phoneNumber: '',
    biography: '',
    picture: {},
    loading: false,
  })
  const [orgValues, setOrgValues] = useState({
    name: '',
    gender: '',
    ageRange: '',
    website: '',
    youtube: '',
    facebook: '',
    instagram: '',
    twitter: '',
    wechat: '',
    tiktok: '',
    phoneNumber: '',
    biography: '',
    picture: {},
    loading: false,
  })
  const router = useRouter()

  const handleImage = (e) => {
    let file = e.target.files[0]
    Resizer.imageFileResizer(file, 180, 180, 'JPEG', 100, 0, async (url) => {
      setImg(url)
    })
    // setImg(file && window.URL.createObjectURL(file));
    setValues({ ...values, picture: img })
  }

  const removeImg = async (img) => {
    try {
      const res = await axios.post('/api/course/remove-image', {
        image: img,
      })
      // setValues({ ...values, uploading: false });
    } catch (err) {
      console.log(err)
      setValues({ ...values, uploading: false })
      // toast.error("Image Remove failed. Try later");
    }
  }

  const uploadImg = async (img) => {
    try {
      let { data } = await axios.post('/api/course/upload-image', {
        image: img,
      })
      // console.log("Image uploaded", data);
      setValues({ ...values, uploading: false })
      return data
      // toast.success("Image uploaded");
    } catch (err) {
      console.log(err)
      setValues({ ...values, uploading: false })
      // toast.error("Image upload failed. Try later");
    }
  }

  const handleSubmit = async () => {
    let s3Img
    if (img && img !== user.picture) {
      setValues({ ...values, uploading: true })

      if (user.picture?.Bucket) {
        await removeImg(user.picture)
      }
      s3Img = await uploadImg(img)
    }

    try {
      const { data } = await axios.post('/api/user/updateInfo', {
        ...values,
        picture: s3Img ? s3Img : user.picture,
      })
      setValues({ ...values, loading: false, picture: s3Img })
      dispatch({
        type: 'UPDATE',
        payload: data,
      })
      window.localStorage.setItem('user', JSON.stringify(data))
      // console.log(data);
      toast.success('Profile updated successfully !!')
      router.push('/user/profile')
    } catch (err) {
      console.log(err)
      toast.error('Profile update failed. Try later')
      setValues({ ...values, loading: false })
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRatioChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setOrgValues(user)
    setValues(user)
    setImg(user && user.picture)
    console.log(user)
  }, [state])

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  return (
    <UserRoute>
      <div className='flex flex-col justify-center items-start bg-gray-700 text-white font-bold w-full py-[30px] md:py-[50px]'>
        <h1 className='text-2xl pl-10 md:text-4xl'>My Profile</h1>
      </div>
      <div className='flex flex-col w-full items-center justify-center my-5'>
        {values && (
          <>
            <div className='avatar w-[30%] aspect-square max-w-[180px]'>
              <img
                className='rounded-full'
                src={
                  img
                    ? img.Location !== undefined
                      ? img.Location
                      : img
                    : '/guest.png'
                }
              />
            </div>
            <div className='form-control justify-center items-center w-[90%] max-w-xl'>
              <label className='label'>
                <span className='label-text'>Upload a New Profile Image</span>
              </label>
              <input
                type='file'
                className='file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs'
                onChange={handleImage}
                accept='image/*'
              />
            </div>

            <div className='flex flex-col justify-center items-center gap-3 mt-5 w-[90%]'>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='text'
                  name='email'
                  placeholder={values.email}
                  disabled
                  value={values.email}
                  className='input input-bordered !bg-white !text-gray-950 '
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder='Name'
                  onChange={handleChange}
                  value={values.name}
                  className='input input-bordered '
                  disabled={values.loading}
                />
              </div>
              <div className='flex flex-row gap-3'>
                <div className='form-control'>
                  <label className='label cursor-pointer gap-3'>
                    <span className='label-text'>Male</span>
                    <input
                      type='radio'
                      name='gender'
                      className='radio'
                      checked={values.gender === 'male'}
                      value='male'
                      onChange={handleRatioChange}
                      disabled={values.loading}
                    />
                  </label>
                </div>
                <div className='form-control'>
                  <label className='label cursor-pointer gap-3'>
                    <span className='label-text'>Female</span>
                    <input
                      type='radio'
                      name='gender'
                      className='radio'
                      checked={values.gender === 'female'}
                      value='female'
                      onChange={handleRatioChange}
                      disabled={values.loading}
                    />
                  </label>
                </div>
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Age</span>
                </label>
                <select
                  className='select select-bordered'
                  onChange={handleChange}
                  // defaultValue=""
                  name='ageRange'
                  disabled={values.loading}
                  value={values.ageRange}
                >
                  <option value=''>--Choose an age range --</option>
                  <option value='1'>18 to 24</option>
                  <option value='2'>25 to 34</option>
                  <option value='3'>35 to 44</option>
                  <option value='4'>45 to 54</option>
                  <option value='5'>55 to 64</option>
                  <option value='6'>65 or over</option>
                </select>
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Website</span>
                </label>
                {/* <h1>Website</h1> */}
                <input
                  type='text'
                  name='website'
                  placeholder='Url'
                  onChange={handleChange}
                  value={values.website}
                  className='input input-bordered'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Youtube</span>
                </label>
                {/* <h1>Website</h1> */}
                <input
                  type='text'
                  name='youtube'
                  placeholder='Url'
                  onChange={handleChange}
                  value={values.youtube}
                  className='input input-bordered'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Facebook</span>
                </label>
                {/* <h1>Website</h1> */}
                <input
                  type='text'
                  name='facebook'
                  placeholder='Url'
                  onChange={handleChange}
                  value={values.facebook}
                  className='input input-bordered'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Instagram</span>
                </label>
                {/* <h1>Website</h1> */}
                <input
                  type='text'
                  name='instagram'
                  placeholder='Url'
                  onChange={handleChange}
                  value={values.instagram}
                  className='input input-bordered'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Twitter</span>
                </label>
                {/* <h1>Website</h1> */}
                <input
                  type='text'
                  name='twitter'
                  placeholder='Url'
                  onChange={handleChange}
                  value={values.twitter}
                  className='input input-bordered'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Wechat</span>
                </label>
                {/* <h1>Website</h1> */}
                <input
                  type='text'
                  name='wechat'
                  placeholder='Url'
                  onChange={handleChange}
                  value={values.wechat}
                  className='input input-bordered'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Tiktok</span>
                </label>
                {/* <h1>Website</h1> */}
                <input
                  type='text'
                  name='tiktok'
                  placeholder='Url'
                  onChange={handleChange}
                  value={values.tiktok}
                  className='input input-bordered'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Contact Phone Number</span>
                </label>
                {/* <h1>Contact Phone Number</h1> */}
                <input
                  type='text'
                  name='phoneNumber'
                  placeholder='Phone Number'
                  onChange={handleChange}
                  value={values.phoneNumber}
                  className='input input-bordered'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl mx-2'>
                <label className='label'>
                  <span className='label-text'>Biography</span>
                </label>
                {/* <h1>Biography</h1> */}
                <textarea
                  type='text'
                  name='biography'
                  placeholder='A brief description of your background, expertise, and qualifications'
                  onChange={handleChange}
                  value={values.biography}
                  className='textarea textarea-bordered textarea-sm min-h-[8rem] resize-none'
                  disabled={values.loading}
                />
              </div>
              <div className='form-control w-full max-w-xl'>
                <button
                  className='btn btn-secondary'
                  onClick={handleSubmit}
                  disabled={!values.name || orgValues === values}
                >
                  {values.loading ? (
                    <>
                      <span className='loading loading-spinner'></span>
                      loading
                    </>
                  ) : (
                    <>
                      <MdOutlineSaveAlt />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </UserRoute>
  )
}

export default ProfilePage
