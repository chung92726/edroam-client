"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "@/components/cards/CourseCard";

const marketplace = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [serchQuery, setSerchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [priceQuery, setPriceQuery] = useState(99.99);
  const [sortBy, setSortBy] = useState("");

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

  const priceFilter = async (array, price) => {
    // console.log(price);
    return array.filter((el) => el.price <= price);
  };

  useEffect(() => {
    const handlefilter = async () => {
      let tmp = await filter(courses, serchQuery);
      tmp = await filter(tmp, filterQuery);
      tmp = await priceFilter(tmp, priceQuery);
      tmp = await sort(tmp, sortBy);
      setFiltered(tmp);
    };
    handlefilter();
  }, [serchQuery, filterQuery, priceQuery, sortBy]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
      setFiltered(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-10 w-full mb-10">
      {/* <h1>Marketplace</h1> */}
      <div className="flex gap-5 items-center">
        <input
          className="input input-bordered w-10vh max-w-xs"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSerchQuery(event.target.value.toLowerCase());
            }
          }}
          type="text"
          placeholder="Search..."
        />
        <select
          className="select select-bordered w-5vh max-w-xs"
          onChange={(event) => setFilterQuery(event.target.value.toLowerCase())}
        >
          <option value="">All Category</option>
          <option value="react">React</option>
          <option value="javascript">Javascript</option>
          <option value="GraphQL">GraphQL</option>
        </select>
        <div className="flex flex-row items-center gap-1">
          <input
            type="range"
            min={-0.01}
            max="99.99"
            step={1}
            value={priceQuery}
            className="range range-xs w-[150px]"
            onChange={(e) =>
              e.target.value > 0
                ? setPriceQuery(e.target.value)
                : setPriceQuery(0)
            }
          />
          <p className="w-[60px]">${priceQuery}</p>
        </div>
        <select
          className="select select-bordered w-5vh max-w-xs"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price">By lowest price</option>
          <option value="created">By lastest created</option>
          <option value="updated">By lastest updated</option>
        </select>
      </div>

      <div className="flex flex-row justify-center w-full mt-10 flex-wrap gap-10">
        {filtered.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default marketplace;
