'use client';

import { useContext, useEffect, useState } from 'react';
import { Context } from '@/context/index';
import UserRoute from '@/components/routes/UserRoutes';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDurationToHoursAndMinutes } from '@/utils/helpers';

const UserIndex = ({
  userMyLearning,
  userRoute,
  courseInfo,
  allCat,
  levels,
  allLang,
}) => {
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [serchQuery, setSerchQuery] = useState('');
  const [categoryQuery, setCategoryQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [levelQuery, setLevelQuery] = useState('');
  const [langQuery, setLangQuery] = useState('');

  const loadCompletedLessons = async (id) => {
    // console.log(id);
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: id,
    });
    return data;
  };

  const sort = async (array, sortBy) => {
    // console.log("sort");
    switch (sortBy) {
      case 'price':
        return [...array].sort((a, b) => a.price - b.price);
      case 'created':
        return [...array].sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
      case 'updated':
        return [...array].sort((a, b) =>
          b.updatedAt.localeCompare(a.updatedAt)
        );
      default:
        return array;
    }
  };

  const search = async (array, keyword) => {
    // console.log(keyword);
    return array.filter(
      (el) =>
        el.name.toLowerCase().includes(keyword.toLowerCase()) ||
        el.category
          .split(' ')
          .filter((el) => el.toLowerCase().includes(keyword.toLowerCase()))
          .includes(keyword.toLowerCase())
    );
  };

  const categoryFilter = async (array, keyword) => {
    // console.log(keyword);
    return array.filter((el) =>
      el.category
        // .split(" ")
        .filter((el) => el.value.toLowerCase().includes(keyword.toLowerCase()))
        .some((el) => el.value.toLowerCase().includes(keyword.toLowerCase()))
    );
  };

  const levelFilter = async (array, keyword) => {
    // console.log(array);
    // console.log(keyword);
    return array.filter((el) =>
      el.level.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const langFilter = async (array, keyword) => {
    // console.log(array);
    // console.log(keyword);
    return array.filter((el) =>
      el.language.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  useEffect(() => {
    const handlefilter = async () => {
      let tmp = await search(courses, serchQuery);
      tmp = await categoryFilter(tmp, categoryQuery);
      tmp = await levelFilter(tmp, levelQuery);
      tmp = await langFilter(tmp, langQuery);
      tmp = await sort(tmp, sortBy);
      setFiltered(tmp);
    };
    handlefilter();
    // console.log(categoryQuery);
  }, [serchQuery, categoryQuery, levelQuery, langQuery, sortBy]);

  const loadCourses = async () => {
    const { data } = await axios.get('/api/user-courses');

    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].lessons.length);
      const completed = await loadCompletedLessons(data[i]._id);
      // console.log(completed.length);
      data[i].completed = completed.length;
    }
    // console.log(data);
    setCourses(data);
    setFiltered(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <UserRoute userRoute={userRoute}>
      {/* <div className="flex flex-col justify-center items-start bg-gray-700 text-white w-full pt-[20px] font-bold md:pt-[50px]">
        <h1 className="text-2xl pl-10 md:text-4xl">My Learning</h1>
        <div className="tabs mt-5 md:mt-10">
          <a className="tab tab-lifted tab-active">My Courses</a>

          <a className="tab tab-lifted text-white">Wishlist</a>
        </div>
      </div> */}
      <div className='flex flex-col justify-center items-start bg-gray-700 text-white font-bold w-full py-[30px] md:py-[50px]'>
        <h1 className='text-2xl pl-10 md:text-4xl'>
          {userMyLearning.My_Learning}
        </h1>
      </div>

      {/* <div className="flex justify-center items-center"> */}
      <div className='flex flex-wrap justify-center items-center mt-5 '>
        <input
          className='input input-bordered mx-[1%] my-2 w-[88%] 2xl:w-[24%]'
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setSerchQuery(event.target.value.toLowerCase());
            }
          }}
          type='text'
          placeholder={userMyLearning.PlaceholderSearch}
        />
        <select
          className='select select-bordered mx-[1%] my-2 w-[44%] md:w-[20.5%] 2xl:w-[14%]'
          onChange={(event) => setCategoryQuery(event.target.value)}
          value={categoryQuery}
        >
          <option value=''>{allCat.All}</option>
          <option value='WebDesign'>
            {allCat['Web Design']}
            {allCat.Courses}
          </option>
          <option value='UIUXDesign'>
            {allCat['UI/UX Design']}
            {allCat.Courses}
          </option>
          <option value='GraphicDesign'>
            {allCat['Graphic Design']}
            {allCat.Courses}
          </option>
          <option value='3DModeling'>
            {allCat['3D Modeling']}
            {allCat.Courses}
          </option>
          <option value='VideoEditing'>
            {allCat['Video Editing']}
            {allCat.Courses}
          </option>
          <option value='Others'>{allCat.Others}</option>
        </select>
        <select
          className='select select-bordered mx-[1%] my-2 w-[44%] md:w-[20.5%] 2xl:w-[14%]'
          onChange={(e) => setLevelQuery(e.target.value)}
          value={levelQuery}
        >
          <option value=''>{levels['All Levels']}</option>
          <option value='Beginner'>{levels.Beginner}</option>
          <option value='Intermediate'>{levels.Intermediate}</option>
          <option value='Expert'>{levels.Expert}</option>
        </select>
        <select
          className='select select-bordered mx-[1%] my-2 w-[44%] md:w-[20.5%] 2xl:w-[14%]'
          onChange={(e) => setLangQuery(e.target.value)}
          value={langQuery}
        >
          <option value=''>{allLang.All_Lang}</option>
          <option value='English'>{allLang.English}</option>
          <option value='Chinese'>{allLang.Chinese}</option>
        </select>
        <select
          className='select select-bordered mx-[1%] my-2 w-[44%] md:w-[20.5%] 2xl:w-[14%]'
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value=''>{userMyLearning.PlaceholderSort}</option>

          <option value='created'>
            {userMyLearning.PlaceholderLast_Create}
          </option>
          <option value='updated'>
            {userMyLearning.PlaceholderLast_Update}
          </option>
        </select>
        {/* </div> */}
      </div>

      {filtered && (
        <div className='flex flex-row justify-center items-stretch flex-wrap gap-6 my-10 mx-5 '>
          {filtered.map((course) => (
            <Link
              className='card w-[90%] sm:w-[45%] md:w-[30%] 2xl:w-[400px] border-none cursor-pointer group bg-white'
              href={`/user/course/${course.slug}`}
              key={course._id}
            >
              <figure>
                <img
                  src={course.image ? course.image.Location : '/course.png'}
                  alt='course image'
                  className='rounded w-full h-33 object-cover filter group-hover:contrast-50 '
                />
              </figure>
              <div className='mx-2 '>
                <div>
                  <progress
                    className='progress w-full'
                    value={course.completed}
                    max={course.lessons.length}
                  ></progress>
                  <div className='flex flex-row'>
                    <span className=' text-[12px]'>
                      {userMyLearning.Complete}&nbsp;
                    </span>
                    <p className=' text-[12px]'>
                      {Math.floor(
                        (course.completed / course.lessons.length) * 100
                      )}
                      %{/* {Math.floor((7 / 11) * 100)}% complete */}
                    </p>
                  </div>
                </div>
                <div className='my-2'>
                  <div className='flex flex-wrap items-center'>
                    {course.category &&
                      course.category.slice(0, 3).map((c, index) => (
                        <span className='badgeuidesign mr-2' key={index}>
                          {allCat[c.label]}
                        </span>
                      ))}
                  </div>

                  <h2 className='font-bold text-[16px] min-h-12 line-clamp-3 mt-2'>
                    {course.name}
                  </h2>
                  <div className='flex flex-row'>
                    <p className='text-[12px]'>
                      {course.lessons && course.lessons.length}&nbsp;
                    </p>
                    <span className='text-[12px]'>
                      {userMyLearning.Lessons}
                    </span>
                  </div>
                  <div className='flex flex-row'>
                    <span className='text-[12px] text-gray-600'>
                      {userMyLearning.By}&nbsp;
                    </span>
                    <p className='text-[12px] text-gray-600'>
                      {course.instructor.name}
                    </p>
                  </div>
                  <p className='text-[12px] '>{levels[course.level]}</p>
                  <p className='text-[12px] '>{allLang[course.language]}</p>
                  <p className='text-[12px] '>
                    <span>{courseInfo.Duration}</span>
                    {course.totalDuration &&
                      formatDurationToHoursAndMinutes(
                        Math.floor(course.totalDuration)
                      )}
                  </p>
                  <p className='text-[12px] '>
                    <span>{courseInfo['Last Updated']}</span>
                    {course &&
                      course.updatedAt &&
                      new Date(course.updatedAt).toLocaleDateString('en-GB')}
                  </p>
                  <div className='card-actions justify-end'>
                    <button
                      className='btn btn-sm btn-info text-[12px] filter hover:contrast-50'
                      onClick={() => router.push(`/user/course/${course.slug}`)}
                    >
                      {userMyLearning.Learn}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </UserRoute>
  );
};

export default UserIndex;
