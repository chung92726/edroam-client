'use client'

import { useState } from 'react'
import { Tabs } from 'antd'
import Overview from './Overview'
import LectureNotes from './LectureNotes'
import Quiz from './Quiz'
import QandA from './QandA'

const { children } = Tabs
const tapTitle = ['Course Details', 'Supplementary Resources', 'Quiz', 'Q&A']

const CourseTaps = ({ course, currentLesson, slug }) => {
  const [tap, setTap] = useState('1')
  const onChange = (key) => {
    setTap(key.toString())
  }
  return (
    <div className='mx-8 my-2'>
      <Tabs
        onChange={onChange}
        style={{ fontSize: '14px', fontWeight: 'bold' }}
        items={tapTitle.map((tap, i) => {
          const id = String(i + 1)
          return {
            label: tap,
            key: id,
          }
        })}
      />
      {tap === '1' && <Overview course={course} />}
      {tap === '2' && (
        <LectureNotes course={course} currentLesson={currentLesson} />
      )}
      {tap === '3' && (
        <Quiz course={course} currentLesson={currentLesson} slug={slug} />
      )}
      {tap === '4' && <QandA course={course} currentLesson={currentLesson} />}
    </div>
  )
}

export default CourseTaps
