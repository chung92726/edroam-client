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
const labels = ['January', 'February', 'March', 'April', 'May', 'June']
export const data = {
  labels,
  datasets: [
    {
      label: 'Revenue',
      data: [302.22, 387.36, 468.45, 1253.53, 841.52, 947.42],
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
      data: [14, 18, 20, 41, 30, 32],
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 1',
    },
  ],
}

const InstructorDashboard = () => {
  const [balance, setBalance] = useState({ pending: [] })

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

  useEffect(() => {
    sendBalanceRequest()
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
      <div className='flex flex-col mt-5 gap-3 flex-wrap w-[90%]'>
        <div className='flex flex-col w-full xl:w-[49%] border-b-[10px]  border-purple-400 rounded-3xl'>
          <div className='stats shadow w-full stats-vertical md:stats-horizontal'>
            <div className='stat '>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Total Revenue</div>
              <div className='stat-value text-[18px]'>5102.36</div>
              {/* <div className='stat-desc'>Jan 1st - Feb 1st</div> */}
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Monthly Revenue</div>
              <div className='stat-value text-[18px]'>947.42</div>
              {/* <div className='stat-desc'>Jan</div> */}
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Today Revenue</div>
              <div className='stat-value text-[18px]'>226.89</div>
              {/* <div className='stat-desc'>Jan 25th</div> */}
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full xl:w-[49%] border-b-[10px]  border-blue-400 rounded-3xl'>
          <div className='stats shadow w-full'>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Total Enrollment</div>
              <div className='stat-value text-[18px]'>230</div>
              {/* <div className='stat-desc'>Jan 1st - Feb 1st</div> */}
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Monthly Enrollment</div>
              <div className='stat-value text-[18px]'>32</div>
              {/* <div className='stat-desc'>Jan</div> */}
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
              </div>
              <div className='stat-title text-[14px]'>Today Enrollment</div>
              <div className='stat-value text-[18px]'>8</div>
              {/* <div className='stat-desc'>Jan 25th</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full mt-5 mb-10 flex flex-col justify-between xl:flex-row'>
        <div className='w-full xl:w-[48%]'>
          <Bar options={options} data={data} />
        </div>
        <div className='w-full xl:w-[48%]'>
          <Bar options={options} data={data2} />
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard
