import { getDictionary } from '../dictionaries';
import UserMyLearning from './user';

const UserIndex = async ({ params: { lang } }) => {
  const { userMyLearning, userRoute, allCat, levels, allLang, courseInfo } =
    await getDictionary(lang);
  return (
    <>
      <UserMyLearning
        userMyLearning={userMyLearning}
        userRoute={userRoute}
        allCat={allCat}
        levels={levels}
        allLang={allLang}
        courseInfo={courseInfo}
      />
    </>
  );
};

export default UserIndex;
