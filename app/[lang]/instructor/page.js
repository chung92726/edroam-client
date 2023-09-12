import { getDictionary } from '../dictionaries';
import InstructorPage from './instructor.js';

const InstructorIndex = async ({ params: { lang } }) => {
  const { instructorPage, allCat } = await getDictionary(lang);

  return (
    <>
      <InstructorPage instructorPage={instructorPage} allCat={allCat} />
    </>
  );
};

export default InstructorIndex;
