'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import LearningCard from './cards/LearningCard';

const MyLearningMenu = ({ topNav }) => {
  const [myLearning, setMyLearning] = useState([]);

  const loadCompletedLessons = async (id) => {
    // console.log(id);
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: id,
    });
    return data;
  };

  const loadCourses = async () => {
    const { data } = await axios.get('/api/user-courses');

    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].lessons.length);
      const completed = await loadCompletedLessons(data[i]._id);
      // console.log(completed.length);
      data[i].completed = completed.length;
    }

    setMyLearning(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className=' justify-start items-center dropdown-content z-[1] menu shadow absolute top-16 bg-base-200 rounded-box w-80 '>
      <div className='max-h-[400px] learningCardList'>
        <LearningCard
          myLearning={myLearning}
          setMyLearning={setMyLearning}
          loadCompletedLessons={loadCompletedLessons}
          loadCourses={loadCourses}
          topNav={topNav}
        />
      </div>
      <div className=' w-full justify-center p-3 border-t-2 border-slate-300'>
        {myLearning.length !== 0 ? (
          <Link href='/user'>
            <button className='btn btn-primary bg-indigo-500 w-full'>
              {topNav.Go_My_Learning}
            </button>
          </Link>
        ) : (
          <Link href='/marketplace'>
            <button className='btn btn-primary bg-indigo-500 w-full'>
              {topNav.Start_Learn}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MyLearningMenu;
