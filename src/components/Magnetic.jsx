import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { finePointer } from '../hooks.js'

/**
 * Elemen "magnetis": bergerak mendekati kursor, lalu kembali dengan pantulan elastis.
 *
 * Penting: area deteksi mouse (wrapper luar) TIDAK ikut bergerak. Hanya elemen dalam yang
 * digeser. Jika area deteksinya ikut bergerak, posisi kursor relatif terhadapnya berubah
 * terus-menerus dan tombol bisa terdorong menjauh atau bergetar.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const outer = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const zone = outer.current
    const el = inner.current
    if (!zone || !el || !finePointer()) return

    // Catatan: sengaja TIDAK memakai gsap.quickTo. quickTo membuat satu tween yang dipakai
    // ulang; begitu tween "kembali" (leave) menimpanya dengan overwrite, quickTo mati dan
    // tombol hanya bergerak satu kali. gsap.to biasa membuat tween baru setiap kali.
    const move = (e) => {
      const r = zone.getBoundingClientRect() // zona diam, jadi hasilnya stabil
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
    const leave = () => {
      // kembali ke posisi awal dengan pantulan elastis
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
    }

    zone.addEventListener('mousemove', move)
    zone.addEventListener('mouseleave', leave)
    return () => {
      zone.removeEventListener('mousemove', move)
      zone.removeEventListener('mouseleave', leave)
      gsap.killTweensOf(el)
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [strength])

  return (
    <div ref={outer} className={`magnetic ${className}`}>
      <div ref={inner} className="magnetic-inner">
        {children}
      </div>
    </div>
  )
}
