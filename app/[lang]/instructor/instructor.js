'use client';

import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import InstructorRoute from '@/components/routes/InstructorRoute';

const InstructorIndex = ({ instructorPage, allCat }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get('/api/instructor-courses');
    setCourses(data);
  };

  const handlePublish = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();
    let answer = window.confirm(`${instructorPage.toast_confirm}`);
    if (!answer) return;
    try {
      const { data } = await axios.put(`/api/course/publish/${courseId}`);

      toast.success(`${instructorPage.toast_success}`);
      loadCourses();
    } catch (err) {
      toast.error(`${instructorPage.toast_fail}, ${err.response.data}`);
    }
  };

  const handleUnpublish = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();
    let answer = window.confirm(`${instructorPage.toast_confirm_un}`);
    if (!answer) return;
    try {
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);

      toast.success(`${instructorPage.toast_success_un}`);
      loadCourses();
    } catch (err) {
      toast.error(`${instructorPage.toast_fail_un}`);
    }
  };
  return (
    <div>
      <div className='flex flex-col justify-center items-start bg-gray-700 text-white font-bold w-full py-[30px] md:py-[50px]'>
        <h1 className='text-2xl pl-10 md:text-4xl'>{instructorPage.Title}</h1>
      </div>
      <div className='flex flex-wrap flex-row justify-center items-center mt-10 mb-5 gap-4'>
        {courses &&
          courses.map((course) => (
            <Link href={`/instructor/course/view/${course.slug}`} passHref>
              <div className='card w-[23rem] h-[560px] bg-base-100 shadow-xl max-sm:w-[18rem]'>
                <figure>
                  <img
                    src={course.image ? course.image.Location : '/course.png'}
                    alt='CoursePic'
                    className='h-48 mt-4'
                  />
                </figure>
                <div className='card-body px-4 justify-between'>
                  <div
                    className={`badge ${
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
                      ? `${instructorPage.Ready}`
                      : `${5 - course.lessons.length} ${
                          instructorPage.More_Lessons
                        }`}
                  </div>
                  <h2 className='card-title'>{course.name}</h2>
                  <p className='grow-0'>
                    {course.lessons.length}
                    {instructorPage.Lesson}
                  </p>
                  {/* <p>{course.description}</p> */}
                  <div className='card-actions justify-end items-stretch gap-0'>
                    {course.category &&
                      course.category
                        // .split(' ')
                        .map((c) => (
                          <div
                            key={c.value}
                            className='badge badge-warning ml-1 mb-2'
                          >
                            {allCat[c.label]}
                          </div>
                        ))}
                  </div>
                  <div className='card-actions justify-end'>
                    <div
                      className={`badge ${
                        course.paid == true ? 'badge-success' : 'badge-info'
                      }`}
                    >
                      {course.paid == true
                        ? `${instructorPage.Paid}`
                        : `${instructorPage.Free}`}
                    </div>
                  </div>
                  <div className='justify-start card-actions'>
                    {course.published ? (
                      <button
                        className='btn btn-accent'
                        onClick={(e) => handleUnpublish(e, course._id)}
                      >
                        {instructorPage.Unpublish}
                      </button>
                    ) : (
                      <button
                        className='btn btn-accent'
                        disabled={course.lessons.length < 5 ? true : false}
                        onClick={(e) => handlePublish(e, course._id)}
                      >
                        {instructorPage.Publish_Course}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default InstructorIndex;
