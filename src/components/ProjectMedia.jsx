import { useRef } from 'react'
import { useParallax } from '../hooks.js'

/**
 * Media proyek. Memakai foto (cover / gallery) bila ada, jika tidak gradasi berhuruf (placeholder).
 * variant 0 = gambar utama (bisa memutar video saat di-hover); 1..3 = bingkai galeri.
 */
export default function ProjectMedia({ p, parallax = 8, variant = 0, className = '' }) {
  const inner = useRef(null)
  const video = useRef(null)
  useParallax(inner, parallax)

  const src = variant === 0 ? p.cover : p.gallery?.[variant - 1]
  const style = { '--a': p.a, '--b': p.b, '--ang': `${135 + variant * 55}deg` }

  return (
    <div
      className={`media ${className}`}
      style={style}
      onMouseEnter={() => video.current?.play().catch(() => {})}
      onMouseLeave={() => video.current?.pause()}
    >
      <div ref={inner} className="media-inner">
        {src ? (
          <img src={src} alt={`${p.title}`} loading="lazy" />
        ) : (
          <span className="media-initial" aria-hidden="true">
            {p.title.slice(0, 1)}
          </span>
        )}
        {variant === 0 && p.video && (
          <video ref={video} className="media-video" src={p.video} muted loop playsInline preload="none" />
        )}
      </div>
    </div>
  )
}
