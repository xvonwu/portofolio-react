import Reveal from './Reveal.jsx'
import TLink from './TLink.jsx'
import ProjectMedia from './ProjectMedia.jsx'
import { usePrefs } from '../prefs.jsx'

/** Kartu proyek: tautan ke halaman detail, label kursor "Lihat", media dengan parallax. */
export default function ProjectCard({ p, className = '' }) {
  const { t } = usePrefs()
  return (
    <TLink to={`/karya/${p.id}`} className={`card-link ${className}`}>
      <Reveal as="article" className="card" data-cursor={t('cursor.view')}>
        <ProjectMedia p={p} />
        <div className="card-meta">
          <h3>{p.title}</h3>
          <p>
            {t(`type.${p.type}`)} · {p.year}
          </p>
        </div>
      </Reveal>
    </TLink>
  )
}
