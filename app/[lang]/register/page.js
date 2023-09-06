import { getDictionary } from '../dictionaries.js';
import RegisterPage from './register.js';

const Register = async ({ params: { lang } }) => {
  const { register, footer, allCat } = await getDictionary(lang);
  return (
    <>
      <RegisterPage register={register} footer={footer} allCat={allCat} />
    </>
  );
};

export default Register;
