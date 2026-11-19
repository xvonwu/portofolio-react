import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Efek parallax: elemen bergeser pelan saat induknya melewati layar. amount 0 = nonaktif. */
export function useParallax(ref, amount = 10) {
  useEffect(() => {
    if (!ref.current || !amount) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [ref, amount])
}

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
