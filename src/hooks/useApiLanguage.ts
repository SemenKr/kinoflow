import { getApiLanguage } from '@/app/providers/i18n.config'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const useApiLanguage = () => {
  const { i18n } = useTranslation()

  return useMemo(() => getApiLanguage(i18n.resolvedLanguage), [i18n.resolvedLanguage])
}
