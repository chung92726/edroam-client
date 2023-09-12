import { getDictionary } from '../../../../dictionaries';
import InstructorViewPage from './view.js';

const CourseView = async ({ params }) => {
  const { instructorViewPage, instructorPage, addLessonForm } =
    await getDictionary(params.lang);

  return (
    <>
      <InstructorViewPage
        instructorViewPage={instructorViewPage}
        instructorPage={instructorPage}
        addLessonForm={addLessonForm}
        params={params}
      />
    </>
  );
};

export default CourseView;
