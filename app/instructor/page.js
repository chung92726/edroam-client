'use client';

import { useState, useEffect } from 'react';

import axios from 'axios';
import InstructorRoute from '@/components/routes/InstructorRoute';
import Link from 'next/link';
import { toast } from 'react-toastify';

const InstructorIndex = () => {
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
    let answer = window.confirm(
      'Once you publish your course, it will be live in the marketplace for students to enroll. Are you sure you want to publish this course?'
    );
    if (!answer) return;
    try {
      const { data } = await axios.put(`/api/course/publish/${courseId}`);

      toast.success('Course Published');
      loadCourses();
    } catch (err) {
      toast.error(`Course Publish Failed, ${err.response.data}`);
    }
  };

  const handleUnpublish = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();
    let answer = window.confirm(
      'Once you unpublish your course, it will no longer be live in the marketplace for students to enroll. Are you sure you want to unpublish this course?'
    );
    if (!answer) return;
    try {
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);

      toast.success('Course Unpublished');
      loadCourses();
    } catch (err) {
      toast.error('Course Unpublish Failed');
    }
  };
  return (
    <div>
      <div className='flex flex-col justify-center items-start bg-gray-700 text-white font-bold w-full py-[30px] md:py-[50px]'>
        <h1 className='text-2xl pl-10 md:text-4xl'>My Courses</h1>
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
                      ? 'Published'
                      : course.lessons.length >= 5
                      ? 'Ready to Publish'
                      : `${5 - course.lessons.length} more lessons to publish`}
                  </div>
                  <h2 className='card-title'>{course.name}</h2>
                  <p className='grow-0'>
                    {course.lessons.length} lessons in this course
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
                            {c.label}
                          </div>
                        ))}
                  </div>
                  <div className='card-actions justify-end'>
                    <div
                      className={`badge ${
                        course.paid == true ? 'badge-success' : 'badge-info'
                      }`}
                    >
                      {course.paid == true ? 'Paid Course' : 'Free Course'}
                    </div>
                  </div>
                  <div className='justify-start card-actions'>
                    {course.published ? (
                      <button
                        className='btn btn-accent'
                        onClick={(e) => handleUnpublish(e, course._id)}
                      >
                        Unpublish Course
                      </button>
                    ) : (
                      <button
                        className='btn btn-accent'
                        disabled={course.lessons.length < 5 ? true : false}
                        onClick={(e) => handlePublish(e, course._id)}
                      >
                        Publish Course
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
