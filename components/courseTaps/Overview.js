import Link from 'next/link';
import React from 'react';

const Overview = ({ course, overview_tap }) => {
  return (
    <div className='flex flex-col mx-4'>
      <div className='border-b-2'>
        <h1 className='font-bold text-[22px] my-2'>{overview_tap.about}</h1>
        <h2 className='font-bold text-[18px] my-2 max-w-2xl'>{course.name}</h2>
        <p className='text-[14px] my-2 max-w-2xl'>{course.description}</p>
        <p className='text-[14px] my-2'>Lessons: {course.lessons.length}</p>
        <p className='text-[14px] my-2'>
          {overview_tap.createAt}{new Date(course.createdAt).toLocaleDateString()}
        </p>
        <p className='text-[14px] my-2'>
          {overview_tap.updateAt}{new Date(course.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className='border-b-2'>
        <h1 className='font-bold text-[22px] my-2'>
          {overview_tap.instructor}
        </h1>
        <div className='flex flex-row justify-start items-center my-3 gap-3'>
          <img
            src={course.instructor.picture}
            alt='instructor'
            className='w-[50px] h-[50px] rounded-full'
          />
          <div className='flex flex-col'>
            <Link
              href={`/instructor-details/${course.instructor._id}`}
              className='underline underline-offset-1 text-gray-800'
            >
              <h2 className='font-bold text-[18px] '>
                {course.instructor.name}
              </h2>
            </Link>
            <p>Web Developer</p>
          </div>
        </div>
        <p className='my-2 w-full max-w-2xl'>
          Chung is a Web Developer from Sydney, Australia. He builds Web apps
          using JavaScript, Node JS, React JS, Vue JS, Laravel and other
          emerging platforms. He also wants to make the entire Web Development
          process enjoyable and productive at the same time by producing well
          explained practical Tutorials and Training packages for fellow
          developers.
        </p>
      </div>
    </div>
  );
};

export default Overview;
