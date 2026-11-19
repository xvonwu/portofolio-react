import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LOCALES } from './locales.js'

const PrefsCtx = createContext(null)

const read = (k) => {
  try {
    return localStorage.getItem(k)
  } catch {
    return null
  }
}
const write = (k, v) => {
  try {
    localStorage.setItem(k, v)
  } catch {
    /* mode privat: abaikan */
  }
}

function initialLang() {
  const s = read('lang')
  if (s === 'id' || s === 'en') return s
  return (navigator.language || 'id').toLowerCase().startsWith('id') ? 'id' : 'en'
}
function initialTheme() {
  const s = read('theme')
  if (s === 'light' || s === 'dark') return s
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/** Menyimpan bahasa dan tema (diingat di perangkat) serta menyediakan t() dan loc(). */
export function PrefsProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.lang = lang
    write('lang', lang)
  }, [lang])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    write('theme', theme)
    document
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', theme === 'light' ? '#f1efe9' : '#121212')
  }, [theme])

  const t = useCallback(
    (key, vars) => {
      const v = LOCALES[lang][key] ?? LOCALES.id[key] ?? key
      if (typeof v !== 'string' || !vars) return v
      return v.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
    },
    [lang],
  )

  // Untuk data dua bahasa: { id: '...', en: '...' } -> teks sesuai bahasa aktif.
  const loc = useCallback(
    (x) => (x && typeof x === 'object' && !Array.isArray(x) ? (x[lang] ?? x.id) : x),
    [lang],
  )

  const value = useMemo(
    () => ({
      lang,
      setLang,
      theme,
      toggleTheme: () => setTheme((h) => (h === 'light' ? 'dark' : 'light')),
      t,
      loc,
    }),
    [lang, theme, t, loc],
  )

  return <PrefsCtx.Provider value={value}>{children}</PrefsCtx.Provider>
}

export const usePrefs = () => useContext(PrefsCtx)
