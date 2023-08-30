import './globals.css'
import { Inter } from 'next/font/google'
import TopNav from '@/components/TopNav'
import { Provider } from '../../context/index'
import LearningCard from '@/components/cards/LearningCard'
import { getDictionary } from './dictionaries.js'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'XLearners',
  description: 'Your best experience in Learning and Teaching',
}

export default async function RootLayout({ children, params: { lang } }) {
  const dict = await getDictionary(lang)
  // set cookie to lang

  return (
    <html lang={lang} data-theme='winter'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <TopNav LearningCard={LearningCard} dict={dict} lang={lang} />
          <div className='pt-[70px] font-sans'>{children}</div>
        </Provider>
      </body>
    </html>
  )
}
