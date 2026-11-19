import { Fragment, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Teks yang muncul kata demi kata (naik dari balik garis) saat masuk layar.
 * Gunakan "\n" untuk pindah baris. Teks asli tetap terbaca oleh pembaca layar lewat aria-label.
 */
export default function SplitWords({ text, as: Tag = 'span', className = '', stagger = 0.045 }) {
  const ref = useRef(null)

  useEffect(() => {
    const words = ref.current?.querySelectorAll('.sw > span')
    if (!words?.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        },
      )
    })
    return () => ctx.revert()
  }, [text, stagger])

  const plain = text.replace(/\n/g, ' ')
  return (
    <Tag ref={ref} className={className} aria-label={plain}>
      {text.split('\n').map((line, li) => (
        <span key={li} className="sw-line" aria-hidden="true">
          {line.split(' ').map((w, wi) => (
            <Fragment key={wi}>
              <span className="sw">
                <span>{w}</span>
              </span>
              {/* spasi di LUAR .sw: spasi di ujung inline-block akan hilang dan kata menempel */}
              {' '}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  )
}
