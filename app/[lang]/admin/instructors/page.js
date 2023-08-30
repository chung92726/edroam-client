'use client'
import { useState, useEffect } from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { FaBan } from 'react-icons/fa'
import { TiTickOutline, TiTimesOutline } from 'react-icons/ti'

import { toast } from 'react-toastify'
import axios from 'axios'
import { Table } from 'antd'
import Link from 'next/link'

const AllCourse = () => {
  const [instructors, setinstructors] = useState([])
  const [search, setSearch] = useState('')
  const [pendingInstructors, setPendingInstructors] = useState([])
  const [pendingSearch, setPendingSearch] = useState('')

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

  const fetchInstructors = async () => {
    const { data } = await axios.get(
      `/api/admin/get-all-instuctors?searchTerm=${search}`
    )
    setinstructors(data)
    // console.log(data)
  }

  const fetchPendingInstructors = async () => {
    const { data } = await axios.get(
      `/api/admin/get-all-pending?searchTerm=${pendingSearch}`
    )
    setPendingInstructors(data)
    // console.log(data)
  }

  useEffect(() => {
    fetchInstructors()
    fetchPendingInstructors()
  }, [search, pendingSearch])

  const approveUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.put(
        `/api/admin/approve-instructor/${userId}`
      )
      toast.success('User Approved')
      fetchInstructors()
      fetchPendingInstructors()
    }
  }

  const unapproveUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.put(
        `/api/admin/unapprove-instructor/${userId}`
      )
      toast.success('User UnApproved')
      fetchInstructors()
      fetchPendingInstructors()
    }
  }

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(`/api/admin/delete-user/${userId}`)
      toast.success('Course Deleted')
      fetchUsers()
      fetchPendingInstructors()
    }
  }
  const columns = [
    {
      title: 'Name',

      render: (e) => (
        <Link href={`/admin/members/${e._id}`} className='link link-primary'>
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
      title: 'Email',
      dataIndex: 'email',

      sorter: (a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase()) {
          return -1
        }
        if (a.email.toLowerCase() > b.email.toLowerCase()) {
          return 1
        }
        return 0
      },
      sortDirections: ['ascend', 'descend'],
      // width: 150,
    },

    {
      title: 'Status',

      render: (e) =>
        e.role.includes('Pending') ? (
          <p className='font-bold'>Pending</p>
        ) : (
          <p className='font-bold'>Instructor</p>
        ),
      width: 100,
    },
    {
      key: 'operation',
      title: 'Act',

      width: currentWidth > 768 ? 120 : 65,

      render: (e) => (
        <div className='flex md:flex-row flex-col justify-start items-center gap-2'>
          {e.role.includes('Pending') ? (
            <div className='tooltip tooltip-left' data-tip='Approve Intructor'>
              <TiTickOutline
                size={20}
                className='text-green-500 cursor-pointer'
                onClick={() => approveUser(e._id)}
              />
            </div>
          ) : (
            <div
              className='tooltip tooltip-left'
              data-tip='UnApprove Intructor'
            >
              <TiTimesOutline
                size={20}
                className='text-red-500 cursor-pointer'
                onClick={() => unapproveUser(e._id)}
              />
            </div>
          )}

          <div className='tooltip tooltip-left' data-tip='Delete User'>
            <MdOutlineDeleteForever
              size={20}
              className='text-red-500 cursor-pointer'
              onClick={() => deleteUser(e._id)}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='mt-8 flex flex-col justify-start items-center'>
      <h1 className='font-bold text-[20px] w-[95%] mb-4'>
        Pending Instructors ({pendingInstructors.length})
      </h1>
      <input
        type='text'
        placeholder='Search Pending'
        className='input w-[90%] max-w-sm mb-2 '
        value={search}
        onChange={(e) => setPendingSearch(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={pendingInstructors}
        className='mt-8'
        pagination={{
          pageSize: 20,
        }}
        scroll={{
          y: 480,
        }}
      />

      <h1 className='font-bold text-[20px] w-[95%] mb-4 mt-8'>
        All Instructors ({instructors.length})
      </h1>
      <input
        type='text'
        placeholder='Search Instructors'
        className='input w-[90%] max-w-sm mb-2 '
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={instructors}
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
