import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const LanguageSwitch = () => {
  const { i18n } = useTranslation()
  const resolvedLanguage = i18n.resolvedLanguage ?? i18n.language
  const isRussian = resolvedLanguage?.startsWith('ru')

  const toggleLanguage = () => {
    const nextLang = isRussian ? 'en' : 'ru'
    i18n.changeLanguage(nextLang)
  }

  return (
    <Button color="inherit" onClick={toggleLanguage} sx={{ minWidth: 44, fontWeight: 700 }}>
      {isRussian ? 'RU' : 'EN'}
    </Button>
  )
}
