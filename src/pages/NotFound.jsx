import { usePrefs } from '../prefs.jsx'
import Reveal from '../components/Reveal.jsx'
import Magnetic from '../components/Magnetic.jsx'
import TLink from '../components/TLink.jsx'

export default function NotFound() {
  const { t } = usePrefs()
  return (
    <section className="page notfound">
      <Reveal as="p" className="display">
        404
      </Reveal>
      <Reveal as="h1" className="display-sm" delay={0.05}>
        {t('nf.title')}
      </Reveal>
      <Reveal as="p" className="lead" delay={0.1}>
        {t('nf.text')}
      </Reveal>
      <Reveal delay={0.15}>
        <Magnetic strength={0.4}>
          <TLink to="/" className="round round-accent">
            <span>{t('nf.back')}</span>
          </TLink>
        </Magnetic>
      </Reveal>
    </section>
  )
}
