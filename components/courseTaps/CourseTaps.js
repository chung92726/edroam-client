'use client';

import { use, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Overview from './Overview';
import LectureNotes from './LectureNotes';
import Quiz from './Quiz';
import QandA from './QandA';
import LessonContentCard from '../cards/LessonContentCard';

const { children } = Tabs;
const tapTitle = [
  'Course Details',
  'Lesson Content',
  'Supplementary Resources',
  'Quiz',
  'Q&A',
];

const CourseTaps = ({ course, currentLesson, slug }) => {
  const [tap, setTap] = useState('1');

  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const tab2Disable = !course.lessons[currentLesson].video;

    setIsDisable(tab2Disable);
    setTap('1');
  }, [course.lessons, currentLesson]);

  const onChange = (key) => {
    setTap(key.toString());
  };
  return (
    <div className='mx-8 my-2 max-md:mx-2'>
      <Tabs
        activeKey={tap}
        onChange={onChange}
        style={{ fontSize: '14px', fontWeight: 'bold' }}
        // items={tapTitle.map((tap, i) => {
        //   const id = String(i + 1);
        //   const isDisabled = id === '2' && tab2Disable ? 'true' : 'false';
        //   return {
        //     label: tap,
        //     key: id,
        //     disabled: { isDisabled },
        //   };
        // })}
      >
        {tapTitle.map((tap, i) => {
          const id = String(i + 1);
          // const tab2Disable = id === '2' && isDisable ? true : false;
          return (
            <Tabs.TabPane
              tab={tap}
              key={id}
              disabled={id === '2' && isDisable}
            />
          );
        })}
      </Tabs>
      {tap === '1' && <Overview course={course} />}
      {tap === '2' && (
        <LessonContentCard
          content={course.lessons[currentLesson].content}
          course={course}
          currentLesson={currentLesson}
        />
      )}
      {tap === '3' && (
        <LectureNotes course={course} currentLesson={currentLesson} />
      )}
      {tap === '4' && (
        <Quiz course={course} currentLesson={currentLesson} slug={slug} />
      )}
      {tap === '5' && <QandA course={course} currentLesson={currentLesson} />}
    </div>
  );
};

export default CourseTaps;
