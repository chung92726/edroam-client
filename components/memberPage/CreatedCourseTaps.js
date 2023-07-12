'use client'
import { useState, useEffect } from 'react'

import { Table } from 'antd'
import Link from 'next/link'
import { MdOutlineDeleteForever } from 'react-icons/md'

const CreatedCourseTaps = ({ createdCourse }) => {
  const [currentWidth, setCurrentWidth] = useState(0)

  useEffect(() => {
    setCurrentWidth(window.innerWidth)
    window.addEventListener('resize', () => {
      setCurrentWidth(window.innerWidth)
      console.log(window.innerWidth)
    })
    window.removeEventListener('resize', () => {
      setCurrentWidth(window.innerWidth)
    })
  }, [])
  const columns = [
    {
      title: 'Title',

      render: (e) => {
        return (
          <Link
            href={`/admin/courses/${e.slug}`}
            className='link link-primary text-[12px]'
          >
            {e.name}
          </Link>
        )
      },
      sorter: (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        return 0
      },
      sortDirections: ['ascend', 'descend'],
    },

    {
      title: 'Price',
      dataIndex: 'price',
      width: 80,

      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Level',
      dataIndex: 'level',
      width: '30%',
      filters: [
        {
          text: 'All Levels',
          value: 'All Levels',
        },
        {
          text: 'Beginner',
          value: 'Beginner',
        },
        {
          text: 'Intermediate',
          value: 'Intermediate',
        },
        {
          text: 'Expert',
          value: 'Expert',
        },
      ],
      onFilter: (value, record) => record.level === value,
    },
    currentWidth > 768
      ? {
          title: 'Language',
          dataIndex: 'language',
          width: 90,
          filters: [
            {
              text: 'English',
              value: 'English',
            },
            {
              text: 'Chinese',
              value: 'Chinese',
            },
          ],
          onFilter: (value, record) => record.language === value,
        }
      : {
          width: 1,
        },
  ]
  return (
    <Table
      columns={columns}
      dataSource={createdCourse}
      className='mt-4'
      pagination={{
        pageSize: 20,
      }}
      scroll={{
        y: 480,
      }}
    />
  )
}

export default CreatedCourseTaps
