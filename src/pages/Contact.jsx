import { useState } from 'react'
import { PROFILE } from '../data.js'
import { usePrefs } from '../prefs.jsx'
import Reveal from '../components/Reveal.jsx'
import Magnetic from '../components/Magnetic.jsx'
import SplitWords from '../components/SplitWords.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { t } = usePrefs()
  const [form, setForm] = useState({ nama: '', email: '', pesan: '', _gotcha: '' })
  const [errors, setErrors] = useState({})
  // 'idle' | 'sending' | 'sent' | 'mailto' | 'error'
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const firstName = form.nama.trim().split(' ')[0]

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const err = {}
    if (!form.nama.trim()) err.nama = t('c.err.name')
    if (!EMAIL_RE.test(form.email)) err.email = t('c.err.email')
    if (form.pesan.trim().length < 10) err.pesan = t('c.err.message')
    setErrors(err)
    if (Object.keys(err).length) return

    // Kolom jebakan untuk bot: manusia tidak melihatnya, jadi bila terisi, anggap spam.
    if (form._gotcha) {
      setStatus('sent')
      return
    }

    // Tanpa endpoint: buka aplikasi email pengunjung dengan pesan terisi.
    if (!PROFILE.formEndpoint) {
      const subject = encodeURIComponent(t('c.subject', { name: form.nama.trim() }))
      const body = encodeURIComponent(`${form.pesan.trim()}\n\n— ${form.nama.trim()} (${form.email.trim()})`)
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
      setStatus('mailto')
      return
    }

    // Dengan endpoint (mis. Formspree): kirim sebagai JSON.
    setStatus('sending')
    try {
      const res = await fetch(PROFILE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.nama.trim(),
          email: form.email.trim(),
          message: form.pesan.trim(),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const done = status === 'sent' || status === 'mailto'

  return (
    <section className="page">
      <SplitWords as="h1" className="display-md" text={t('contact.title')} stagger={0.06} />

      <div className="two-col contact">
        <Reveal>
          {done ? (
            <div className="success" role="status">
              <h2>
                {status === 'sent'
                  ? t('c.ok.title', { name: firstName })
                  : t('c.mailto.title', { name: firstName })}
              </h2>
              <p>{status === 'sent' ? t('c.ok.text', { email: form.email }) : t('c.mailto.text')}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label>
                <span>{t('c.name')}</span>
                <input value={form.nama} onChange={set('nama')} autoComplete="name" aria-invalid={!!errors.nama} />
                {errors.nama && <em>{errors.nama}</em>}
              </label>
              <label>
                <span>{t('c.email')}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <em>{errors.email}</em>}
              </label>
              <label>
                <span>{t('c.message')}</span>
                <textarea rows="5" value={form.pesan} onChange={set('pesan')} aria-invalid={!!errors.pesan} />
                {errors.pesan && <em>{errors.pesan}</em>}
              </label>

              {/* kolom jebakan bot (tersembunyi) */}
              <input
                className="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form._gotcha}
                onChange={set('_gotcha')}
              />

              {status === 'error' && (
                <p className="form-error" role="alert">
                  {t('c.fail', { email: PROFILE.email })}
                </p>
              )}

              <Magnetic strength={0.3}>
                <button type="submit" className="round round-accent" disabled={status === 'sending'}>
                  <span>{status === 'sending' ? t('c.sending') : t('c.send')}</span>
                </button>
              </Magnetic>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.1} className="contact-info">
          <p className="eyebrow">{t('c.email')}</p>
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <p className="eyebrow">{t('c.phone')}</p>
          <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}>{PROFILE.phone}</a>
          <p className="eyebrow">{t('c.location')}</p>
          <p>{PROFILE.city}</p>
        </Reveal>
      </div>
    </section>
  )
}
