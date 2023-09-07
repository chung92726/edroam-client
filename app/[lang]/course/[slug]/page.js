import { getDictionary } from '../../dictionaries';
import CourseDetailPage from './course-detail.js';

const SingleCourse = async ({ params }) => {
  const {
    courseDetailPage,
    allCat,
    levels,
    allLang,
    courseInfo,
    allRate,
    readMore,
  } = await getDictionary(params.lang);
  return (
    <>
      <CourseDetailPage
        params={params}
        allCat={allCat}
        levels={levels}
        allLang={allLang}
        courseInfo={courseInfo}
        allRate={allRate}
        courseDetailPage={courseDetailPage}
        readMore={readMore}
      />
    </>
  );
};

export default SingleCourse;
