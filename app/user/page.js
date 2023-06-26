"use client";

import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/index";
import UserRoute from "../../components/routes/UserRoutes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [serchQuery, setSerchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

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
      case "price":
        return [...array].sort((a, b) => a.price - b.price);
      case "created":
        return [...array].sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
      case "updated":
        return [...array].sort((a, b) =>
          b.updatedAt.localeCompare(a.updatedAt)
        );
      default:
        return array;
    }
  };

  const filter = async (array, keyword) => {
    // console.log(keyword);
    return array.filter(
      (el) =>
        el.name.toLowerCase().includes(keyword.toLowerCase()) ||
        el.category
          .split(" ")
          .filter((el) => el.toLowerCase().includes(keyword.toLowerCase()))
          .includes(keyword.toLowerCase())
    );
  };

  useEffect(() => {
    const handlefilter = async () => {
      let tmp = await filter(courses, serchQuery);
      tmp = await filter(tmp, filterQuery);
      tmp = await sort(tmp, sortBy);
      setFiltered(tmp);
    };
    handlefilter();
  }, [serchQuery, filterQuery, sortBy]);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/user-courses");

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
    <UserRoute>
      <div className="text-center bg-gray-700 text-white w-full  pt-[50px] flex flex-col justify-center text-[28px] items-start font-bold ">
        <h1 className="text-4xl pl-10">My Learning</h1>
        <div className="tabs mt-10 ">
          <a className="tab tab-lifted   tab-active">My Courses</a>

          <a className="tab tab-lifted text-white">Wishlist</a>
        </div>
      </div>

      <div className="flex justify-center gap-5 items-center m-10 flex-col lg:flex-row">
        <input
          className="input input-bordered w-[65vw] lg:w-[45vw]"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSerchQuery(event.target.value.toLowerCase());
            }
          }}
          type="text"
          placeholder="Search..."
        />
        <div className="flex gap-5">
          <select
            className="select select-bordered w-[35vw] max-w-xs lg:w-[20vw]"
            onChange={(event) =>
              setFilterQuery(event.target.value.toLowerCase())
            }
          >
            <option value="">All Category</option>
            <option value="react">React</option>
            <option value="javascript">Javascript</option>
            <option value="GraphQL">GraphQL</option>
          </select>

          <select
            className="select select-bordered w-[25vw] max-w-xs lg:w-[15vw]"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>

            <option value="created">By lastest created</option>
            <option value="updated">By lastest updated</option>
          </select>
        </div>
      </div>

      {filtered && (
        <div className="flex flex-row justify-center items-center flex-wrap gap-6 mt-10 mx-5 sm:justify-start">
          {filtered.map((course) => (
            <Link
              className="w-60 border-none cursor-pointer group"
              href={`/user/course/${course.slug}`}
              key={course._id}
            >
              <figure>
                <img
                  src={course.image ? course.image.Location : "/course.png"}
                  alt="course image"
                  className="rounded w-full h-40 object-cover filter group-hover:contrast-50 "
                />
              </figure>
              <div>
                <progress
                  className="progress w-full"
                  value={course.completed}
                  max={course.lessons.length}
                ></progress>
                <p className=" text-[12px]">
                  {Math.floor((course.completed / course.lessons.length) * 100)}
                  % complete
                  {/* {Math.floor((7 / 11) * 100)}% complete */}
                </p>
              </div>
              <div className="my-3">
                <h2 className="font-bold text-[16px] min-h-12 line-clamp-2">
                  {course.name}
                </h2>
                <p className="text-[12px]">
                  {course.lessons && course.lessons.length} lessons
                </p>
                <p className="text-[12px] text-gray-400">
                  By {course.instructor.name}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-sm btn-info text-[12px] filter hover:contrast-50"
                    onClick={() => router.push(`/user/course/${course.slug}`)}
                  >
                    LEARN NOW!
                  </button>
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
