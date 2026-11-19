import { useParams } from 'react-router-dom'
import { NOTES, formatDate } from '../notes.js'
import { usePrefs } from '../prefs.jsx'
import Reveal from '../components/Reveal.jsx'
import Markdown from '../components/Markdown.jsx'
import TLink from '../components/TLink.jsx'
import NotFound from './NotFound.jsx'

export default function NotePost() {
  const { slug } = useParams()
  const { t, lang } = usePrefs()
  const note = NOTES.find((n) => n.slug === slug)
  if (!note) return <NotFound />

  return (
    <article className="page post">
      <Reveal>
        <TLink to="/catatan" className="back">
          ← {t('notes.back')}
        </TLink>
      </Reveal>
      <Reveal as="h1" className="display-sm post-title" delay={0.05}>
        {note.title}
      </Reveal>
      <Reveal as="p" className="eyebrow" delay={0.1}>
        {formatDate(note.date, lang)} · {t('notes.min', { n: note.minutes })}
      </Reveal>
      <Reveal delay={0.12}>
        <Markdown source={note.body} />
      </Reveal>
    </article>
  )
}
