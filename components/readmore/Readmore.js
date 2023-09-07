'use client';

import React, { useState } from 'react';

const ReadMore = ({ readMore, children, maxCharacterCount = 250 }) => {
  const text = children;
  const [isTruncated, setIsTruncated] = useState(true);

  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

  function toggleIsTruncated() {
    setIsTruncated(!isTruncated);
  }

  return (
    <div className='flex flex-col justify-start items-start'>
      <p className='text-md text-grey-300'>
        {resultString}
        {isTruncated && '...'}
      </p>
      {text.length > maxCharacterCount && (
        <button
          onClick={toggleIsTruncated}
          className='text-indigo-500 text-md font-bold mt-2'
        >
          {isTruncated ? `${readMore.More}` : `${readMore.Less}`}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
