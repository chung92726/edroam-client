'use client'

import { useState, useEffect, useContext } from 'react'
import { Context } from '@/context'

import axios from 'axios'
// import { FaSackDollar } from 'react-icons/fa'
import { TbHomeDollar } from 'react-icons/tb'
import { HiUserGroup } from 'react-icons/hi'
import { MdOutlinePendingActions } from 'react-icons/md'
import { LuSettings } from 'react-icons/lu'
import { toast } from 'react-toastify'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Table } from 'antd'

import { stripeCurrencyFormatter } from '@/utils/helpers'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export const options = {
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  grid: {
    display: false,
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      border: {
        width: 3,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      border: {
        width: 3,
      },
    },
  },
}
// const labels = ['January', 'February', 'March', 'April', 'May', 'June']

const InstructorDashboard = () => {
  const [balance, setBalance] = useState({ pending: [] })
  const [allEnrolled, setAllEnrolled] = useState()
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const [todayRevenue, setTodayRevenue] = useState(0)
  const [totalEntrollment, setTotalEntrollment] = useState(0)
  const [monthlyEntrollment, setMonthlyEntrollment] = useState(0)
  const [todayEntrollment, setTodayEntrollment] = useState(0)
  const [sixMonthsRecords, setSixMonthsRecords] = useState([])
  const [labels, setLabels] = useState([])
  const [revenueData, setRevenueData] = useState([])
  const [enrolledData, setEnrolledData] = useState([])

  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        // data: [302.22, 387.36, 468.45, 1253.53, 841.52, 947.42],
        data: revenueData,
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
      },
    ],
  }

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Enrollment',
        // data: [14, 18, 20, 41, 30, 32],
        data: enrolledData,
        backgroundColor: 'rgb(53, 162, 235)',
        stack: 'Stack 1',
      },
    ],
  }

  const sendBalanceRequest = async () => {
    const { data } = await axios.get('/api/instructor/balance')
    console.log(data)
    setBalance(data)
  }
  const [loading, setLoading] = useState(false)

  const handlePayoutSetting = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/instructor/payout-settings')
      // window.location.href = data
      window.open(data, '_blank')
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Unable to access settings. Try again later')
      setLoading(false)
    }
  }

  const getAllEnrolled = async () => {
    const { data } = await axios.get('/api/instructor/get-all-enrolled')
    setAllEnrolled(data)
    console.log(data)

    const currentDate = new Date()
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    )
    const todayTimestamp = new Date().setHours(0, 0, 0, 0)

    let totalRev = 0
    let monthlyRev = 0
    let todayRev = 0
    let totalCount = data.length
    let monthlyCount = 0
    let todayCount = 0

    data.map((item) => {
      // console.log(item.createdAt)
      totalRev = (Number(totalRev) + Number(item.price) * 0.7).toFixed(2)
      if (new Date(item.createdAt) >= firstDayOfMonth) {
        monthlyRev = (Number(monthlyRev) + Number(item.price) * 0.7).toFixed(2)
        // console.log(item.createdAt)
        monthlyCount += 1
      }
      if (new Date(item.createdAt) >= todayTimestamp) {
        todayRev = (Number(todayRev) + Number(item.price) * 0.7).toFixed(2)
        // console.log(item.createdAt)
        todayCount += 1
      }
    })
    setTotalRevenue(totalRev)
    setMonthlyRevenue(monthlyRev)
    setTodayRevenue(todayRev)
    setTotalEntrollment(totalCount)
    setMonthlyEntrollment(monthlyCount)
    setTodayEntrollment(todayCount)

    const sixMonthsResult = []

    // Create an array to hold the result for each month
    for (let i = 0; i <= 5; i++) {
      const month = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      )
      // console.log(month)
      sixMonthsResult.push({
        month: month.toLocaleString('default', { month: 'long' }),
        data: [],
      })
    }
    // console.log(sixMonthsResult)

    // Iterate through the list and distribute the items to corresponding months
    data.forEach(({ createdAt, price }) => {
      const itemDate = new Date(createdAt)
      const diffInMonths =
        (currentDate.getFullYear() - itemDate.getFullYear()) * 12 +
        currentDate.getMonth() -
        itemDate.getMonth()
      if (diffInMonths >= 0 && diffInMonths < 6) {
        sixMonthsResult[diffInMonths].data.push({ createdAt, price })
      }
    })

    // Rearrange the resulting array to match the expected order
    sixMonthsResult.reverse()
    setSixMonthsRecords(sixMonthsResult)

    const months = []
    const revenues = []
    const enrolleds = []

    sixMonthsResult.map((data) => {
      // console.log(data.month)
      months.push(data.month)
      enrolleds.push(data.data.length)
      let total = 0
      data.data.map(({ price }) => {
        total = (Number(total) + Number(price) * 0.7).toFixed(2)
      })
      revenues.push(total)
    })
    setLabels(months)
    setRevenueData(revenues)
    setEnrolledData(enrolleds)
  }

  const columns = [
    // {
    //   title: 'Student Name',
    //   // dataIndex: 'user.name',
    //   render: (e) => <p>{e.user.name}</p>,
    // },
    {
      title: 'Course Name',
      // dataIndex: 'course.name',
      render: (e) => <p className='font-bold'>{e.course.name}</p>,
      width: 150,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: 100,
    },
    {
      title: 'Type',
      // dataIndex: 'type',
      render: (e) => <p>Platform</p>,
      width: 100,
    },
    {
      title: 'Earned',
      render: (e) => <p>{(Number(e.price) * 0.7).toFixed(2)}</p>,
      width: 100,
    },
    {
      title: 'Date',
      // dataIndex: 'createdAt',
      render: (e) => <p>{new Date(e.createdAt).toLocaleDateString()}</p>,
      width: 150,
    },
  ]

  useEffect(() => {
    sendBalanceRequest()
    getAllEnrolled()
  }, [])
  return (
    <div className='flex w-full flex-col mt-10 justify-center items-center'>
      <div className='stats shadow w-[90%]'>
        <div className='stat'>
          <div className='stat-figure text-secondary hidden sm:block'>
            <MdOutlinePendingActions size={30} className='text-purple-800' />
          </div>
          <div className='stat-title text-[16px]'>Pending Balance</div>
          <div className='stat-value flex justify-start items-center text-[22px]'>
            {balance.pending.map((bp, i) => (
              <span key={i}>{stripeCurrencyFormatter(bp)}</span>
            ))}
            {!loading ? (
              <div className='tooltip' data-tip='Direct to Stripe Settings'>
                <LuSettings
                  size={30}
                  className='mx-5 cursor-pointer'
                  onClick={handlePayoutSetting}
                />
              </div>
            ) : (
              <span className='loading loading-spinner loading-md mx-5'></span>
            )}
          </div>
          <div className='stat-desc whitespace-normal'>
            <p className=' break-words'>
              Paid Directly From Stripe to Your Bank Account Every 48 Hours
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-5 gap-3 w-[90%] sm:flex-row md:flex-col 2xl:flex-row xl:justify-between'>
        <div className='flex flex-col w-full sm:w-[50%] md:w-full 2xl:w-[49%] border-b-[10px] border-purple-400 rounded-3xl'>
          <div className='stats shadow w-full stats-vertical md:stats-horizontal md:w-full'>
            <div className='stat '>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Total Revenue</div>
              <div className='stat-value text-[18px]'>${totalRevenue}</div>
              {/* <div className='stat-desc'>Jan 1st - Feb 1st</div> */}
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Monthly Revenue</div>
              <div className='stat-value text-[18px]'>${monthlyRevenue}</div>
              {/* <div className='stat-desc'>Jan</div> */}
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Today Revenue</div>
              <div className='stat-value text-[18px]'>${todayRevenue}</div>
              {/* <div className='stat-desc'>Jan 25th</div> */}
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full sm:w-[50%] md:w-full 2xl:w-[49%] border-b-[10px]  border-blue-400 rounded-3xl'>
          <div className='stats shadow w-full stats-vertical md:stats-horizontal'>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Total Enrollment</div>
              <div className='stat-value text-[18px]'>{totalEntrollment}</div>
              {/* <div className='stat-desc'>Jan 1st - Feb 1st</div> */}
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Monthly Enrollment</div>
              <div className='stat-value text-[18px]'>{monthlyEntrollment}</div>
              {/* <div className='stat-desc'>Jan</div> */}
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Today Enrollment</div>
              <div className='stat-value text-[18px]'>{todayEntrollment}</div>
              {/* <div className='stat-desc'>Jan 25th</div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='w-[90%] mt-5 mb-10 flex flex-col justify-between xl:flex-row'>
        <div className='w-full h-[50%] xl:w-[48%]'>
          <Bar options={options} data={data} />
        </div>
        <div className='w-full xl:w-[48%]'>
          <Bar options={options} data={data2} />
        </div>
      </div> */}
      <div className='w-[90%] gap-3 mt-5 mb-10 flex flex-col justify-between lg:flex-row'>
        <div className='stats shadow w-full lg:w-[49%] '>
          <div className='stat'>
            <div className='stat-title text-[16px]'>Revenue</div>
            <div className='w-[90%] '>
              <Bar options={options} data={data} className='min-h-[200px]' />
            </div>
          </div>
        </div>
        <div className='stats shadow w-full lg:w-[49%]'>
          <div className='stat'>
            <div className='stat-title text-[16px]'>Entrollment</div>
            <div className='w-[90%] '>
              <Bar options={options} data={data2} className='min-h-[200px]' />
            </div>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={allEnrolled}
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

export default InstructorDashboard
