'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import CourseCard from '@/components/cards/CourseCard'
import { Pagination } from 'antd'
import CourseCardSkeleton from '@/components/skeleton/CourseCardSkeleton'

const marketplace = ({ params, marketPlace }) => {
  const [courses, setCourses] = useState([])
  const [filtered, setFiltered] = useState([])
  const [serchQuery, setSerchQuery] = useState('')
  const [levelQuery, setLevelQuery] = useState('')
  const [langQuery, setLangQuery] = useState('')
  const [priceQuery, setPriceQuery] = useState(99.99)
  const [sortBy, setSortBy] = useState('')
  const [categoryQuery, setCategoryQuery] = useState('')
  const [localSearchQuery, setLocalSearchQuery] = useState('')
  const [localPriceQuery, setLocalPriceQuery] = useState(99.99)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const category = [
    'WebDesign',
    'UIUXDesign',
    'GraphicDesign',
    '3DModeling',
    'VideoEditing',
    'Others',
  ]

  const handleCategory = async (event) => {
    router.push(`/marketplace/${event.target.value}`)
    setCategoryQuery(event.target.value)
  }

  const handleSearch = async () => {
    router.push(`/marketplace/search/${localSearchQuery}`)
  }

  const handlePriceQuery = async () => {
    localPriceQuery > 0 ? setPriceQuery(localPriceQuery) : setPriceQuery(0)
  }

  useEffect(() => {
    const fetchCourses = async () => {
      // console.log(params.slug)

      let endpoint = '/api/courses/search' // Default endpoint
      let searchValue = serchQuery
      let categoryValue = categoryQuery

      if (params.slug) {
        if (params.slug[0] === 'search') {
          setLocalSearchQuery(params.slug[1])
          searchValue = params.slug[1]
        } else {
          setCategoryQuery(params.slug[0])
          categoryValue = params.slug[0]
        }
      }

      const queryParts = []

      if (categoryValue) {
        queryParts.push(`category=${categoryValue}`)
      }
      if (searchValue) {
        queryParts.push(`search=${searchValue}`)
      }

      if (categoryQuery) {
        queryParts.push(`category=${categoryQuery}`)
      }
      if (serchQuery) {
        queryParts.push(`search=${serchQuery}`)
      }
      if (levelQuery) {
        queryParts.push(`level=${levelQuery}`)
      }
      if (langQuery) {
        queryParts.push(`language=${langQuery}`)
      }
      if (priceQuery >= 0) {
        queryParts.push(`price=${priceQuery}`)
      }
      if (sortBy) {
        queryParts.push(`sort=${sortBy}`)
      }
      if (page) {
        queryParts.push(`page=${page}`)
      }
      if (limit) {
        queryParts.push(`limit=${limit}`)
      }

      if (queryParts.length) {
        endpoint += '?' + queryParts.join('&')
      }

      try {
        console.log(endpoint)
        setLoading(true)
        const { data } = await axios.get(endpoint)
        console.log(data)
        setCourses(data)
        setFiltered(data.courses)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (params.slug) {
      if (
        (!category.some((el) => params.slug[0].includes(el)) &&
          params.slug[0] !== 'search') ||
        (params.slug[0] === 'search' && params.slug[1] === undefined)
      ) {
        router.push(`/marketplace`)
      }
    }
    fetchCourses()
  }, [levelQuery, langQuery, priceQuery, sortBy, page, limit])

  useEffect(() => {
    console.log(filtered)
  }, [filtered])

  return (
    <div className='flex flex-col justify-center items-center mt-10 w-full mb-10'>
      <div className='flex flex-wrap justify-center items-center'>
        {localSearchQuery && (
          <div className='flex font-bold text-2xl mx-[1.5vw] my-2 w-[90vw] 2xl:w-[14vw] 2xl:mx-[0.5vw]'>
            <span>{marketPlace.result}</span>"{localSearchQuery}"
          </div>
        )}
        {/* <input
          className='input input-bordered mx-[1.5vw] my-2 w-[90vw] 2xl:w-[14vw] 2xl:mx-[0.5vw]'
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // setSerchQuery(event.target.value.toLowerCase())
              handleSearch()
            }
          }}
          type='text'
          placeholder='Search...'
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
        /> */}
        <select
          className='select select-bordered mx-[1.5vw] my-2 w-[43.5vw] sm:w-[28vw] 2xl:w-[14vw] 2xl:mx-[0.5vw]'
          onChange={handleCategory}
          value={categoryQuery}
        >
          <option value=''>{marketPlace.all_cat}</option>
          <option value='WebDesign'>{marketPlace.web_des}</option>
          <option value='UIUXDesign'>{marketPlace.uiux_des}</option>
          <option value='GraphicDesign'>{marketPlace.graphic_des}</option>
          <option value='3DModeling'>{marketPlace.threed_mod}</option>
          <option value='VideoEditing'>{marketPlace.video_edit}</option>
          <option value='Others'>{marketPlace.others}</option>
        </select>
        <select
          className='select select-bordered mx-[1.5vw] my-2 w-[43.5vw] sm:w-[28vw] 2xl:w-[12vw] 2xl:mx-[0.5vw]'
          onChange={(e) => setLevelQuery(e.target.value)}
          value={levelQuery}
        >
          <option value=''>{marketPlace.all_level}</option>
          <option value='Beginner'>{marketPlace.beginner}</option>
          <option value='Intermediate'>{marketPlace.intermediate}</option>
          <option value='Expert'>{marketPlace.expert}</option>
        </select>
        <select
          className='select select-bordered mx-[1.5vw] my-2 w-[43.5vw] sm:w-[28vw] 2xl:w-[14vw] 2xl:mx-[0.5vw]'
          onChange={(e) => setLangQuery(e.target.value)}
          value={langQuery}
        >
          <option value=''>{marketPlace.all_lang}</option>
          <option value='English'>{marketPlace.eng}</option>
          <option value='Chinese'>{marketPlace.chi}</option>
        </select>
        <select
          className='select select-bordered mx-[1.5vw] my-2 w-[43.5vw] sm:w-[28vw] 2xl:w-[10vw] 2xl:mx-[0.5vw]'
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value=''>{marketPlace.sort_by}</option>
          <option value='price'>{marketPlace.lowest_price}</option>
          <option value='-created'>{marketPlace.latest_created}</option>
          <option value='-updated'>{marketPlace.latest_updated}</option>
        </select>
        <div className='flex flex-row justify-center items-center mx-[1.5vw] my-2 h-[3rem] w-[86vw] sm:w-[59vw] 2xl:w-[20vw] 2xl:mx-[0.5vw]'>
          <h1 className='mx-[1vw] my-2 2xl:mx-[0.5vw]'>{marketPlace.price}</h1>
          <input
            type='range'
            min={-0.01}
            max='99.99'
            step={1}
            value={localPriceQuery}
            className='range range-xs my-2'
            onChange={(e) =>
              e.target.value > 0
                ? setLocalPriceQuery(e.target.value)
                : setLocalPriceQuery(0)
            }
            onMouseUp={handlePriceQuery}
            onTouchEnd={handlePriceQuery}
          />
          <p className='mx-[1vw] my-2 w-[60px] 2xl:mx-[0.5vw]'>
            ${localPriceQuery}
          </p>
        </div>
      </div>

      {filtered && loading == false ? (
        <>
          <div className='flex flex-row justify-center w-full mt-10 flex-wrap gap-10 '>
            {filtered.map((course, i) => (
              <CourseCard key={course._id} course={course} index={i} />
            ))}
          </div>
          <div className='mt-5'>
            <Pagination
              total={courses.total}
              defaultPageSize={limit}
              defaultCurrent={1}
              current={page}
              onChange={(page, pageSize) => {
                setPage(page)
              }}
            />
          </div>
        </>
      ) : (
        <div className='flex flex-row justify-center w-full mt-10 flex-wrap gap-10 sm:gap-5'>
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </div>
      )}
    </div>
  )
}

export default marketplace
