import { getDictionary } from '../dictionaries.js';
import LoginPage from './login.js';

const Login = async ({ params: { lang } }) => {
  const { login, footer, allCat } = await getDictionary(lang);
  return (
    <>
      <LoginPage login={login} footer={footer} allCat={allCat} />
    </>
  );
};

export default Login;
