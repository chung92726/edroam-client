import { getDictionary } from '../dictionaries.js';
import ForgotPasswordPage from './forgot-password.js';

const Forgot_Pw = async ({ params: { lang } }) => {
  const { forgot_pw } = await getDictionary(lang);
  return (
    <>
      <ForgotPasswordPage forgot_pw={forgot_pw} />
    </>
  );
};

export default Forgot_Pw;