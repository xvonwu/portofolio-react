// Catatan/blog: setiap file .md di src/content/blog/ otomatis menjadi satu catatan.
// Awali file dengan blok seperti ini:
//   ---
//   title: Judul catatan
//   date: 2026-10-02
//   summary: Ringkasan satu kalimat.
//   ---
// Nama file menjadi alamatnya (mis. transisi-halaman.md -> #/catatan/transisi-halaman).
const files = import.meta.glob('./content/blog/*.md', { query: '?raw', import: 'default', eager: true })

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  const meta = {}
  let body = raw
  if (m) {
    m[1].split(/\r?\n/).forEach((line) => {
      const i = line.indexOf(':')
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    })
    body = m[2]
  }
  return { meta, body }
}

export const NOTES = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const { meta, body } = parse(raw)
    const words = body.trim().split(/\s+/).length
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      summary: meta.summary || '',
      body,
      minutes: Math.max(1, Math.round(words / 200)),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export function formatDate(date, lang) {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
