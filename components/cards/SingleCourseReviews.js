'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Readmore from '@/components/readmore/Readmore';
import moment from 'moment';

const SingleCourseReviews = ({
  course,
  courseDetailPage,
  allRate,
  readMore,
}) => {
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [modifiedAverageRating, setModifiedAverageRating] = useState(0);
  const [reviewPercentage, setReviewPercentage] = useState([0, 0, 0, 0, 0]);
  const [displayedReview, setDisplayedReview] = useState(10);
  const loadMoreReviews = () => {
    setDisplayedReview(reviews.length);
  };

  const loadCourseReviews = async () => {
    try {
      const { data } = await axios.get(
        `/api/course-review/${course._id}?search=${search}&rating=${ratingFilter}`
      );

      setReviews(data.reviews);
      setReviewCount(data.totalCount);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const loadCourseReviewStats = async () => {
    try {
      const { data } = await axios.get(
        `/api/course-review-stats/${course._id}`
      );
      console.log(data);
      if (data.avgRating) {
        setAverageRating(data.avgRating.toFixed(1));
        // ratingPercentages from object to array
        const ratingPercentages = Object.values(data.ratingPercentages);
        setReviewPercentage(ratingPercentages.reverse());
        setModifiedAverageRating(Math.round(data.avgRating * 2) / 2);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    loadCourseReviewStats();
  }, [reviews]);

  useEffect(() => {
    loadCourseReviews();
  }, [search, ratingFilter]);

  return (
    <div className='flex flex-col justify-center items-center pb-8'>
      <div className=' w-full lg:max-w-[1080px]'>
        <div className='flex flex-col justify-start mx-10 pt-6 pb-3'>
          <h4 className='text-[20px] font-bold mb-4'>
            {courseDetailPage.Overview}
          </h4>
        </div>
        <div className='flex flex-col md:flex-row w-full justify-start items-center mb-4 md:px-10'>
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
              {reviewCount}
              {courseDetailPage.Reviews}
            </p>
          </div>
          <div className=' hidden md:flex flex-col justify-start items-start ml-8 w-full'>
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
        <div className='flex w-full justify-start items-center px-10'>
          <h1 className='text-2xl font-bold mb-3'>
            {courseDetailPage.ReviewsHead}
          </h1>
        </div>
        <div className='flex flex-col md:flex-row w-full  items-center justify-center md:items-end md:px-0 px-4'>
          <div className='flex flex-row justify-center items-center w-full max-w-md mx-2 mb-2 bg-white border-2 rounded-lg'>
            <input
              type='text'
              placeholder={courseDetailPage.SearchReviews}
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
              setRatingFilter(e.target.value);
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
        {reviews.length === 0 && (
          <div className='flex justify-center items-center py-10'>
            <p className=' font-bold'>{courseDetailPage.NoReviews}</p>
          </div>
        )}
        {reviews.length > 0 &&
          reviews.slice(0, displayedReview).map((review, i) => (
            <div className='flex justify-start items-start mt-4 w-full md:px-10 px-4'>
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
        {displayedReview < reviews.length && (
          <div className='flex justify-center my-4 w-full'>
            <button
              className='btn btn-active w-[90%]'
              onClick={loadMoreReviews}
            >
              {courseDetailPage.Load}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCourseReviews;
