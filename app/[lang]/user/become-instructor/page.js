import { getDictionary } from '../../dictionaries';
import BecomeInstructorPage from './become-instructor.js';

const BecomeInstructor = async ({ params: { lang } }) => {
  const { userBeInstructorPage, footer, allCat } = await getDictionary(lang);

  return (
    <>
      <BecomeInstructorPage
        userBeInstructorPage={userBeInstructorPage}
        footer={footer}
        allCat={allCat}
      />
    </>
  );
};

export default BecomeInstructor;
