import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { finePointer } from '../hooks.js'
import ProjectMedia from './ProjectMedia.jsx'

/** Pratinjau gambar yang melayang mengikuti kursor (hanya untuk perangkat dengan mouse). */
export default function HoverPreview({ project }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!finePointer() || !ref.current) return
    const el = ref.current
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.8 })
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    let first = true
    const move = (e) => {
      if (first) {
        gsap.set(el, { x: e.clientX, y: e.clientY }) // lompat langsung agar tidak meluncur dari pojok
        first = false
      }
      x(e.clientX)
      y(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    if (!finePointer() || !ref.current) return
    gsap.to(ref.current, {
      opacity: project ? 1 : 0,
      scale: project ? 1 : 0.8,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }, [project])

  return (
    <div ref={ref} className="preview" aria-hidden="true">
      {project && <ProjectMedia key={project.id} p={project} parallax={0} />}
    </div>
  )
}
