const RatingStars = ({ AverageRating, i }) => {
  const modifiedAverageRating = AverageRating
    ? Math.round(AverageRating * 2) / 2
    : 0
  return (
    <div className='rating rating-sm rating-half'>
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-1`}
        disabled
        checked={modifiedAverageRating === 0.5}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-2`}
        disabled
        checked={modifiedAverageRating === 1}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-1`}
        disabled
        checked={modifiedAverageRating === 1.5}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-2`}
        disabled
        checked={modifiedAverageRating === 2}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-1`}
        disabled
        checked={modifiedAverageRating === 2.5}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-2`}
        disabled
        checked={modifiedAverageRating === 3}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-1`}
        disabled
        checked={modifiedAverageRating === 3.5}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-2`}
        disabled
        checked={modifiedAverageRating === 4}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-1`}
        disabled
        checked={modifiedAverageRating === 4.5}
      />
      <input
        type='radio'
        name={`rating-course-${i}`}
        className={`${
          modifiedAverageRating === 0 ? 'bg-gray-300' : 'bg-indigo-500'
        } mask mask-star-2 mask-half-2`}
        disabled
        checked={modifiedAverageRating === 5}
      />
    </div>
  )
}

export default RatingStars
