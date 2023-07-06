"use client";

import { useState, useEffect, useContext } from "react";
import { Context } from "@/context";

import axios from "axios";
// import { FaSackDollar } from 'react-icons/fa'
import { TbHomeDollar } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlinePendingActions } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { stripeCurrencyFormatter } from "@/utils/helpers";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  plugins: {
    title: {
      display: false,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  grid: {
    display: false,
  },
  interaction: {
    mode: "index",
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
};
const labels = ["January", "February", "March", "April", "May", "June"];
export const data = {
  labels,
  datasets: [
    {
      label: "Revenue",
      data: [3500, 3000, 3400, 4100, 3500, 4800],
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0",
    },
  ],
};

const data2 = {
  labels,
  datasets: [
    {
      label: "Enrollment",
      data: [14, 18, 20, 41, 30, 32],
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 1",
    },
  ],
};

const AdminDashboard = () => {
  const [balance, setBalance] = useState({ pending: [] });

  const sendBalanceRequest = async () => {
    const { data } = await axios.get("/api/instructor/balance");
    console.log(data);
    setBalance(data);
  };
  const [loading, setLoading] = useState(false);

  const handlePayoutSetting = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/instructor/payout-settings");
      window.location.href = data;
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Unable to access settings. Try again later");
      setLoading(false);
    }
  };

  useEffect(() => {
    sendBalanceRequest();
  }, []);
  return (
    <div className="flex w-full flex-col mx-10 mt-10 justify-center items-center ">
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <MdOutlinePendingActions size={30} className="text-purple-800" />
          </div>
          <div className="stat-title text-[16px]">Pending Balance</div>
          <div className="stat-value flex justify-start items-center text-[22px]">
            {balance.pending.map((bp, i) => (
              <span key={i}>{stripeCurrencyFormatter(bp)}</span>
            ))}
            {!loading ? (
              <div className="tooltip" data-tip="Direct to Stripe Settings">
                <LuSettings
                  size={30}
                  className="mx-5 cursor-pointer"
                  onClick={handlePayoutSetting}
                />
              </div>
            ) : (
              <span className="loading loading-spinner loading-md mx-5"></span>
            )}
          </div>
          <div className="stat-desc">
            Paid Directly From Stripe to Your Bank Account Every 48 Hours
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 ">
        <div className="flex flex-row mt-5 gap-3 flex-wrap w-[50%]">
          <div className="flex flex-col w-full  border-b-[10px] border-purple-400 rounded-3xl">
            <div className="stats shadow w-full h-full">
              <div className="stat ">
                <div className="stat-figure text-secondary">
                  {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
                </div>
                <div className="stat-title text-[14px]">Total Revenue</div>
                <div className="stat-value text-[18px]">AUD 5102.36</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
                </div>
                <div className="stat-title text-[14px]">Monthly Revenue</div>
                <div className="stat-value text-[18px]">AUD 947.42</div>
                {/* <div className='stat-desc'>Jan</div> */}
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
                </div>
                <div className="stat-title text-[14px]">Today Revenue</div>
                <div className="stat-value text-[18px]">AUD 226.89</div>
                {/* <div className='stat-desc'>Jan 25th</div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full border-b-[10px] border-blue-400 rounded-3xl">
            <div className="stats shadow w-full h-full">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
                </div>
                <div className="stat-title text-[14px]">Total Enrollment</div>
                <div className="stat-value text-[18px]">1.2K</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
                </div>
                <div className="stat-title text-[14px]">Monthly Enrollment</div>
                <div className="stat-value text-[18px]">315</div>
                {/* <div className='stat-desc'>Jan</div> */}
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  {/* <TbHomeDollar size={30} className='text-purple-800' /> */}
                </div>
                <div className="stat-title text-[14px]">Today Enrollment</div>
                <div className="stat-value text-[18px]">8</div>
                {/* <div className='stat-desc'>Jan 25th</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-5 gap-3 w-[50%]">
          <div className="stats stats-vertical shadow w-[33%]">
            <div className="stat">
              <div className="stat-title text-[14px]">Total Members</div>
              <div className="stat-value text-[18px]">2K</div>
            </div>
            <div className="stat">
              <div className="stat-title text-[14px]">Monthly Members</div>
              <div className="stat-value text-[18px]">50</div>
            </div>
            <div className="stat">
              <div className="stat-title text-[14px]">Today Member</div>
              <div className="stat-value text-[18px]">17</div>
            </div>
          </div>
          <div className="stats stats-vertical shadow w-[33%]">
            <div className="stat">
              <div className="stat-title text-[14px]">Total Course</div>
              <div className="stat-value text-[18px]">34</div>
            </div>
            <div className="stat">
              <div className="stat-title text-[14px]">Monthly Course</div>
              <div className="stat-value text-[18px]">15</div>
            </div>
            <div className="stat">
              <div className="stat-title text-[14px]">Today Course</div>
              <div className="stat-value text-[18px]">3</div>
            </div>
          </div>
          <div className="stats stats-vertical shadow w-[33%]">
            <div className="stat">
              <div className="stat-title text-[14px]">Total instructors</div>
              <div className="stat-value text-[18px]">28</div>
            </div>
            <div className="stat">
              <div className="stat-title text-[14px]">Monthly instructors</div>
              <div className="stat-value text-[18px]">8</div>
            </div>
            <div className="stat">
              <div className="stat-title text-[14px]">Today instructors</div>
              <div className="stat-value text-[18px]">2</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 mb-10 flex flex-col justify-between xl:flex-row">
        <div className="w-full xl:w-[48%]">
          <Bar options={options} data={data} />
        </div>
        <div className="w-full xl:w-[48%]">
          <Bar options={options} data={data2} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
