'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ReactMarkDown from 'react-markdown';
import AddLessonForm from '@/components/form/AddLessonForm';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { AiFillEdit } from 'react-icons/ai';
import { generateCourseDirectLink, copyToClipboard } from '@/utils/helpers';
import { calculateVideoDuration, formatDuration } from '@/utils/helpers';
import { FaPhotoVideo } from 'react-icons/fa';

const CourseView = ({
  params,
  instructorViewPage,
  instructorPage,
  addLessonForm,
}) => {
  const [course, setCourse] = useState('');
  const video_input = useRef();
  const router = useRouter();
  const supplementary_input = useRef();
  const [directLink, setDirectLink] = useState('');
  const { slug } = params;
  useEffect(() => {
    loadCourse();
  }, [slug]);

  // function for adding lessons
  const [values, setValues] = useState({
    title: '',
    content: '',
    video: {},
    duration: 1,
    uploading: false,
    free_preview: false,
    supplementary_resources: [],
  });
  const [progress, setProgress] = useState(0);
  const [supplementary, setSupplementary] = useState({
    title: '',
    file: {},
    description: '',
    file_type: 'pdf',
    uploading: false,
  });
  const handleCopyClick = () => {
    copyToClipboard(directLink);
    toast.success(`${instructorViewPage.toast_success_copy}`);
  };
  const generateDirectLink = () => {
    setDirectLink(generateCourseDirectLink(course.slug, course.referralCode));
  };

  const handleAddLesson = async (e) => {
    // e.preventDefault()

    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({
        // ...values,
        title: '',
        content: '<p><br></p>',
        video: {},
        uploading: false,
        free_preview: false,
        duration: 1,
        supplementary_resources: [],
      });
      setProgress(0);
      setCourse(data);
      toast.success(`${instructorViewPage.toast_success_add}`);
      video_input.current.value = '';
      window.my_modal.close();
    } catch (err) {
      console.log(err);
      toast.error(`${instructorViewPage.toast_fail_create}`);
    }
  };

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/course/${slug}`);
      console.log(data);
      setCourse(data);
      // console.log(data.lessons.length)
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideo = async (e) => {
    setValues({ ...values, uploading: true });
    try {
      const file = e.target.files[0];
      const durationInMinutes = await calculateVideoDuration(file);
      const videoData = new FormData();
      videoData.append('video', file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) =>
            setProgress(Math.round((100 * e.loaded) / e.total)),
        }
      );
      // once response is received
      toast.success(`${instructorViewPage.toast_success_video}`);

      setValues({
        ...values,
        uploading: false,
        video: data,
        duration: durationInMinutes,
      });
    } catch (err) {
      console.log(err);
      toast.error(`${instructorViewPage.toast_fail_video}`);
      setValues({ ...values, uploading: false });
    }
  };

  const handleVideoRemove = async () => {
    setValues({ ...values, uploading: true });
    try {
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      video_input.current.value = '';
      setValues({ ...values, uploading: false, video: {}, duration: 1 });
      setProgress(0);
      toast.success(`${instructorViewPage.toast_success_remove}`);
    } catch (err) {
      console.log(err);
      toast.error(`${instructorViewPage.toast_fail_remove}`);
      setValues({ ...values, uploading: false });
    }
  };

  const handleAddSupplementary = async (e) => {
    e.preventDefault();
    setSupplementary({ ...supplementary, uploading: true });
    try {
      const file = e.target.files[0];
      const suppleMentaryData = new FormData();
      suppleMentaryData.append('supplementary', file);
      const { data } = await axios.post(
        `/api/course/supplementary-upload/${course.instructor._id}`,
        suppleMentaryData
      );
      setSupplementary({
        ...supplementary,
        uploading: false,
        file: data,
      });
      toast.success(`${instructorViewPage.toast_success_sup}`);
    } catch (err) {
      toast.error(`${instructorViewPage.toast_fail_sup}`);
      setSupplementary({ ...supplementary, uploading: false });
    }
  };

  const handleSupplementary = async (e) => {
    setValues({
      ...values,
      supplementary_resources: [
        ...values.supplementary_resources,
        supplementary,
      ],
    });
    supplementary_input.current.value = '';
    setSupplementary({
      title: '',
      file: {},
      description: '',
      file_type: 'pdf',
      uploading: false,
    });
  };

  const handleSupplementaryRemove = async (index) => {
    try {
      const { data } = await axios.post(
        `/api/course/supplementary-remove/${course.instructor._id}`,
        values.supplementary_resources[index].file
      );
      let allSupplementary = values.supplementary_resources;
      let filtered = allSupplementary.filter((item, i) => i !== index);
      setValues({ ...values, supplementary_resources: filtered });
      toast.success(`${instructorViewPage.toast_success_sup_remove}`);
    } catch (err) {
      console.log(err);
      toast.error(`${instructorViewPage.toast_fail_sup_remove}`);
    }
  };

  const handlePublish = async (e, courseId) => {
    let answer = window.confirm(`${instructorPage.toast_confirm}`);
    if (!answer) return;
    try {
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast.success(`${instructorPage.toast_success}`);
    } catch (err) {
      console.log(err);
      toast.error(`${instructorPage.toast_fail}, ${err.response.data}`);
    }
  };

  const handleUnpublish = async (e, courseId) => {
    let answer = window.confirm(`${instructorPage.toast_confirm_un}`);
    if (!answer) return;
    try {
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast.success(`${instructorPage.toast_success_un}`);
    } catch (err) {
      toast.error(`${instructorPage.toast_fail_un}`);
    }
  };

  // student count
  const [studentCount, setStudentCount] = useState(0);

  const getStudentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    setStudentCount(data.length);
  };

  //total Revenue
  const [totalRevenue, setTotalRevenue] = useState(0);

  const getTotalRevanue = async () => {
    const { data } = await axios.get(`/api/instructor/revenue/${course._id}`);
    setTotalRevenue(data.totalRevenue);
  };

  useEffect(() => {
    course && getStudentCount();
    course && getTotalRevanue();
    course && generateDirectLink();
    // console.log(totalRevenue)
  }, [course]);

  // useEffect(() => {
  //   console.log(values)
  // }, [values])

  return (
    <>
      {course && (
        <div className='flex flex-col items-center mb-10 mt-5 overflow-hidden'>
          <div className='card-side w-11/12 max-w-screen-lg lg:card-side bg-base-100 shadow-xl mt-6 pt-5 rounded-xl'>
            <dialog id='my_modal' className='modal'>
              <form method='dialog' className='modal-box relative'>
                <div className='flex justify-end text-red-600 mb-4'>
                  <AiOutlineCloseCircle
                    size={25}
                    className='cursor-pointer'
                    onClick={() => window.my_modal.close()}
                  />
                </div>
                <AddLessonForm
                  values={values}
                  setValues={setValues}
                  handleAddLesson={handleAddLesson}
                  handleVideo={handleVideo}
                  progress={progress}
                  handleVideoRemove={handleVideoRemove}
                  video_input={video_input}
                  supplementary={supplementary}
                  setSupplementary={setSupplementary}
                  handleAddSupplementary={handleAddSupplementary}
                  supplementary_input={supplementary_input}
                  handleSupplementary={handleSupplementary}
                  handleSupplementaryRemove={handleSupplementaryRemove}
                  addLessonForm={addLessonForm}
                />
              </form>
              <form method='dialog' className='modal-backdrop'></form>
            </dialog>
            <figure className='w-full pr-0 md:pr-4 rounded flex justify-center items-center'>
              <img
                src={course.image ? course.image.Location : '/course.png'}
                alt='CoursePic'
                className='rounded w-full md:w-6/12'
              />
            </figure>
            <div className='card-body p-4 '>
              <div className='w-full flex justify-between '>
                <div
                  className={`badge  ${
                    course.published
                      ? 'badge-success'
                      : course.lessons.length > 5
                      ? 'badge-info'
                      : 'badge-error'
                  }`}
                >
                  {course.published
                    ? `${instructorPage.Publish}`
                    : course.lessons.length >= 5
                    ? `${instructorPage.Publish}`
                    : `${5 - course.lessons.length} ${
                        instructorPage.More_Lessons
                      }`}
                </div>

                <div
                  className='tooltip cursor-pointer'
                  data-tip={instructorViewPage.EditCourse}
                  onClick={() => router.push(`/instructor/course/edit/${slug}`)}
                >
                  <AiFillEdit size={25} className='mx-4' />
                </div>
              </div>
              {course?.mainPreview?.video?.Key ? (
                <></>
              ) : (
                <div className='badge badge-error'>
                  {instructorViewPage.Warning}
                </div>
              )}
              <div className='stats shadow my-5 text-blue-500 max-md:flex max-md:flex-col max-md:divide-y max-md:divide-blue-100 max-md:divide-x-0'>
                <div className='stat place-items-center '>
                  <div className='stat-title'>
                    {instructorViewPage.Enrolled}
                  </div>
                  <div className='stat-value max-sm:text-'>{studentCount}</div>
                  {/* <div className='stat-desc'>
                    From January 1st to February 1st
                  </div> */}
                </div>

                <div className='stat place-items-center'>
                  <div className='stat-title'>{instructorViewPage.Revenue}</div>
                  <div className='stat-value '>{totalRevenue}</div>
                  {/* <div className='stat-desc '>↗︎ 40 (2%)</div> */}
                </div>
              </div>
              {/* <h1 className='card-title mt-2'>Course Name:</h1> */}
              <h1 className='font-bold text-[16px]'>
                {instructorViewPage.TotalDuration}
                {Math.floor(course.totalDuration)} {instructorViewPage.Minutes}
              </h1>
              {course && course.published && (
                <div className='rounded-lg border-2 px-4 py-2 bg-slate-200'>
                  <h2 className='font-bold text-[18px] my-2'>
                    {instructorViewPage.DirectLink}
                  </h2>
                  <div className='flex flex-row justify-between items-center my-4'>
                    <input
                      type='text'
                      readOnly
                      value={directLink}
                      className='w-11/12 bg-slate-400 font-bold rounded-lg py-3 px-2 border-2 text-white'
                    />
                    <button
                      onClick={handleCopyClick}
                      className='btn btn-primary mx-2'
                    >
                      {instructorViewPage.Copy}
                    </button>
                  </div>
                </div>
              )}
              <h1 className='card-title mt-2 text-[18px]'>{course.name}</h1>
              {/* <h1 className='card-title mt-2'>Course Short Description:</h1> */}
              <div className='py-6'>{course.description}</div>
              <div className='flex flex-col md:flex-row justify-start md:items-end h-full'>
                <div className='justify-start card-actions mx-2'>
                  <button
                    className='btn btn-info max-md:w-full max-md:mb-2'
                    onClick={() => window.my_modal.showModal()}
                  >
                    {addLessonForm.AddLesson}
                  </button>
                </div>
                <div className='justify-start card-actions mx-2'>
                  {course.published ? (
                    <button
                      className='btn btn-accent max-md:w-full'
                      onClick={(e) => handleUnpublish(e, course._id)}
                    >
                      {instructorPage.Unpublish}
                    </button>
                  ) : (
                    <button
                      className='btn btn-accent max-md:w-full'
                      disabled={
                        course.lessons.length < 5 && !course?.mainPreview?.video
                          ? true
                          : false
                      }
                      onClick={(e) => handlePublish(e, course._id)}
                    >
                      {instructorPage.Publish_Course}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
          <div className=' w-full  max-w-screen-lg mt-16 max-xl:px-4'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-bold'>{`${course.lessons.length}${instructorViewPage.Lesson}`}</h1>
              <div
                className='tooltip tooltip-left cursor-pointer'
                data-tip={instructorViewPage.EditLesson}
                onClick={() =>
                  router.push(`/instructor/course/edit/lesson/${slug}`)
                }
              >
                <AiFillEdit size={25} className='mx-4' />
              </div>
            </div>
            {course.lessons.map((lesson, index) => (
              <div
                tabIndex={index}
                className='border-b-2 border-base-200 mt-4 rounded-md bg-white hover:disabled'
              >
                {/* <input type='checkbox' /> */}
                <div className='collapse-title text-xl font-medium flex w-full pr-0'>
                  <div className='flex flex-col items-start sm:flex-row sm:items-center justify-between w-full'>
                    <div className='flex items-center'>
                      <div className='avatar placeholder'>
                        <div className='w-8 rounded-full bg-base-200 text-black'>
                          <span className='text-[14px]'>{index + 1}</span>
                        </div>
                      </div>
                      <div className='flex flex-col justify-start items-start'>
                        <p className='mx-2 md:mx-8 text-[14px] md:text-[16px] break-all max-md:overflow-x-hidden '>
                          {lesson.title}
                        </p>
                        <p className='mx-2 md:mx-8 text-[14px] md:text-[16px] break-all max-md:overflow-x-hidden '>
                          {lesson.video ? (
                            <div className='flex justify-start items-center gap-2'>
                              <span className='text-gray-400'>
                                {formatDuration(lesson.duration)}
                              </span>
                              <FaPhotoVideo className='mx-2' />
                            </div>
                          ) : (
                            <span className='text-gray-400'>
                              {Math.ceil(lesson.duration)}
                              {instructorViewPage.Minutes}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    {course?.mainPreview?.video?.Key !== undefined &&
                    course?.mainPreview?.video?.Key === lesson?.video?.Key ? (
                      <div className='badge badge-error gap-2 min-w-[110px] mr-2  max-sm:ml-10 max-sm:mt-2'>
                        {instructorViewPage.MainPreview}
                      </div>
                    ) : lesson.free_preview ? (
                      <div className='badge badge-info gap-2 min-w-[110px] mr-2  max-sm:ml-10 max-sm:mt-2'>
                        {instructorViewPage.FreeLesson}
                      </div>
                    ) : (
                      <div className='badge badge-success gap-2 min-w-[110px] mr-2 max-sm:ml-10 max-sm:mt-2'>
                        {instructorViewPage.PaidLesson}
                      </div>
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
      )}
    </>
  );
};

export default CourseView;
