import { useLocation } from 'react-router-dom'
import TLink from './TLink.jsx'
import Magnetic from './Magnetic.jsx'
import { NAV, PROFILE } from '../data.js'
import { usePrefs } from '../prefs.jsx'

function ThemeIcon({ theme }) {
  // tema gelap -> tampilkan matahari (aksi: ganti ke terang); sebaliknya bulan
  return theme === 'dark' ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

export default function Header({ open, setOpen }) {
  const { pathname } = useLocation()
  const { t, lang, setLang, theme, toggleTheme } = usePrefs()
  const current = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <>
      <header className="header">
        <TLink to="/" className="logo" aria-label={t('header.home')}>
          <span className="logo-mark">©</span>
          <span className="logo-text">
            <span>{t('header.codeBy')}</span>
            <span>{PROFILE.name}</span>
          </span>
        </TLink>

        <div className="header-right">
          <button
            className="icon-btn lang-btn"
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            aria-label={t('lang.switch')}
            title={t('lang.switch')}
          >
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('theme.toLight') : t('theme.toDark')}
            title={theme === 'dark' ? t('theme.toLight') : t('theme.toDark')}
          >
            <ThemeIcon theme={theme} />
          </button>
          <Magnetic strength={0.4}>
            <button
              className={`menu-btn ${open ? 'active' : ''}`}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="menu"
            >
              <span className="menu-btn-label">{open ? t('menu.close') : t('menu.open')}</span>
              <span className="burger" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      <nav id="menu" className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <p className="eyebrow">{t('menu.nav')}</p>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.to} style={{ '--i': i }} className={current(n.to) ? 'current' : ''}>
              <TLink to={n.to} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                <span>{t(n.key)}</span>
              </TLink>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <p className="eyebrow">{t('menu.social')}</p>
          <div className="menu-socials">
            {PROFILE.socials.map((s) => (
              <a key={s.label} href={s.href} tabIndex={open ? 0 : -1}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
