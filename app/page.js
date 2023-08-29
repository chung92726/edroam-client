'use client';

import { i18n } from '@/next-i18next.config';
import { getDictionary } from '@/lib/dictionary';
import { useSearchParams } from 'next/navigation';

import HomePage from '@/components/homePage/Home';
import { useEffect } from 'react';

const Home = async () => {
  const languageParams = useSearchParams();
  let language = languageParams.get('lang');
  if (language == null) {
    language = 'en';
  }
  useEffect(async () => {
    console.log(language);
  }, []);
  const { home } = await getDictionary(language);

  return (
    <>
      <HomePage home={home} />
    </>
  );
};

export default Home;
