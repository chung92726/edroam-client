'use client';

import UserRoute from '@/components/routes/UserRoutes';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Space, Table, Tag } from 'antd';

const EnrollmentHistory = ({ user, userRoute }) => {
  const [history, setHistory] = useState([]);

  const columns = [
    {
      title: `${user.historyPage.Columns_Course_Name}`,
      dataIndex: 'name',
      key: 'name',
      // render: ({ record} ) => <a>{record.slug}</a>,
    },
    {
      title: `${user.historyPage.Columns_Price}`,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: `${user.historyPage.Columns_Date}`,
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const data = [];

  history &&
    history[0] &&
    history.map((enrollment, index) =>
      data.push({
        key: index,
        name: enrollment.course.name,
        price: enrollment.price > 0 ? `$${enrollment.price}` : 'Free',
        date: new Date(enrollment.createdAt).toLocaleDateString(),
        slug: enrollment.course.name,
      })
    );

  // for (let i = 0; i < 46; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     price: 32,
  //     date: `London, Park Lane no. ${i}`,
  //   });
  // }

  useEffect(() => {
    const loadEnrollmentHistory = async () => {
      try {
        const { data } = await axios.get('/api/user/enrollment-history');
        setHistory(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadEnrollmentHistory();
  }, []);
  return (
    <UserRoute userRoute={userRoute}>
      {/* <div className='text-center bg-gray-700 text-white w-full  py-[50px] flex flex-col justify-center text-[28px] items-start font-bold '>
        <h1 className='text-4xl pl-10'>My Enrollment History</h1>
      </div> */}
      <div className='flex flex-col justify-center items-start bg-gray-700 text-white font-bold w-full py-[30px] md:py-[50px]'>
        <h1 className='text-2xl pl-10 md:text-4xl'>
          {user.historyPage.My_Enrol_History}
        </h1>
      </div>
      {/* <div className="overflow-x-auto">
        <table className="table bg-gray-100">
          
          <thead>
            <tr>
              <th></th>
              <th>Course Name</th>
              <th>Instructor Name</th>
              <th>price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            
            {history &&
              history[0] &&
              history.map((enrollment, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{enrollment.course.name}</td>
                  <td>{enrollment.instructor.name}</td>
                  <td>
                    {enrollment.price > 0 ? `$${enrollment.price}` : "Free"}
                  </td>
                  <td>{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div> */}
      {/* <Table>
        <Thead>
          <Tr>
            <Th>Course Name</Th>
            
            <Th>price</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {history &&
            history[0] &&
            history.map((enrollment, index) => (
              <Tr key={index}>
                
                <Td>{enrollment.course.name}</Td>
                
                <Td>{enrollment.price > 0 ? enrollment.price : "Free"}</Td>
                <Td>{new Date(enrollment.createdAt).toLocaleDateString()}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table> */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 5,
          position: ['bottomCenter'],
          // simple: true,
          showLessItems: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
        }}
      />
    </UserRoute>
  );
};

export default EnrollmentHistory;
