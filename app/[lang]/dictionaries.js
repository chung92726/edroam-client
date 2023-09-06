import 'server-only'

const locales = ['en', 'zh', 'cn']

const dictionaries = {
  en: () =>
    import('../../dictionaries/en.json').then((module) => module.default),
  zh: () =>
    import('../../dictionaries/zh.json').then((module) => module.default),
  cn: () =>
    import('../../dictionaries/cn.json').then((module) => module.default),
}

export const getDictionary = async (locale) => {
  const lang = locale.slice(0, 2)
  // console.log(lang)
  if (!locales.includes(lang)) {
    return dictionaries['en']()
  }
  return dictionaries[lang]()
}
