import { useMemo, useState } from 'react'
import { PROJECTS } from '../data.js'
import { usePrefs } from '../prefs.jsx'
import Reveal from '../components/Reveal.jsx'
import TLink from '../components/TLink.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import HoverPreview from '../components/HoverPreview.jsx'

const FILTERS = ['all', 'web', 'branding', 'app']

export default function Work() {
  const { t } = usePrefs()
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('grid') // 'grid' | 'list'
  const [hover, setHover] = useState(null)

  const list = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === filter)),
    [filter],
  )

  return (
    <section className="page">
      <Reveal as="h1" className="display-md">
        {t('work.title')} <sup>({String(list.length).padStart(2, '0')})</sup>
      </Reveal>

      <Reveal className="toolbar">
        <div className="filters" role="tablist" aria-label={t('filter.label')}>
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`chip ${filter === f ? 'on' : ''}`}
              onClick={() => setFilter(f)}
            >
              {t(`filter.${f}`)}
            </button>
          ))}
        </div>
        <div className="filters" role="group" aria-label={t('view.label')}>
          {['grid', 'list'].map((v) => (
            <button
              key={v}
              aria-pressed={view === v}
              className={`chip ${view === v ? 'on' : ''}`}
              onClick={() => {
                setView(v)
                setHover(null)
              }}
            >
              {t(`view.${v}`)}
            </button>
          ))}
        </div>
      </Reveal>

      {view === 'grid' ? (
        // key memaksa kartu dipasang ulang agar animasi muncul berjalan lagi saat filter berubah
        <div className="grid" key={`grid-${filter}`}>
          {list.map((p, i) => (
            <ProjectCard key={p.id} p={p} className={i % 2 ? 'offset' : ''} />
          ))}
        </div>
      ) : (
        <ul className="rows" key={`list-${filter}`} onMouseLeave={() => setHover(null)}>
          {list.map((p) => (
            <Reveal as="li" key={p.id} onMouseEnter={() => setHover(p)}>
              <TLink to={`/karya/${p.id}`} className="row" data-cursor={t('cursor.view')}>
                <span className="row-title">{p.title}</span>
                <span className="row-meta">
                  {t(`type.${p.type}`)} · {p.year}
                </span>
              </TLink>
            </Reveal>
          ))}
        </ul>
      )}

      <HoverPreview project={view === 'list' ? hover : null} />
    </section>
  )
}
