import { Fragment } from 'react'

// Pemroses Markdown kecil (judul, paragraf, daftar, kutipan, blok kode, tebal, miring, kode inline, tautan).
// Menghasilkan elemen React langsung (bukan HTML mentah), jadi aman dari injeksi skrip.
// Tautan hanya boleh http(s), #, atau mailto.
const SAFE_LINK = /^(https?:\/\/|#|mailto:)/

function inline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g)
  return parts.map((p, i) => {
    if (!p) return null
    let m
    if ((m = p.match(/^\*\*(.+)\*\*$/))) return <strong key={i}>{m[1]}</strong>
    if ((m = p.match(/^`(.+)`$/))) return <code key={i}>{m[1]}</code>
    if ((m = p.match(/^\[(.+)\]\((.+)\)$/))) {
      if (!SAFE_LINK.test(m[2])) return <Fragment key={i}>{m[1]}</Fragment>
      const external = /^https?:/.test(m[2])
      return (
        <a key={i} href={m[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {m[1]}
        </a>
      )
    }
    if ((m = p.match(/^\*(.+)\*$/))) return <em key={i}>{m[1]}</em>
    return <Fragment key={i}>{p}</Fragment>
  })
}

export default function Markdown({ source }) {
  const lines = source.replace(/\r/g, '').split('\n')
  const out = []
  let para = []
  let i = 0

  const flush = () => {
    if (para.length) {
      out.push(<p key={out.length}>{inline(para.join(' '))}</p>)
      para = []
    }
  }

  while (i < lines.length) {
    const l = lines[i]
    let m

    if (l.startsWith('```')) {
      flush()
      const code = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++])
      i++
      out.push(
        <pre key={out.length}>
          <code>{code.join('\n')}</code>
        </pre>,
      )
      continue
    }
    if ((m = l.match(/^(#{1,3})\s+(.*)$/))) {
      flush()
      // h1 sudah dipakai judul halaman: "#" dan "##" menjadi h2, "###" menjadi h3
      const Tag = `h${Math.max(2, m[1].length)}`
      out.push(<Tag key={out.length}>{inline(m[2])}</Tag>)
      i++
      continue
    }
    if (/^>\s?/.test(l)) {
      flush()
      const q = []
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''))
      out.push(
        <blockquote key={out.length}>
          <p>{inline(q.join(' '))}</p>
        </blockquote>,
      )
      continue
    }
    if (/^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l)) {
      flush()
      const ordered = /^\d+\./.test(l)
      const re = ordered ? /^\d+\.\s+/ : /^[-*]\s+/
      const items = []
      while (i < lines.length && re.test(lines[i])) items.push(lines[i++].replace(re, ''))
      const List = ordered ? 'ol' : 'ul'
      out.push(
        <List key={out.length}>
          {items.map((it, k) => (
            <li key={k}>{inline(it)}</li>
          ))}
        </List>,
      )
      continue
    }
    if (!l.trim()) {
      flush()
      i++
      continue
    }
    para.push(l.trim())
    i++
  }
  flush()

  return <div className="prose">{out}</div>
}
