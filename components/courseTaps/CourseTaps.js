'use client'

import { use, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import Overview from './Overview'
import LectureNotes from './LectureNotes'
import Quiz from './Quiz'
import QandA from './QandA'
import LessonContentCard from '../cards/LessonContentCard'
import CourseReviews from './CourseReviews'

const { children } = Tabs






const CourseTaps = ({ course, currentLesson, slug, courseTaps, readMore, allRate }) => {
  const [tap, setTap] = useState('1')

  const [isDisable, setIsDisable] = useState(false)

  const tapTitle = [
    courseTaps.overview_tap.title,
    courseTaps.content_tap.title,
    courseTaps.supplementary_res_tap.title,
    courseTaps.quiz_tap.title,
    courseTaps.qa_tap.title,
    courseTaps.reviews_tap.title,
  ]

  useEffect(() => {
    const tab2Disable = !course.lessons[currentLesson].video

    setIsDisable(tab2Disable)
    setTap('1')
  }, [course.lessons, currentLesson])

  const onChange = (key) => {
    setTap(key.toString())
  }
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
          const id = String(i + 1)
          // const tab2Disable = id === '2' && isDisable ? true : false;
          return (
            <Tabs.TabPane
              tab={tap}
              key={id}
              disabled={id === '2' && isDisable}
            />
          )
        })}
      </Tabs>
      {tap === '1' && <Overview course={course} overview_tap={courseTaps.overview_tap}/>}
      {tap === '2' && (
        <LessonContentCard
          content={course.lessons[currentLesson].content}
          course={course}
          currentLesson={currentLesson}
          content_tap = {courseTaps.content_tap}
        />
      )}
      {tap === '3' && (
        <LectureNotes course={course} currentLesson={currentLesson} supplementary_res_tap = {courseTaps.supplementary_res_tap}/>
      )}
      {tap === '4' && (
        <Quiz course={course} currentLesson={currentLesson} slug={slug} quiz_tap={courseTaps.quiz_tap}/>
      )}
      {tap === '5' && <QandA course={course} currentLesson={currentLesson} qa_tap={courseTaps.qa_tap} />}
      {tap === '6' && (
        <CourseReviews course={course} currentLesson={currentLesson} reviews_tap = {courseTaps.reviews_tap} readMore = {readMore} allRate={allRate}/>
      )}
    </div>
  )
}

export default CourseTaps
