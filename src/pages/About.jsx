import { PROFILE, SKILLS, STATS, TIMELINE } from '../data.js'
import { usePrefs } from '../prefs.jsx'
import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import Magnetic from '../components/Magnetic.jsx'
import SplitWords from '../components/SplitWords.jsx'
import TLink from '../components/TLink.jsx'

export default function About() {
  const { t, loc } = usePrefs()
  const lead = t('about.lead', { name: PROFILE.name, intro: loc(PROFILE.intro), city: PROFILE.city })

  return (
    <section className="page">
      <Reveal as="h1" className="display-md">
        {t('about.title')}
      </Reveal>

      <SplitWords as="p" className="lead" text={lead} stagger={0.02} />

      {PROFILE.photo && (
        <Reveal className="portrait">
          <img src={PROFILE.photo} alt={t('about.photo', { name: PROFILE.name })} loading="lazy" />
        </Reveal>
      )}

      <div className="stats">
        {STATS.map((s, i) => (
          <Reveal key={s.value} delay={i * 0.08} className="stat">
            <strong>
              <CountUp to={s.value} suffix={s.suffix} />
            </strong>
            <span>{loc(s.label)}</span>
          </Reveal>
        ))}
      </div>

      <div className="two-col">
        <div>
          <Reveal as="p" className="eyebrow">
            {t('about.skills')}
          </Reveal>
          <ul className="list">
            {SKILLS.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.04}>
                {loc(s)}
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Reveal as="p" className="eyebrow">
            {t('about.journey')}
          </Reveal>
          <ul className="list timeline">
            {TIMELINE.map((x, i) => (
              <Reveal as="li" key={x.year} delay={i * 0.04}>
                <b>{x.year}</b>
                <span>{loc(x.text)}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div className="center actions">
        <Magnetic strength={0.45}>
          <TLink to="/kontak" className="round round-accent">
            <span>{t('about.talk')}</span>
          </TLink>
        </Magnetic>
        {PROFILE.cv && (
          <a className="pill" href={PROFILE.cv} download>
            {t('about.cv')} ↓
          </a>
        )}
      </div>
    </section>
  )
}
