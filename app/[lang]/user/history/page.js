import { getDictionary } from '../../dictionaries';
import HistoryPage from './history.js';

const EnrollmentHistory = async ({ params: { lang } }) => {
  const { user, userRoute } = await getDictionary(lang);

  return (
    <>
      <HistoryPage user={user} userRoute={userRoute} />
    </>
  );
};

export default EnrollmentHistory;
