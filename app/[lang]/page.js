import { i18n } from '@/next-i18next.config';
import { getDictionary } from './dictionaries.js';

import HomePage from '@/components/homePage/Home';

const Home = async ({ params: { lang } }) => {
  const { home, footer, allCat } = await getDictionary(lang);
  return (
    <>
      <HomePage home={home} footer={footer} allCat={allCat} />
    </>
  );
};

export default Home;
