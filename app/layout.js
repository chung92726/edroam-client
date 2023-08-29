import './globals.css';
import { Inter } from 'next/font/google';
import TopNav from '@/components/TopNav';
import { Provider } from '../context/index';
import LearningCard from '@/components/cards/LearningCard';

import { i18n } from '@/next.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'XLearners',
  description: 'Your best experience in Learning and Teaching',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang ?? i18n.defaultLocale} data-theme='winter'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <TopNav LearningCard={LearningCard} lang={params.lang} />
          <div className='pt-[70px] font-sans'>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
