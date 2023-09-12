import { getDictionary } from '../../../dictionaries.js';
import SingleCoursePage from './userCourse.js';

const SingleCourse = async ({ params }) => {
  const { userCourse, readMore, allRate } =
    await getDictionary(params.lang);
  return (
    <>
      <SingleCoursePage
        userCourse={userCourse}
        readMore={readMore}
        allRate={allRate}
        params={params}
      />
    </>
  );
};

export default SingleCourse;
