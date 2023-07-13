'use client'
import { useState, useEffect } from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { FaBan } from 'react-icons/fa'
import { TiTickOutline } from 'react-icons/ti'

import { toast } from 'react-toastify'
import axios from 'axios'
import { Table } from 'antd'
import Link from 'next/link'

const AllCourse = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

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

  const fetchUsers = async () => {
    const { data } = await axios.get(
      `/api/admin/get-all-users?searchTerm=${search}`
    )

    setUsers(data)
    console.log(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [search])

  const banUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.put(`/api/admin/ban-user/${userId}`)
      toast.success('User Banned')
      fetchUsers()
    }
  }

  const unBanUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.put(`/api/admin/unban-user/${userId}`)
      toast.success('User Unbanned')
      fetchUsers()
    }
  }

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.delete(`/api/admin/delete-user/${userId}`)
      toast.success('Course Deleted')
      fetchUsers()
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
      title: 'Role',
      dataIndex: 'role',
      render: (e) => (
        <div className='flex flex-col justify-start items-start'>
          {e.map((role) => (
            <p className='font-bold'>{role}</p>
          ))}
        </div>
      ),
      filters: [
        {
          text: 'Subscriber',
          value: 'Subscriber',
        },
        {
          text: 'Instructor',
          value: 'Instructor',
        },
        {
          text: 'Admin',
          value: 'Admin',
        },
      ],
      onFilter: (value, record) => record.role.includes(value),
      width: 100,
    },
    {
      key: 'operation',
      title: 'Act',

      width: currentWidth > 768 ? 120 : 65,

      render: (e) => (
        <div className='flex md:flex-row flex-col justify-start items-center gap-2'>
          {/* <div className='tooltip tooltip-left' data-tip='Edit'>
            <AiFillEdit size={20} className='cursor-pointer' />
          </div> */}
          {e.banned ? (
            <div className='tooltip tooltip-right' data-tip='Unban User'>
              <TiTickOutline
                size={20}
                className='text-green-500 cursor-pointer'
                onClick={() => unBanUser(e._id)}
              />
            </div>
          ) : (
            <div className='tooltip tooltip-right' data-tip='Ban User'>
              <FaBan
                size={20}
                className='text-red-500 cursor-pointer'
                onClick={() => banUser(e._id)}
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
      filters: [
        {
          text: 'Banned User',
          value: true,
        },
        {
          text: 'Normal User',
          value: false,
        },
      ],
      onFilter: (value, record) => record.banned === value,
    },
  ]

  return (
    <div className='mt-8 flex flex-col justify-start items-center'>
      <input
        type='text'
        placeholder='Search Members'
        className='input    w-[90%] max-w-sm mb-2 '
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={users}
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
