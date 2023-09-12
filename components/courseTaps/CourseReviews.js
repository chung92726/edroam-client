'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdComment } from 'react-icons/md'
import Readmore from '@/components/readmore/Readmore'
import { getNumberOfDays } from '@/utils/helpers'
import moment from 'moment'

const CourseReviews = ({ course, reviews_tap, readMore, allRate}) => {
  const [search, setSearch] = useState('')
  const [ratingFilter, setRatingFilter] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [reviews, setReviews] = useState([])
  const [reviewCount, setReviewCount] = useState(0) 
  const [averageRating, setAverageRating] = useState(0)
  const [modifiedAverageRating, setModifiedAverageRating] = useState(0)
  const [reviewPercentage, setReviewPercentage] = useState([0, 0, 0, 0, 0])

  const loadCourseReviews = async () => {
    try {
      const { data } = await axios.get(
        `/api/course-review/${course._id}?search=${search}&rating=${ratingFilter}`
      )

      setReviews(data.reviews)
      setReviewCount(data.totalCount)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  const loadCourseReviewStats = async () => {
    try {
      const { data } = await axios.get(`/api/course-review-stats/${course._id}`)
      console.log(data)
      if (data.avgRating) {
        setAverageRating(data.avgRating.toFixed(1))
        // ratingPercentages from object to array
        const ratingPercentages = Object.values(data.ratingPercentages)
        setReviewPercentage(ratingPercentages.reverse())
        setModifiedAverageRating(Math.round(data.avgRating * 2) / 2)
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    loadCourseReviewStats()
  }, [reviews])

  useEffect(() => {
    loadCourseReviews()
  }, [search, ratingFilter])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/api/course-review/${course._id}`, {
        review,
        rating,
      })
      toast.success('Review posted')
      setComment('')
      setRating(5)
      loadCourseReviews()
    } catch (err) {
      console.log(err)
    }
  }
  //   const reviewPercentage = [69, 17, 17, 1, 1]
  return (
    <div className='flex flex-col justify-start items-center w-11/12 px-8 mt-2'>
      <div className='flex w-full justify-start items-center'>
        <h1 className='text-2xl font-bold mb-3'>{reviews_tap.overview}</h1>
      </div>
      <div className='flex flex-col md:flex-row w-full justify-start items-center mb-4'>
        <div className='flex flex-col justify-start items-center mb-4 md:mb-0'>
          <h1 className='text-[60px] font-bold text-indigo-400'>
            {averageRating}
          </h1>
          <div className='rating rating-md rating-half mb-2'>
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-1`}
              disabled
              checked={modifiedAverageRating === 0.5}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-2`}
              disabled
              checked={modifiedAverageRating === 1}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-1`}
              disabled
              checked={modifiedAverageRating === 1.5}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-2`}
              disabled
              checked={modifiedAverageRating === 2}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-1`}
              disabled
              checked={modifiedAverageRating === 2.5}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-2`}
              disabled
              checked={modifiedAverageRating === 3}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-1`}
              disabled
              checked={modifiedAverageRating === 3.5}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-2`}
              disabled
              checked={modifiedAverageRating === 4}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-1`}
              disabled
              checked={modifiedAverageRating === 4.5}
            />
            <input
              type='radio'
              name='rating-overview'
              className={`${
                modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
              } mask mask-star-2 mask-half-2`}
              disabled
              modifiedAverageRating={modifiedAverageRating === 5}
            />
          </div>
          <p className='text-md font-bold text-indigo-400'>
            {reviewCount}{reviews_tap.reviews}
          </p>
        </div>
        <div className='flex flex-col justify-start items-start ml-8 w-full'>
          {reviewPercentage.map((value, i) => (
            <div
              className='flex flex-row justify-center items-center w-full'
              key={i}
            >
              <progress
                className='progress progress-secondary w-full mr-4'
                value={value}
                max='100'
              ></progress>
              <div className='rating rating-md rating-half mb-2'>
                {/* <input
                  type='radio'
                  name='rating-10'
                  className='rating-hidden'
                /> */}
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-1'
                  disabled
                />
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-2'
                  disabled
                  checked={i === 4}
                />
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-1'
                  disabled
                />
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-2'
                  disabled
                  checked={i === 3}
                />
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-1'
                  disabled
                />
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-2'
                  disabled
                  checked={i === 2}
                />
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-1'
                  disabled
                />
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-2'
                  disabled
                  checked={i === 1}
                />
                <input
                  type='radio'
                  name={`rating-${i}-overview`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-1'
                  disabled
                />
                <input
                  type='radio'
                  name={`rating-${i}`}
                  className='bg-indigo-500 mask mask-star-2 mask-half-2'
                  disabled
                  checked={i === 0}
                />
              </div>
              <p className='text-md font-bold w-4 text-indigo-400 ml-4'>
                {value}%
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex w-full justify-start items-center'>
        <h1 className='text-2xl font-bold mb-3'>{reviews_tap.title}</h1>
      </div>
      <div className='flex flex-col md:flex-row w-full  items-center justify-center md:items-end '>
        <div className='flex flex-row justify-center items-center w-full max-w-md mx-2 mb-2 bg-white border-2 rounded-lg'>
          <input
            type='text'
            placeholder={reviews_tap.search}
            className='input  input-ghost  w-full max-w-md '
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <div className='px-3 py-3.5 bg-black rounded-lg cursor-pointer'>
                <BsSearch size={20} className='text-white' />
              </div> */}
        </div>

        <select
          className='select select-secondary w-full max-w-md md:max-w-[12rem] mb-2'
          onChange={(e) => {
            setRatingFilter(e.target.value)
          }}
        >
          <option value={''}>{allRate.All_Rate}</option>
          <option value={5}>{allRate.Five}</option>
          <option value={4}>{allRate.Four}</option>
          <option value={3}>{allRate.Three}</option>
          <option value={2}>{allRate.Two}</option>
          <option value={1}>{allRate.One}</option>
        </select>
      </div>
      {reviews.length > 0 &&
        reviews.map((review, i) => (
          <div className='flex justify-start items-start mt-4 w-full'>
            <div className='avatar mr-4'>
              <div className='bg-neutral-focus rounded-full w-12'>
                <img src={review.userId.picture} alt='' />
              </div>
            </div>
            <div className='flex flex-col justify-start items-start'>
              <p className='text-md font-bold text-indigo-400 mb-2'>
                {review.userId.name}
              </p>
              <div className='flex flex-row justify-start items-start'>
                <div className='rating rating-md rating-half mb-2'>
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-1'
                    checked={review.rating === 0.5}
                    disabled
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-2'
                    disabled
                    checked={review.rating === 1}
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-1'
                    disabled
                    checked={review.rating === 1.5}
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-2'
                    disabled
                    checked={review.rating === 2}
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-1'
                    disabled
                    checked={review.rating === 2.5}
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-2'
                    disabled
                    checked={review.rating === 3}
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-1'
                    disabled
                    checked={review.rating === 3.5}
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-2'
                    disabled
                    checked={review.rating === 4}
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-1'
                    disabled
                    checked={review.rating === 4.5}
                  />
                  <input
                    type='radio'
                    name={`rating-${i}`}
                    className='bg-indigo-500 mask mask-star-2 mask-half-2'
                    disabled
                    checked={review.rating === 5}
                  />
                </div>
                <p className='text-md font-bold w-full text-gray-400 ml-4'>
                  {moment(new Date(review.createdAt)).fromNow()}
                </p>
              </div>
              <Readmore readMore={readMore}>{review.review}</Readmore>
            </div>
          </div>
        ))}
      <div className='flex flex-col justify-start items-start my-4 w-full'>
        <h1 className='text-2xl font-bold mb-3 mt-4'>{reviews_tap.add_review}</h1>
        <div className='rating rating-md rating-half mb-2'>
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-1'
            value={0.5}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-2'
            value={1}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-1'
            value={1.5}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-2'
            value={2}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-1'
            value={2.5}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-2'
            value={3}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-1'
            value={3.5}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-2'
            value={4}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-1'
            value={4.5}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type='radio'
            name='rating-comment'
            className='bg-indigo-500 mask mask-star-2 mask-half-2'
            value={5}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <textarea
          placeholder='Leave Your Comment Here'
          className='textarea textarea-bordered textarea-md w-full mt-4 h-[150px]'
          onChange={(e) => setReview(e.target.value)}
          value={review}
        ></textarea>
        <button className='btn  btn-neutral my-3' onClick={handleSubmit}>
          {reviews_tap.submit}
        </button>
      </div>
    </div>
  )
}

export default CourseReviews
