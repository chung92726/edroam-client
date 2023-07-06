"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const LearningCard = () => {
  const [myLearning, setMyLearning] = useState([]);

  const loadCompletedLessons = async (id) => {
    // console.log(id);
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: id,
    });
    return data;
  };

  const loadCourses = async () => {
    const { data } = await axios.get("/api/user-courses");

    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].lessons.length);
      const completed = await loadCompletedLessons(data[i]._id);
      // console.log(completed.length);
      data[i].completed = completed.length;
    }

    setMyLearning(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full divide-y-2 divide-black-500">
      {myLearning.map((course) => (
        <Link
          className="flex flex-row w-full  cursor-pointer group p-3 "
          href={`/user/course/${course.slug}`}
          key={course._id}
        >
          <figure className="mr-2 w-2/6">
            <img
              src={course.image ? course.image.Location : "/course.png"}
              alt="course image"
              className="rounded w-[80px] h-[80px]  object-cover filter  "
            />
          </figure>
          <div className="flex flex-col justify-end w-4/6">
            <div className="">
              <p className="text-left font-semibold	 break-words"> {course.name.length > 100 ? `${course.name.substring(0, 100)}...` : course.name}</p>
            </div>
            <div className="w-full">
              <progress
                className="progress w-full"
                value={course.completed}
                max={course.lessons.length}
              >
                <span></span>
              </progress>
            </div>
          </div>
        </Link>
      ))}
      <div className="w-full justify-center p-3 border-t-2 border-black-500">
              <Link 
              href="/user">
                <button className="btn btn-primary bg-indigo-500 w-full">
                  Go to My Learning
                </button>
              </Link>
            </div>
    </div>
  );
};

export default LearningCard;
