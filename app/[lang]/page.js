import { i18n } from '@/next-i18next.config'
import { getDictionary } from './dictionaries.js'

import HomePage from '@/components/homePage/Home'

const Home = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return (
    <>
      <HomePage dict={dict} />
    </>
  )
}

export default Home
