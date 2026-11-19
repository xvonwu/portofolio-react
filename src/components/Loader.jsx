import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GREETINGS } from '../data.js'
import { usePrefs } from '../prefs.jsx'

const STEP = 0.22 // detik per sapaan

/** Layar pembuka: sapaan berganti-ganti, lalu tirai naik dengan tepi bawah melengkung. */
export default function Loader({ onDone }) {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const { t } = usePrefs()

  useEffect(() => {
    const id = setInterval(() => setI((n) => Math.min(n + 1, GREETINGS.length - 1)), STEP * 1000)
    const tl = gsap.timeline({ delay: GREETINGS.length * STEP + 0.25, onComplete: onDone })
    tl.to(ref.current, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' })
    return () => {
      clearInterval(id)
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className="loader" role="status" aria-label={t('loading')}>
      <p className="loader-word">
        <span className="dot" /> {GREETINGS[i]}
      </p>
      <div className="loader-curve" />
    </div>
  )
}
