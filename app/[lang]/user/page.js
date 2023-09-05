import { getDictionary } from '../dictionaries';
import UserMyLearning from './user.js';

const UserIndex = async ({ params: { lang } }) => {
  const { userMyLearning, userRoute } = await getDictionary(lang);
  return (
    <>
      <UserMyLearning userMyLearning={userMyLearning} userRoute={userRoute} />
    </>
  );
};

export default UserIndex;
