import React from 'react'

const AllCourse = () => {
  return (
    <div className='mt-4 flex flex-col justify-start items-center'>
      <input
        type='text'
        placeholder='Search Unanswered Questions'
        className='input  input-ghost  w-full max-w-sm '
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default AllCourse
