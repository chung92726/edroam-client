import { getDictionary } from '../dictionaries.js';
import LoginPage from './login.js'

const Login = async ({ params: { lang } }) => {
  const {login} = await getDictionary(lang);
  return (
    <>
      <LoginPage login={login} />
    </>
  )
}

export default Login