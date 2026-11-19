import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useApp } from '../context.js'
import { usePrefs } from '../prefs.jsx'
import { PROFILE, PROJECTS } from '../data.js'
import TLink from '../components/TLink.jsx'
import Magnetic from '../components/Magnetic.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitWords from '../components/SplitWords.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Testimonials from '../components/Testimonials.jsx'

export default function Home() {
  const { loaded } = useApp()
  const { t, loc } = usePrefs()
  const hero = useRef(null)
  const lines = t('hero.lines')

  // Sembunyikan baris judul sebelum cat pertama (sebelum browser menggambar).
  useLayoutEffect(() => {
    const ctx = gsap.context(() => gsap.set('.line > span', { yPercent: 110 }), hero)
    return () => ctx.revert()
  }, [])

  // Judul masuk baris demi baris setelah loader selesai (atau setelah tirai terbuka).
  // Selektor dicari di dalam elemen hero (scope konteks).
  useEffect(() => {
    if (!loaded) return
    const ctx = gsap.context(() => {
      gsap.to('.line > span', {
        yPercent: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.25,
      })
      gsap.from('.hero-fade', { opacity: 0, y: 24, duration: 1, delay: 0.9, stagger: 0.1 })
    }, hero)
    return () => ctx.revert()
  }, [loaded])

  const featured = PROJECTS.slice(0, 4)

  return (
    <>
      <section ref={hero} className="hero">
        <h1 className="display" aria-label={lines.join(' ')}>
          {lines.map((l) => (
            <span key={l} className="line" aria-hidden="true">
              <span>{l}</span>
            </span>
          ))}
        </h1>
        <div className="hero-row">
          <p className="hero-intro hero-fade">{loc(PROFILE.intro)}</p>
          <div className="hero-fade">
            <Magnetic>
              <TLink to="/tentang" className="round round-ghost">
                <span>{t('hero.about')}</span>
              </TLink>
            </Magnetic>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal as="div" className="section-head">
          <p className="eyebrow">{t('home.latest')}</p>
          <p className="eyebrow">{t('home.count', { n: String(PROJECTS.length).padStart(2, '0') })}</p>
        </Reveal>
        <div className="grid">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} p={p} className={i % 2 ? 'offset' : ''} />
          ))}
        </div>
        <div className="center">
          <Magnetic>
            <TLink to="/karya" className="round">
              <span>{t('home.more', { n: PROJECTS.length - featured.length })}</span>
            </TLink>
          </Magnetic>
        </div>
      </section>

      <Testimonials />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>{t('marquee')} ●</span>
          ))}
        </div>
      </div>

      <section className="section cta">
        <SplitWords as="h2" className="display-sm" text={t('cta.title')} />
        <Reveal>
          <Magnetic strength={0.45}>
            <TLink to="/kontak" className="round round-accent">
              <span>{t('cta.btn')}</span>
            </TLink>
          </Magnetic>
        </Reveal>
      </section>
    </>
  )
}
