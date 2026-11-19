import { useEffect, useState } from 'react'
import { PROFILE } from '../data.js'
import { usePrefs } from '../prefs.jsx'

function useLocalTime(timeZone, locale) {
  const fmt = () =>
    new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
      hour12: false,
    }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone, locale])
  return time
}

export default function Footer() {
  const { t, lang } = usePrefs()
  const time = useLocalTime(PROFILE.timeZone, lang === 'id' ? 'id-ID' : 'en-GB')
  return (
    <footer className="footer">
      <div>
        <p className="eyebrow">{t('f.edition')}</p>
        <p>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
      </div>
      <div>
        <p className="eyebrow">{t('f.time')}</p>
        <p className="tabular">{time}</p>
      </div>
      <div>
        <p className="eyebrow">{t('f.social')}</p>
        <p className="footer-socials">
          {PROFILE.socials.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </p>
      </div>
    </footer>
  )
}
