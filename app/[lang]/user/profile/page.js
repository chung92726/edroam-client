import { getDictionary } from '../../dictionaries';
import Profile from './profile.js';

const ProfilePage = async ({ params: { lang } }) => {
  const { userProfilePage, userRoute } = await getDictionary(lang);

  return (
    <>
      <Profile userProfilePage={userProfilePage} userRoute={userRoute} />
    </>
  );
};

export default ProfilePage;
