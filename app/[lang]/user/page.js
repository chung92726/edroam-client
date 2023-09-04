import { getDictionary } from '../dictionaries';
import UserProfile from './user.js';

const UserIndex = async ({ params: { lang } }) => {
  const { userMyLearning, userRoute } = await getDictionary(lang);
  return (
    <>
      <UserProfile userMyLearning={userMyLearning} userRoute={userRoute} />
    </>
  );
};

export default UserIndex;
