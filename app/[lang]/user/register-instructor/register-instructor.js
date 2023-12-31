'use client';

import axios from 'axios';
import { useContext, useEffect, useState, useRef } from 'react';
import { Context } from '@/context';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import { useRouter } from 'next/navigation';
import { MdOutlineSaveAlt } from 'react-icons/md';
import Link from 'next/link';

const RegisterInstructor = ({ userRegInstructorPage }) => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [img, setImg] = useState('');
  const [values, setValues] = useState({
    picture: {},
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
    // address: "",
    biography: '',
    courseDetails: '',
    teachingExperience: '',
    loading: false,
  });

  const router = useRouter();

  const handleImage = (e) => {
    let file = e.target.files[0];
    Resizer.imageFileResizer(file, 180, 180, 'JPEG', 100, 0, async (url) => {
      setImg(url);
    });
    // setImg(file && window.URL.createObjectURL(file));
    setValues({ ...values, picture: img });
  };

  const removeImg = async (img) => {
    try {
      const res = await axios.post('/api/course/remove-image', {
        image: img,
      });
      // setValues({ ...values, uploading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, uploading: false });
      // toast.error("Image Remove failed. Try later");
    }
  };

  const uploadImg = async (img) => {
    try {
      let { data } = await axios.post('/api/course/upload-image', {
        image: img,
      });
      // console.log("Image uploaded", data);
      setValues({ ...values, uploading: false });
      return data;
      // toast.success("Image uploaded");
    } catch (err) {
      console.log(err);
      setValues({ ...values, uploading: false });
      // toast.error("Image upload failed. Try later");
    }
  };

  const handleSubmit = async () => {
    let s3Img;
    if (img && img !== user.picture) {
      setValues({ ...values, uploading: true });

      if (user.picture?.Bucket) {
        await removeImg(user.picture);
      }
      s3Img = await uploadImg(img);
    }

    try {
      if (!validateFields()) return;
      const { data } = await axios.post('/api/user/updateInstructorInfo', {
        ...values,
        picture: s3Img ? s3Img : user.picture,
      });
      setValues({ ...values, loading: false, picture: s3Img });
      dispatch({
        type: 'UPDATE',
        payload: data,
      });
      window.localStorage.setItem('user', JSON.stringify(data));
      // console.log(data);
      toast.success(`${userRegInstructorPage.toast_updated}`);
      router.push('/user/create-stripe');
    } catch (err) {
      console.log(err);
      toast.error(`${userRegInstructorPage.toast_failed}`);
      setValues({ ...values, loading: false });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRatioChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setValues({ ...values, ...user });
    setImg(user && user.picture);
    // console.log(user)
    if (user?.role.includes('Instructor') || user?.role.includes('Pending'))
      router.push('/');
  }, [state]);

  const [ok, setOk] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/current-user');
        // console.log(data)
        if (data.ok) setOk(true);
      } catch (err) {
        console.log(err);
        router.push('/login');
      }
    };
    fetchUser();
  }, []);

  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const biographyRef = useRef(null);
  const courseDetailsRef = useRef(null);
  const teachingExperienceRef = useRef(null);

  const validateFields = () => {
    let newErrors = {};

    // Check if each required field has a value, and if not, add an error
    if (!values.name) newErrors.name = true;
    if (!values.phoneNumber) newErrors.phoneNumber = true;
    if (!values.biography) newErrors.biography = true;
    if (!values.courseDetails) newErrors.courseDetails = true;
    if (!values.teachingExperience) newErrors.teachingExperience = true;

    setErrors(newErrors);

    // Scroll to the first error field and adjust to center
    const scrollToCenter = (ref) => {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      const elementTop = ref.current.getBoundingClientRect().top;
      const offset = window.innerHeight / 2;
      window.scrollBy({ top: elementTop - offset, behavior: 'smooth' });
    };

    // Scroll to the first error field
    if (newErrors.name) scrollToCenter(nameRef);
    else if (newErrors.phoneNumber) scrollToCenter(phoneNumberRef);
    else if (newErrors.biography) scrollToCenter(biographyRef);
    else if (newErrors.courseDetails) scrollToCenter(courseDetailsRef);
    else if (newErrors.teachingExperience)
      scrollToCenter(teachingExperienceRef);

    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   console.log(values)
  //   // console.log(img)
  // }, [values])

  return (
    <div className='flex flex-col w-full items-center justify-center my-5'>
      {ok && values && (
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
              <span className='label-text'>
                {userRegInstructorPage.Upload_ProfileImg}
              </span>
            </label>
            <input
              type='file'
              className='file-input file-input-bordered file-input-secondary file-input-sm w-full max-w-xs'
              onChange={handleImage}
              accept='image/*'
              disabled={values.loading}
            />
          </div>

          <div className='flex flex-col justify-center items-center gap-3 mt-5 w-[90%]'>
            <p>{userRegInstructorPage.Notice}</p>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Email}
                </span>
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
            {/* <h1>Name</h1> */}
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>{userRegInstructorPage.Name}</span>
              </label>
              <input
                type='text'
                name='name'
                placeholder='Name'
                ref={nameRef}
                onChange={handleChange}
                value={values.name}
                className={
                  errors.name
                    ? 'input input-bordered input-error'
                    : 'input input-bordered'
                }
                disabled={values.loading}
              />
            </div>
            {/* <h1>Gender</h1> */}
            <div className='flex flex-row gap-3'>
              <div className='form-control'>
                <label className='label cursor-pointer gap-3'>
                  <span className='label-text'>
                    {userRegInstructorPage.Male}
                  </span>
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
                  <span className='label-text'>
                    {userRegInstructorPage.Female}
                  </span>
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
                <span className='label-text'>{userRegInstructorPage.Age}</span>
              </label>
              <select
                className='select select-bordered'
                onChange={handleChange}
                // defaultValue=""
                name='ageRange'
                disabled={values.loading}
                value={values.ageRange}
              >
                <option disabled value=''>
                  {userRegInstructorPage.ChooseAge}
                </option>
                <option value='1'>18 {userRegInstructorPage.To} 24</option>
                <option value='2'>25 {userRegInstructorPage.To} 34</option>
                <option value='3'>35 {userRegInstructorPage.To} 44</option>
                <option value='4'>45 {userRegInstructorPage.To} 54</option>
                <option value='5'>55 {userRegInstructorPage.To} 64</option>
                <option value='6'>65 {userRegInstructorPage.Over}</option>
              </select>
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Website}
                </span>
              </label>
              {/* <h1>Website</h1> */}
              <input
                type='text'
                name='website'
                placeholder={`${userRegInstructorPage.Placeholder_eg} www.x-learner.com`}
                onChange={handleChange}
                value={values.website}
                className='input input-bordered'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Youtube}
                </span>
              </label>
              {/* <h1>Website</h1> */}
              <input
                type='text'
                name='youtube'
                placeholder={`${userRegInstructorPage.Placeholder_eg} www.youtube.com/@username`}
                onChange={handleChange}
                value={values.youtube}
                className='input input-bordered'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Facebook}
                </span>
              </label>
              {/* <h1>Website</h1> */}
              <input
                type='text'
                name='facebook'
                placeholder={`${userRegInstructorPage.Placeholder_eg} www.facebook.com/username`}
                onChange={handleChange}
                value={values.facebook}
                className='input input-bordered'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Instagram}
                </span>
              </label>
              {/* <h1>Website</h1> */}
              <input
                type='text'
                name='instagram'
                placeholder={`${userRegInstructorPage.Placeholder_eg} www.instagram/username`}
                onChange={handleChange}
                value={values.instagram}
                className='input input-bordered'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Twitter}
                </span>
              </label>
              {/* <h1>Website</h1> */}
              <input
                type='text'
                name='twitter'
                placeholder={`${userRegInstructorPage.Placeholder_eg} www.twitter.com/username`}
                onChange={handleChange}
                value={values.twitter}
                className='input input-bordered'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Wechat}
                </span>
              </label>
              {/* <h1>Website</h1> */}
              <input
                type='text'
                name='wechat'
                placeholder={userRegInstructorPage.WechatId}
                onChange={handleChange}
                value={values.wechat}
                className='input input-bordered'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Tiktok}
                </span>
              </label>
              {/* <h1>Website</h1> */}
              <input
                type='text'
                name='tiktok'
                placeholder={`${userRegInstructorPage.Placeholder_eg} www.tiktok.com/@username`}
                onChange={handleChange}
                value={values.tiktok}
                className='input input-bordered'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Contact_no}
                </span>
              </label>
              {/* <h1>Contact Phone Number</h1> */}
              <input
                type='text'
                name='phoneNumber'
                placeholder={`${userRegInstructorPage.Placeholder_eg} +852 12345678`}
                ref={phoneNumberRef}
                onChange={handleChange}
                value={values.phoneNumber}
                className={
                  errors.phoneNumber
                    ? 'input input-bordered input-error'
                    : 'input input-bordered'
                }
                disabled={values.loading}
              />
            </div>
            {/* <h1>Contact Address</h1>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={values.address}
            className="input input-bordered w-full max-w-xl mx-2"
          /> */}
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>{userRegInstructorPage.Bio}</span>
              </label>
              {/* <h1>Biography</h1> */}
              <textarea
                type='text'
                name='biography'
                placeholder={userRegInstructorPage.Bio_Placeholder}
                ref={biographyRef}
                onChange={handleChange}
                value={values.biography}
                className={
                  errors.biography
                    ? 'textarea textarea-bordered textarea-sm min-h-[8rem] resize-none textarea-error'
                    : 'textarea textarea-bordered textarea-sm min-h-[8rem] resize-none'
                }
                // className='textarea textarea-bordered textarea-sm min-h-[8rem] resize-none'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.TeachExp}
                </span>
              </label>
              {/* <h1>Teaching experience</h1> */}
              <textarea
                type='text'
                name='teachingExperience'
                placeholder={userRegInstructorPage.TeachExp_Placeholder}
                ref={teachingExperienceRef}
                onChange={handleChange}
                value={values.teachingExperience}
                className={
                  errors.teachingExperience
                    ? 'textarea textarea-bordered textarea-sm min-h-[8rem] resize-none textarea-error'
                    : 'textarea textarea-bordered textarea-sm min-h-[8rem] resize-none'
                }
                // className='textarea textarea-bordered textarea-sm min-h-[8rem] resize-none'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl mx-2'>
              <label className='label'>
                <span className='label-text'>
                  {userRegInstructorPage.Course_Detail}
                </span>
              </label>
              {/* <h1>Course Details</h1> */}
              <textarea
                type='text'
                name='courseDetails'
                placeholder={userRegInstructorPage.Course_Detail_Placeholder}
                ref={courseDetailsRef}
                onChange={handleChange}
                value={values.courseDetails}
                className={
                  errors.courseDetails
                    ? 'textarea textarea-bordered textarea-sm min-h-[8rem] resize-none textarea-error'
                    : 'textarea textarea-bordered textarea-sm min-h-[8rem] resize-none'
                }
                // className='textarea textarea-bordered textarea-sm min-h-[8rem] resize-none'
                disabled={values.loading}
              />
            </div>
            <div className='form-control w-full max-w-xl'>
              <button
                className='btn btn-secondary'
                onClick={handleSubmit}
                // disabled={
                //   !values.name ||
                //   !values.gender ||
                //   !values.ageRange ||
                //   !values.website ||
                //   !values.phoneNumber ||
                //   !values.biography ||
                //   !values.teachingExperience ||
                //   !values.courseDetails ||
                //   !img
                // }
              >
                {values.loading ? (
                  <>
                    <span className='loading loading-spinner'></span>
                    {userRegInstructorPage.Loading}
                  </>
                ) : (
                  <>{userRegInstructorPage.Continue}</>
                )}
              </button>
            </div>
            <div className='flex '>
              <p className='text-[12px]'>
                By registering as an Instructor, you agree to the
              </p>
              &nbsp;
              <Link
                href='/user/instructor-agreement'
                className='text-[12px] link link-primary'
              >
                Instructor Agreement
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterInstructor;
