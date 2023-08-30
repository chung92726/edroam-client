'use client'
import { useState, useEffect } from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Table } from 'antd'
import Link from 'next/link'

const AllCourse = () => {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [instructorSearch, setInstructorSearch] = useState('')
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

  const fetchCourses = async () => {
    const { data } = await axios.get(
      `/api/admin/courses?search=${search}&instructorSearch=${instructorSearch}`
    )

    setCourses(data)
    console.log(data)
  }
  useEffect(() => {
    fetchCourses()
  }, [search, instructorSearch])

  const deleteCourse = async (slug) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(`/api/admin/courses/${slug}`)
      toast.success('Course Deleted')
      fetchCourses()
    }
  }
  const columns = [
    {
      title: 'Title',

      render: (e) => (
        <Link href={`/admin/courses/${e.slug}`} className='link link-primary'>
          {e.name}
        </Link>
      ),
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
      title: 'Instructor',
      dataIndex: 'instructor',
      render: (e) => (
        <Link className='link link-primary' href={`/admin/members/${e._id}`}>
          {e.name}
        </Link>
      ),
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
      // width: 150,
    },
    currentWidth < 700
      ? { width: 1 }
      : {
          title: 'Total Revenue',
          dataIndex: 'TotalRevenue',
          width: 150,

          sorter: (a, b) => a.TotalRevenue - b.TotalRevenue,
          sortDirections: ['descend', 'ascend'],
        },
    currentWidth < 700
      ? { width: 1 }
      : {
          title: 'Status',
          dataIndex: 'published',
          render: (e) => <p>{e ? 'Published' : 'Unpublished'}</p>,
          filters: [
            {
              text: 'Published',
              value: true,
            },
            {
              text: 'Unpublished',
              value: false,
            },
          ],
          onFilter: (value, record) => record.published === value,
          width: 120,
        },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: currentWidth > 768 ? 100 : 74,

      render: (e) => (
        <div className='flex md:flex-row flex-col justify-start items-center gap-2'>
          {/* <div className='tooltip tooltip-left' data-tip='Edit'>
            <AiFillEdit size={20} className='cursor-pointer' />
          </div> */}
          <div className='tooltip tooltip-right' data-tip='Delete'>
            <MdOutlineDeleteForever
              size={20}
              className='text-red-500 cursor-pointer'
              onClick={() => deleteCourse(e.slug)}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='mt-8 flex flex-col justify-start items-center'>
      <h1 className='font-bold text-[20px] w-[95%] mb-4'>
        All Courses ({courses.length})
      </h1>
      <input
        type='text'
        placeholder='Search Course'
        className='input    w-[90%] max-w-sm mb-2 '
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type='text'
        placeholder='Search Instructor'
        className='input    w-[90%] max-w-sm '
        value={instructorSearch}
        onChange={(e) => setInstructorSearch(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={courses}
        className='mt-8'
        pagination={{
          pageSize: 20,
        }}
        scroll={{
          y: 480,
        }}
      />
    </div>
  )
}

export default AllCourse
