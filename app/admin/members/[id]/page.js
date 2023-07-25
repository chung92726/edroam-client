'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Tabs } from 'antd'
import EnrolledCourseTaps from '@/components/memberPage/EnrolledCourseTaps'
import CreatedCourseTaps from '@/components/memberPage/CreatedCourseTaps'
import { toast } from 'react-toastify'
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const MemberPage = ({ params }) => {
  const router = useRouter()
  const { id } = params
  const [member, setMember] = useState('')
  const [taps, setTaps] = useState('1')
  const [createdCourse, setCreatedCourse] = useState('')
  const items = [
    {
      key: '1',
      label: `Enrolled Courses`,
    },
    {
      key: '2',
      label: `Created Courses`,
    },
  ]
  const items2 = [
    {
      key: '1',
      label: `Enrolled Courses`,
    },
  ]

  const banUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.put(`/api/admin/ban-user/${userId}`)
      toast.success('User Banned')
      loadMember()
    }
  }

  const unBanUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      const { data } = await axios.put(`/api/admin/unban-user/${userId}`)
      toast.success('User Unbanned')
      loadMember()
    }
  }

  const loadCreatedCourse = async () => {
    try {
      const { data } = await axios.get(`/api/admin/member-created/${id}`)
      setCreatedCourse(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const tapsChange = (key) => {
    setTaps(key)
  }
  const loadMember = async () => {
    try {
      const { data } = await axios.get(`/api/admin/member/${id}`)
      setMember(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    loadMember()
    loadCreatedCourse()
  }, [id])
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      {/* <div className='flex w-full justify-start mt-10 ml-8 cursor-pointer'>
        <div
          className='tooltip'
          data-tip='Back To All Members'
          onClick={() => router.push('/admin/members')}
        >
          <MdArrowBack size={30} />
        </div>
      </div> */}
      {member && (
        <>
          <div className='card lg:card-side bg-base-100 shadow-xl w-[95%] mt-6 py-4 px-4'>
            <figure>
              <img
                src={
                  member.picture.Location
                    ? member.picture.Location
                    : '/guest.png'
                }
                alt='Album'
                className='w-[200px] object-cover rounded-full'
              />
            </figure>
            <div className='card-body'>
              <h2 className='card-title text-[16px]'>Name: {member.name}</h2>
              <h2 className='card-title text-[16px]'>Email: {member.email}</h2>
              {member.website && (
                <h2 className='card-title text-[16px]'>
                  Website: {member.website}
                </h2>
              )}
              <p className='text-[12px] mt-2'>
                {`Created At: ${new Date(
                  member.createdAt
                ).toLocaleDateString()}    Updated At: ${new Date(
                  member.updatedAt
                ).toLocaleDateString()}`}
              </p>
              <p>{member.biography}</p>

              <div className='card-actions justify-end my-4'>
                {member.role.map((r) => (
                  <div className='badge badge-secondary'>{r}</div>
                ))}
              </div>
              <div className='flex flex-row gap-4 justify-end'>
                <div className='card-actions justify-end'>
                  {member.role.includes('Pending') ? (
                    <button
                      className='btn btn-success'
                      onClick={() => approveUser(member._id)}
                    >
                      Approve User
                    </button>
                  ) : member.role.includes('Instructor') ? (
                    <button
                      className='btn btn-warning'
                      onClick={() => {
                        unapproveUser(member._id)
                      }}
                    >
                      UnApprove Instructor
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
                <div className='card-actions justify-end'>
                  {member.banned ? (
                    <button
                      className='btn btn-success'
                      onClick={() => unBanUser(member._id)}
                    >
                      Unban User
                    </button>
                  ) : (
                    <button
                      className='btn btn-error'
                      onClick={() => {
                        banUser(member._id)
                      }}
                    >
                      Ban User
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='w-[95%] flex flex-col justify-start items-start mt-4'>
            <Tabs
              defaultActiveKey='1'
              items={
                member && member.role.includes('Instructor') ? items : items2
              }
              onChange={tapsChange}
              className='px-4 font-bold text-[16px]'
            />
            <div className='px-4 w-full'>
              {taps === '1' ? (
                member && member.courses.length > 0 ? (
                  <EnrolledCourseTaps member={member} />
                ) : (
                  <h1 className='font-bold text-[18px] py-4'>
                    User has No Enrolled Courses
                  </h1>
                )
              ) : null}
              {taps === '2' ? (
                createdCourse && createdCourse.length > 0 ? (
                  <CreatedCourseTaps createdCourse={createdCourse} />
                ) : (
                  <h1 className='font-bold text-[18px] py-4'>
                    User has No Created Courses
                  </h1>
                )
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MemberPage
