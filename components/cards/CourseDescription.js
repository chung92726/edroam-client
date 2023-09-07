import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const Quill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);

const CourseDescription = ({ detailDescription, courseDetailPage }) => {
  return (
    <div className='flex justify-center item-center pb-5'>
      <div className='w-full lg:max-w-[1080px]'>
        <div className='flex flex-col justify-start mx-10 pt-6 pb-1'>
          <h4 className='text-[20px] font-bold mb-4'>
            {courseDetailPage.Course_Descr}
          </h4>
        </div>
        <Quill
          modules={{
            toolbar: false,
          }}
          theme='snow'
          className='custom-quill-container-none mx-5'
          value={detailDescription}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default CourseDescription;
