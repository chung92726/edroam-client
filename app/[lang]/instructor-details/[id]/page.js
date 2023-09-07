import { getDictionary } from '../../dictionaries.js';
import InstructorDetailsPage from '../[id]/instructor_details.js';

const InstructorDetails = async ({ params }) => {
  const { instructor_detail, allCat, levels, allLang, courseInfo} =
    await getDictionary(params.lang);
  return (
    <>
      <InstructorDetailsPage
        instructor_detail={instructor_detail}
        allCat={allCat}
        levels={levels}
        allLang={allLang}
        courseInfo={courseInfo}
        params={params}
      />
    </>
  );
};

export default InstructorDetails;
