import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { AppCtx } from './context.js'
import { usePrefs } from './prefs.jsx'
import { NAV, PROFILE, PROJECTS } from './data.js'
import { NOTES } from './notes.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Project from './pages/Project.jsx'
import Notes from './pages/Notes.jsx'
import NotePost from './pages/NotePost.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { t } = usePrefs()
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const lenis = useRef(null)
  const curtain = useRef(null)
  const label = useRef(null)
  const busy = useRef(false)
  const pathRef = useRef(pathname)
  pathRef.current = pathname

  // Judul halaman untuk sebuah alamat (dipakai di tirai transisi dan judul tab).
  const labelFor = useCallback(
    (to) => {
      const nav = NAV.find((n) => n.to === to)
      if (nav) return t(nav.key)
      const [, section, slug] = to.split('/')
      if (section === 'karya') return PROJECTS.find((p) => p.id === slug)?.title ?? '404'
      if (section === 'catatan') return NOTES.find((n) => n.slug === slug)?.title ?? '404'
      return '404'
    },
    [t],
  )
  const labelForRef = useRef(labelFor)
  labelForRef.current = labelFor

  // Smooth scroll (Lenis) disinkronkan dengan ticker GSAP dan ScrollTrigger.
  useEffect(() => {
    const l = new Lenis({ lerp: 0.09 })
    lenis.current = l
    l.on('scroll', ScrollTrigger.update)
    const tick = (time) => l.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      l.destroy()
    }
  }, [])

  // Scroll dikunci selama loader tampil atau menu terbuka.
  useEffect(() => {
    const l = lenis.current
    if (!l) return
    if (!loaded || menuOpen) l.stop()
    else l.start()
  }, [loaded, menuOpen])

  // Judul tab dan deskripsi mengikuti halaman dan bahasa.
  useEffect(() => {
    const page = pathname === '/' ? '' : `${labelFor(pathname)} • `
    document.title = `${page}${PROFILE.name} • ${t('hero.lines').join(' ')}`
    document.querySelector('meta[name=description]')?.setAttribute('content', t('site.description'))
  }, [pathname, labelFor, t])

  // Transisi halaman: tirai naik menutupi layar → ganti rute → tirai naik keluar.
  const go = useCallback(
    (to) => {
      setMenuOpen(false)
      if (busy.current || to === pathRef.current) return
      busy.current = true
      label.current.textContent = labelForRef.current(to)

      gsap
        .timeline({ onComplete: () => (busy.current = false) })
        .set(curtain.current, { display: 'flex', yPercent: 100 })
        .to(curtain.current, { yPercent: 0, duration: 0.75, ease: 'power4.inOut' })
        .fromTo(label.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.35')
        .call(() => {
          navigate(to)
          lenis.current?.scrollTo(0, { immediate: true, force: true })
          window.scrollTo(0, 0)
        })
        .to({}, { duration: 0.3 })
        .call(() => ScrollTrigger.refresh())
        .to(curtain.current, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' })
        .set(curtain.current, { display: 'none' })
    },
    [navigate],
  )

  const ctx = useMemo(() => ({ go, loaded }), [go, loaded])

  return (
    <AppCtx.Provider value={ctx}>
      <Cursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <div ref={curtain} className="curtain" aria-hidden="true">
        <span ref={label} className="curtain-label" />
        <div className="curtain-curve" />
      </div>

      <Header open={menuOpen} setOpen={setMenuOpen} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/karya" element={<Work />} />
          <Route path="/karya/:id" element={<Project />} />
          <Route path="/catatan" element={<Notes />} />
          <Route path="/catatan/:slug" element={<NotePost />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </AppCtx.Provider>
  )
}
