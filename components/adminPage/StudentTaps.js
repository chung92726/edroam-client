import React from 'react'
import { Table } from 'antd'
import Link from 'next/link'
import { MdOutlineDeleteForever } from 'react-icons/md'

const StudentTaps = ({ course, students, removeStudent }) => {
  const columns = [
    {
      title: 'Name',
      width: '30%',

      render: (e) => {
        return (
          <Link
            href={`/admin/members/${e._id}`}
            className='link link-primary text-[12px]'
          >
            {e.name}
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
      title: 'Email',

      dataIndex: 'email',
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
      title: '',
      key: 'operation',
      //   fixed: 'right',
      width: 50,

      render: (e) => (
        <div className='flex md:flex-row flex-col justify-start items-center gap-2'>
          {/* <div className='tooltip tooltip-left' data-tip='Edit'>
            <AiFillEdit size={20} className='cursor-pointer' />
          </div> */}
          <div
            className='tooltip tooltip-left'
            data-tip='Remove User from Course'
          >
            <MdOutlineDeleteForever
              size={20}
              className='text-red-500 cursor-pointer'
              onClick={() => {
                removeStudent(course._id, e._id)
              }}
            />
          </div>
        </div>
      ),
    },
  ]
  return (
    <Table
      columns={columns}
      dataSource={students}
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

export default StudentTaps
