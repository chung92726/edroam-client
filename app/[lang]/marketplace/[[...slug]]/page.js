'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import CourseCard from '@/components/cards/CourseCard'

const marketplace = ({ params }) => {
  const [courses, setCourses] = useState([])
  const [filtered, setFiltered] = useState([])
  const [serchQuery, setSerchQuery] = useState('')
  const [levelQuery, setLevelQuery] = useState('')
  const [langQuery, setLangQuery] = useState('')
  const [priceQuery, setPriceQuery] = useState(99.99)
  const [sortBy, setSortBy] = useState('')
  const [categoryQuery, setCategoryQuery] = useState('')

  const router = useRouter()

  const category = [
    'WebDesign',
    'UIUXDesign',
    'GraphicDesign',
    '3DModeling',
    'VideoEditing',
    'Others',
  ]

  const sort = async (array, sortBy) => {
    // console.log("sort");
    switch (sortBy) {
      case 'price':
        return [...array].sort((a, b) => a.price - b.price)
      case 'created':
        return [...array].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      case 'updated':
        return [...array].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      default:
        return array
    }
  }

  const search = async (array, keyword) => {
    // console.log(keyword);
    return array.filter(
      (el) =>
        el.name.toLowerCase().includes(keyword.toLowerCase()) ||
        el.category
          // .split(" ")
          .filter((el) =>
            el.value.toLowerCase().includes(keyword.toLowerCase())
          )
          .some((el) => el.value.toLowerCase().includes(keyword.toLowerCase()))
    )
  }

  const levelFilter = async (array, keyword) => {
    // console.log(array);
    // console.log(keyword);
    return array.filter((el) =>
      el.level.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  const langFilter = async (array, keyword) => {
    // console.log(array);
    // console.log(keyword);
    return array.filter((el) =>
      el.language.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  const priceFilter = async (array, price) => {
    // console.log(price);
    return array.filter((el) => el.price <= price)
  }

  const handleCategory = async (event) => {
    // console.log(event.target.value.toLowerCase());
    // setFilterQuery(event.target.value.toLowerCase());
    router.push(`/marketplace/${event.target.value}`)
  }

  useEffect(() => {
    const handlefilter = async () => {
      let tmp = await search(courses, serchQuery)
      tmp = await levelFilter(tmp, levelQuery)
      tmp = await langFilter(tmp, langQuery)
      tmp = await priceFilter(tmp, priceQuery)
      tmp = await sort(tmp, sortBy)
      setFiltered(tmp)
    }
    handlefilter()
  }, [serchQuery, levelQuery, langQuery, priceQuery, sortBy])

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = params.slug
        ? await axios.get(`/api/courses/${params.slug}`)
        : await axios.get(`/api/courses/`)
      // console.log(data);
      setCourses(data)
      setFiltered(data)
      setCategoryQuery(params.slug)
    }
    if (params.slug) {
      if (!category.some((el) => params.slug.includes(el))) {
        router.push(`/marketplace`)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className='flex flex-col justify-center items-center mt-10 w-full mb-10'>
      <div className='flex flex-wrap justify-center items-center'>
        <input
          className='input input-bordered mx-[1.5vw] my-2 w-[90vw] 2xl:w-[14vw] 2xl:mx-[0.5vw]'
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setSerchQuery(event.target.value.toLowerCase())
            }
          }}
          type='text'
          placeholder='Search...'
        />
        <select
          className='select select-bordered mx-[1.5vw] my-2 w-[43.5vw] sm:w-[28vw] 2xl:w-[14vw] 2xl:mx-[0.5vw]'
          onChange={handleCategory}
          value={categoryQuery}
        >
          <option value=''>All Category</option>
          <option value='WebDesign'>Web Design</option>
          <option value='UIUXDesign'>UI/UX Design</option>
          <option value='GraphicDesign'>Graphic Design</option>
          <option value='3DModeling'>3D Modeling</option>
          <option value='VideoEditing'>Video Editing</option>
          <option value='Others'>Others</option>
        </select>
        <select
          className='select select-bordered mx-[1.5vw] my-2 w-[43.5vw] sm:w-[28vw] 2xl:w-[12vw] 2xl:mx-[0.5vw]'
          onChange={(e) => setLevelQuery(e.target.value)}
          value={levelQuery}
        >
          <option value=''>All Levels</option>
          <option value='Beginner'>Beginner</option>
          <option value='Intermediate'>Intermediate</option>
          <option value='Expert'>Expert</option>
        </select>
        <select
          className='select select-bordered mx-[1.5vw] my-2 w-[43.5vw] sm:w-[28vw] 2xl:w-[14vw] 2xl:mx-[0.5vw]'
          onChange={(e) => setLangQuery(e.target.value)}
          value={langQuery}
        >
          <option value=''>All Language</option>
          <option value='English'>English</option>
          <option value='Chinese'>Chinese</option>
        </select>
        <select
          className='select select-bordered mx-[1.5vw] my-2 w-[43.5vw] sm:w-[28vw] 2xl:w-[10vw] 2xl:mx-[0.5vw]'
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value=''>Sort By</option>
          <option value='price'>By lowest price</option>
          <option value='created'>By lastest created</option>
          <option value='updated'>By lastest updated</option>
        </select>
        <div className='flex flex-row justify-center items-center mx-[1.5vw] my-2 h-[3rem] w-[86vw] sm:w-[59vw] 2xl:w-[20vw] 2xl:mx-[0.5vw]'>
          <h1 className='mx-[1vw] my-2 2xl:mx-[0.5vw]'>Price:</h1>
          <input
            type='range'
            min={-0.01}
            max='99.99'
            step={1}
            value={priceQuery}
            className='range range-xs my-2'
            onChange={(e) =>
              e.target.value > 0
                ? setPriceQuery(e.target.value)
                : setPriceQuery(0)
            }
          />
          <p className='mx-[1vw] my-2 w-[60px] 2xl:mx-[0.5vw]'>${priceQuery}</p>
        </div>
      </div>

      <div className='flex flex-row justify-center w-full mt-10 flex-wrap gap-10 sm:gap-5'>
        {filtered.map((course, i) => (
          <CourseCard key={course._id} course={course} index={i} />
        ))}
      </div>
    </div>
  )
}

export default marketplace
