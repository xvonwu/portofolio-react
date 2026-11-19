import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Angka yang menghitung naik saat terlihat di layar. */
export default function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const obj = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.v) + suffix
        },
      })
    })
    return () => ctx.revert()
  }, [to, suffix])

  return <span ref={ref}>0{suffix}</span>
}
