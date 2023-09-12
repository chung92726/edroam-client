import { getDictionary } from '../../dictionaries';
import RegisterInstructorPage from './register-instructor.js';

const RegisterInstructor = async ({ params: { lang } }) => {
  const { userRegInstructorPage } = await getDictionary(lang);

  return (
    <>
      <RegisterInstructorPage userRegInstructorPage={userRegInstructorPage} />
    </>
  );
};

export default RegisterInstructor;
