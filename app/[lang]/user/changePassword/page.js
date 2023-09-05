// import UserRoute from '@/components/routes/UserRoutes';
import { getDictionary } from '../../dictionaries';
import ChangePassword from './changePassword.js';

const ChangePasswordPage = async ({ params: { lang } }) => {
  const { user, userRoute } = await getDictionary(lang);

  return (
    <>
      <ChangePassword user={user} userRoute={userRoute} />
    </>
  );
};
export default ChangePasswordPage;
