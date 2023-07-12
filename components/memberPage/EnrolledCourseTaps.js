import { Table } from 'antd'
import Link from 'next/link'
import { MdOutlineDeleteForever } from 'react-icons/md'

const EnrolledCourseTaps = ({ member }) => {
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
      title: 'Instructor Name',
      width: '30%',

      render: (e) => {
        return (
          <Link
            href={`/admin/members/${e.instructor._id}`}
            className='link link-primary text-[12px]'
          >
            {e.instructor.name}
          </Link>
        )
      },
      sorter: (a, b) => {
        if (a.instructor.name.toLowerCase() < b.instructor.name.toLowerCase()) {
          return -1
        }
        if (a.instructor.name.toLowerCase() > b.instructor.name.toLowerCase()) {
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
  ]
  return (
    <Table
      columns={columns}
      dataSource={member.courses}
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

export default EnrolledCourseTaps
