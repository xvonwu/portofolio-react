import { useParams } from 'react-router-dom'
import { PROJECTS, TYPE_COPY } from '../data.js'
import { usePrefs } from '../prefs.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitWords from '../components/SplitWords.jsx'
import ProjectMedia from '../components/ProjectMedia.jsx'
import Magnetic from '../components/Magnetic.jsx'
import TLink from '../components/TLink.jsx'
import NotFound from './NotFound.jsx'

export default function Project() {
  const { id } = useParams()
  const { t, loc } = usePrefs()
  const idx = PROJECTS.findIndex((p) => p.id === id)
  if (idx < 0) return <NotFound />

  const p = PROJECTS[idx]
  const next = PROJECTS[(idx + 1) % PROJECTS.length]
  const copy = TYPE_COPY[p.type]
  const pick = (k) => loc(p[k] ?? copy[k])
  const hasLink = typeof p.url === 'string' && /^https?:\/\//.test(p.url)

  const meta = [
    [t('p.role'), pick('role')],
    [t('p.year'), String(p.year)],
    [t('p.type'), t(`type.${p.type}`)],
  ]

  return (
    <article className="page project">
      <Reveal>
        <TLink to="/karya" className="back">
          ← {t('p.back')}
        </TLink>
      </Reveal>

      <SplitWords as="h1" className="display-md project-title" text={p.title} />
      <Reveal as="p" className="lead small" delay={0.1}>
        {pick('summary')}
      </Reveal>

      <dl className="meta">
        {meta.map(([k, v], i) => (
          <Reveal key={k} delay={i * 0.06}>
            <dt className="eyebrow">{k}</dt>
            <dd>{v}</dd>
          </Reveal>
        ))}
        <Reveal delay={0.18}>
          <dt className="eyebrow">{t('p.tech')}</dt>
          <dd className="tags">
            {p.tech.map((x) => (
              <span key={x} className="tag">
                {x}
              </span>
            ))}
          </dd>
        </Reveal>
      </dl>

      <Reveal className="project-hero">
        <ProjectMedia p={p} className="wide" parallax={6} />
      </Reveal>

      <div className="case">
        {['challenge', 'solution', 'result'].map((k, i) => (
          <Reveal key={k} delay={i * 0.06} className="case-item">
            <p className="eyebrow">
              {String(i + 1).padStart(2, '0')} · {t(`p.${k}`)}
            </p>
            <p>{pick(k)}</p>
          </Reveal>
        ))}
      </div>

      <div className="gallery">
        {[1, 2, 3].map((v) => (
          <Reveal key={v} className={v === 3 ? 'span-2' : ''}>
            <ProjectMedia p={p} variant={v} className={v === 3 ? 'wide' : ''} parallax={5} />
          </Reveal>
        ))}
      </div>

      {hasLink && (
        <div className="center tight">
          <Magnetic strength={0.4}>
            <a className="round round-accent" href={p.url} target="_blank" rel="noopener noreferrer">
              <span>{t('p.visit')} ↗</span>
            </a>
          </Magnetic>
        </div>
      )}

      <TLink to={`/karya/${next.id}`} className="next" data-cursor={t('cursor.view')}>
        <span className="eyebrow">{t('p.next')}</span>
        <span className="next-title display-md">{next.title}</span>
      </TLink>
    </article>
  )
}
