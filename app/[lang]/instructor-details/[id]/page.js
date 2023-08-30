'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import EnrolledCourseTaps from '@/components/memberPage/EnrolledCourseTaps';
import CreatedCourseTaps from '@/components/memberPage/CreatedCourseTaps';
import { toast } from 'react-toastify';
import { MdArrowBack } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import CourseCard from '@/components/cards/CourseCard';
import Image from 'next/image';

const InstructorDetailsPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [member, setMember] = useState('');
  const [taps, setTaps] = useState('1');
  const [createdCourse, setCreatedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [socials, setSocials] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = params.slug
  //       ? await axios.get(`/api/courses/${params.slug}`)
  //       : await axios.get(`/api/courses/`);
  //     // console.log(data);
  //     setCourses(data);
  //   };
  //   if (params.slug) {
  //     if (!category.some((el) => params.slug.includes(el))) {
  //       router.push(`/marketplace`);
  //     }
  //   }
  //   fetchCourses();
  // }, []);

  const loadCreatedCourse = async () => {
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      setCreatedCourse(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const tapsChange = (key) => {
    setTaps(key);
  };

  const loadMember = async () => {
    try {
      const { data } = await axios.get(`/api/user/${id}`);
      setMember(data);

      const platforms = [
        {
          key: 'website',
          title: 'Website',
          image: '/web.png',
        },
        {
          key: 'linkedin',
          title: 'LinkedIn',
          image: '/linkedin.png',
        },
        {
          key: 'youtube',
          title: 'Youtube',
          image: '/youtube.png',
        },
        {
          key: 'facebook',
          title: 'Facebook',
          image: '/facebook1.png',
        },
        {
          key: 'instagram',
          title: 'Instagram',
          image: '/instagram.png',
        },
        {
          key: 'twitter',
          title: 'X',
          image: '/twitter-x.png',
        },
        {
          key: 'wechat',
          title: 'WeChat',
          image: '/wechat.png',
        },
        {
          key: 'tiktok',
          title: 'TikTok',
          image: '/tiktok.png',
        },
      ];

      const newSocials = platforms.reduce((acc, platform) => {
        if (data.user[platform.key]) {
          acc.push({
            title: platform.title,
            link: `https://${data.user[platform.key]}`,
            image: platform.image,
          });
        }
        return acc;
      }, []);
      setSocials(newSocials);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMember();
    loadCreatedCourse();
  }, [id]);

  return (
    <div className='w-full flex flex-col justify-center items-center pb-10'>
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
          <div className='card lg:card-side bg-base-100 shadow-xl w-[95%] mt-6 py-4 px-4 justify-between '>
            <div className='flex flex-col w-full justify-start max-lg:items-center'>
              {member.user.role.includes('Instructor') && (
                <h2 className='card-title text-[16px] text-gray-500 lg:pl-2 pb-2'>
                  Instructor
                </h2>
              )}
              <figure className='min-w-2/5'>
                <img
                  src={
                    member.user.picture.Location
                      ? member.user.picture.Location
                      : '/guest.png'
                  }
                  alt='Album'
                  className='flex object-cover rounded-full w-[200px]'
                />
              </figure>
              <div className='flex flex-wrap justify-start items-center w-full mt-8 px-8 gap-4 '>
                {socials.map((social) => (
                  <a
                    href={social.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='border border-gray-500 rounded-md px-2 py-1 hover:bg-slate-300'
                  >
                    <div className='flex flex-row '>
                      <Image
                        src={social.image}
                        alt='icon'
                        width={30}
                        height={10}
                        className='mr-2'
                      />
                      <h2 className='card-title text-[16px]'>{social.title}</h2>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className='card-body w-full'>
              <h2 className='card-title text-[16px]'>
                Name: {member.user.name}
              </h2>

              <h3 className='text-[16px] font-bold'>About me</h3>
              <p>{member.user.biography}</p>

              {/* <div className='card-actions justify-end my-4'>
                {member.user.role.map((r) => (
                  <div className='badge badge-secondary'>{r}</div>
                ))}
              </div> */}
              <div className='flex flex-row gap-4 justify-end'></div>
            </div>
          </div>
          <div className='w-[95%] flex flex-col justify-start items-start mt-4'>
            {member && member.user.role.includes('Instructor') ? (
              <div>
                <h1 className=' font-bold text-[25px] ml-5'>Created Courses</h1>
                <div className='flex flex-row justify-center w-full mt-10 flex-wrap gap-10 sm:gap-5'>
                  {member && member.courses.length > 0 ? (
                    [
                      member.courses.map((course, i) => (
                        <CourseCard key={course.id} course={course} index={i} />
                      )),
                    ]
                  ) : (
                    <h1 className='font-bold text-[18px] py-4'>
                      User has No Created Courses
                    </h1>
                  )}
                </div>
              </div>
            ) : // normal user enrolled courses
            null}
            {/* <Tabs
              defaultActiveKey='1'
              items={
                member && member.role.includes('Instructor') ? items : items2
              }
              onChange={tapsChange}
              className='px-4 font-bold text-[16px]'
            /> */}
            {/* <div className='px-4 w-full flex-row justify-center gap-10'>
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
                  [
                    createdCourse.map((course, i) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        member={member}
                        index={i}
                      />
                    )),
                  ]
                ) : (
                  <h1 className='font-bold text-[18px] py-4'>
                    User has No Created Courses
                  </h1>
                )
              ) : null}
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default InstructorDetailsPage;
