import { getDictionary } from '../../dictionaries';
import BecomeInstructorPage from './become-instructor.js';

const BecomeInstructor = async ({ params: { lang } }) => {
  const { userBeInstructorPage } = await getDictionary(lang);

  return (
    <>
      <BecomeInstructorPage userBeInstructorPage={userBeInstructorPage} />
    </>
  );
};

export default BecomeInstructor;
