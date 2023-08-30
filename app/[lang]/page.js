import { i18n } from '@/next-i18next.config';
import { getDictionary } from './dictionaries.js';

import HomePage from '@/components/homePage/Home';

const Home = async ({ params: { lang } }) => {
  const { home } = await getDictionary(lang);
  return (
    <>
      <HomePage home={home} />
    </>
  );
};

export default Home;
