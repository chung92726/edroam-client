import { getDictionary } from '../../dictionaries';
import CourseDetailPage from './course-detail.js';

const SingleCourse = async ({ params }) => {
  const { courseDetailPage, allCat, levels, allLang, courseInfo, footer } =
    await getDictionary(params.lang);
  return (
    <>
      <CourseDetailPage
        params={params}
        allCat={allCat}
        levels={levels}
        allLang={allLang}
        courseInfo={courseInfo}
        footer={footer}
        courseDetailPage={courseDetailPage}
      />
    </>
  );
};

export default SingleCourse;
