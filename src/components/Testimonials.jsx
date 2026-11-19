import { useEffect, useState } from 'react'
import { TESTIMONIALS } from '../data.js'
import { usePrefs } from '../prefs.jsx'
import Reveal from './Reveal.jsx'

/** Slider testimoni: otomatis berganti tiap 7 detik, berhenti saat di-hover/fokus, bisa diklik. */
export default function Testimonials() {
  const { t, loc } = usePrefs()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length

  useEffect(() => {
    if (paused || n < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((v) => (v + 1) % n), 7000)
    return () => clearInterval(id)
  }, [paused, n])

  if (!n) return null
  const cur = TESTIMONIALS[i]
  const go = (d) => setI((v) => (v + d + n) % n)

  return (
    <section
      className="section testi"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Reveal as="div" className="section-head">
        <p className="eyebrow">{t('testi.title')}</p>
        <p className="eyebrow tabular">
          {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </p>
      </Reveal>

      <Reveal>
        <figure className="testi-body" aria-live="polite">
          <blockquote key={i} className="testi-quote">
            “{loc(cur.quote)}”
          </blockquote>
          <figcaption>
            <strong>{cur.name}</strong>
            <span>{loc(cur.role)}</span>
          </figcaption>
        </figure>

        {n > 1 && (
          <div className="testi-nav">
            <button className="icon-btn bordered" onClick={() => go(-1)} aria-label={t('testi.prev')}>
              ←
            </button>
            <div className="dots">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  className={`dot-btn ${k === i ? 'on' : ''}`}
                  onClick={() => setI(k)}
                  aria-label={t('testi.go', { n: k + 1 })}
                  aria-current={k === i}
                />
              ))}
            </div>
            <button className="icon-btn bordered" onClick={() => go(1)} aria-label={t('testi.next')}>
              →
            </button>
          </div>
        )}
      </Reveal>
    </section>
  )
}
