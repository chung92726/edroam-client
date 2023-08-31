import { getDictionary } from '../dictionaries.js';
import RegisterPage from './register.js'

const Register = async ({ params: { lang } }) => {
  const {register} = await getDictionary(lang);
  return (
    <>
      <RegisterPage register={register} />
    </>
  )
}

export default Register