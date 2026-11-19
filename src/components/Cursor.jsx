import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { finePointer } from '../hooks.js'

/** Kursor kustom: lingkaran yang mengikuti mouse, membesar di tautan, dan bisa menampilkan label. */
export default function Cursor() {
  const ref = useRef(null)
  const [state, setState] = useState({ link: false, label: '' })

  useEffect(() => {
    if (!finePointer() || !ref.current) return
    gsap.set(ref.current, { xPercent: -50, yPercent: -50, opacity: 0 })
    const x = gsap.quickTo(ref.current, 'x', { duration: 0.45, ease: 'power3' })
    const y = gsap.quickTo(ref.current, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e) => {
      gsap.to(ref.current, { opacity: 1, duration: 0.3, overwrite: 'auto' })
      x(e.clientX)
      y(e.clientY)
    }
    const over = (e) => {
      const el = e.target.closest?.('a, button, input, textarea, [data-cursor]')
      setState({
        link: !!el,
        label: el?.closest('[data-cursor]')?.dataset.cursor || '',
      })
    }
    const leave = () => gsap.to(ref.current, { opacity: 0, duration: 0.3 })

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`cursor ${state.link ? 'is-link' : ''} ${state.label ? 'has-label' : ''}`}
    >
      <span>{state.label}</span>
    </div>
  )
}
