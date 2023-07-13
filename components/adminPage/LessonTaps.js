import React from 'react'
import { Table } from 'antd'
import Link from 'next/link'
import { MdOutlineDeleteForever } from 'react-icons/md'

const LessonTaps = ({ course, deleteLesson }) => {
  for (let i = 0; i < course.lessons.length; i++) {
    course.lessons[i].Key = i + 1
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'Key',
      key: 'Key',
      width: 50,
    },
    {
      title: 'Title',

      render: (e) => {
        return (
          <Link
            href={`/admin/courses/lesson/${e.slug}/${course.slug}`}
            className='link link-primary text-[12px]'
          >
            {e.title}
          </Link>
        )
      },
      sorter: (a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        }
        return 0
      },
      sortDirections: ['ascend', 'descend'],
    },

    {
      title: 'Status',
      dataIndex: 'free_preview',
      render: (e) => <a>{e ? 'Free' : 'Paid Lesson'}</a>,
      filters: [
        {
          text: 'Free',
          value: true,
        },
        {
          text: 'Paid Lesson',
          value: false,
        },
      ],
      onFilter: (value, record) => record.free_preview === value,
      width: 80,
    },
    {
      title: '',
      key: 'operation',
      //   fixed: 'right',
      width: 50,

      render: (e) => (
        <div className='flex md:flex-row flex-col justify-start items-center gap-2'>
          {/* <div className='tooltip tooltip-left' data-tip='Edit'>
            <AiFillEdit size={20} className='cursor-pointer' />
          </div> */}
          <div className='tooltip tooltip-left' data-tip='Delete'>
            <MdOutlineDeleteForever
              size={20}
              className='text-red-500 cursor-pointer'
              onClick={() => deleteLesson(course._id, e._id)}
            />
          </div>
        </div>
      ),
    },
  ]
  return (
    <Table
      columns={columns}
      dataSource={course.lessons}
      className='mt-8'
      pagination={{
        pageSize: 20,
      }}
      scroll={{
        y: 480,
      }}
    />
  )
}

export default LessonTaps
