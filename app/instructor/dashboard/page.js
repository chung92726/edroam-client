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

import { stripeCurrencyFormatter } from '@/utils/helpers'

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
      window.location.href = data
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
    <div className='flex w-full flex-col mx-10'>
      <div className='stats shadow'>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <TbHomeDollar size={30} className='text-purple-800' />
          </div>
          <div className='stat-title'>Total Revenue</div>
          <div className='stat-value'>31K</div>
          <div className='stat-desc'>Jan 1st - Feb 1st</div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <MdOutlinePendingActions size={30} className='text-purple-800' />
          </div>
          <div className='stat-title'>Pending Balance</div>
          <div className='stat-value flex justify-start items-center'>
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
          <div className='stat-desc'>
            Paid Directly From Stripe to Your Bank Account Every 48 Hours
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard
