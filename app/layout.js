import './globals.css'
import { Inter } from 'next/font/google'
import TopNav from '../components/TopNav'
import { Provider } from '../context/index'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EdRoam',
  description: 'Your best experience in Learning and Teaching',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='winter'>
      <body className={inter.className}>
        <Provider>
          <TopNav />
          <div className='pt-[70px] font-sans'>{children}</div>
        </Provider>
      </body>
    </html>
  )
}
