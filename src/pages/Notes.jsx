import { NOTES, formatDate } from '../notes.js'
import { usePrefs } from '../prefs.jsx'
import Reveal from '../components/Reveal.jsx'
import TLink from '../components/TLink.jsx'

export default function Notes() {
  const { t, lang } = usePrefs()
  return (
    <section className="page">
      <Reveal as="h1" className="display-md">
        {t('notes.title')} <sup>({String(NOTES.length).padStart(2, '0')})</sup>
      </Reveal>
      <Reveal as="p" className="lead small">
        {t('notes.intro')}
      </Reveal>

      {NOTES.length === 0 ? (
        <p className="muted">{t('notes.empty')}</p>
      ) : (
        <ul className="notes">
          {NOTES.map((n, i) => (
            <Reveal as="li" key={n.slug} delay={i * 0.05}>
              <TLink to={`/catatan/${n.slug}`} className="note" data-cursor={t('cursor.read')}>
                <span className="note-date tabular">{formatDate(n.date, lang)}</span>
                <span className="note-main">
                  <strong>{n.title}</strong>
                  <span>{n.summary}</span>
                </span>
                <span className="note-min">{t('notes.min', { n: n.minutes })}</span>
              </TLink>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  )
}
