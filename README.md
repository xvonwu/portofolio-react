# Portofolio React

Situs portofolio interaktif dengan React + Vite, GSAP, Lenis, dan React Router.
Desain dan isinya orisinal; ganti isinya di `src/data.js`.

## Menjalankan

```bash
npm install
npm run dev      # buka alamat yang ditampilkan (biasanya http://localhost:5173)
npm run build    # hasil produksi di folder dist/
npm run preview  # mencoba hasil build secara lokal
```

## Fitur

- Layar pembuka, transisi tirai antarhalaman, smooth scroll + parallax, tombol magnetis, kursor kustom
- **Dua bahasa (ID/EN)** dengan tombol di header; pilihan diingat di perangkat
- **Tema terang/gelap**; mengikuti pengaturan perangkat pada kunjungan pertama, lalu diingat
- **Halaman detail proyek** (`#/karya/nama-proyek`) dengan tantangan, solusi, hasil, galeri, dan proyek berikutnya
- **Tampilan Grid / Daftar** di halaman Karya; di mode Daftar, pratinjau gambar mengikuti kursor
- **Teks muncul kata demi kata** saat discroll
- **Catatan (blog)** dari file Markdown
- **Testimoni** (slider otomatis, bisa dijeda)
- **Tombol unduh CV**
- **Formulir kontak** yang benar-benar terkirim
- Halaman 404, meta tag + gambar pratinjau media sosial, favicon
- Responsif dan menghormati pengaturan "kurangi gerakan"

## Mengisi dengan data Anda

Semua isi ada di `src/data.js`:

| Yang diubah | Di mana |
| --- | --- |
| Nama, email, telepon, kota, sosial | `PROFILE` |
| Foto profil | taruh di `public/foto.png`, lalu `PROFILE.photo` |
| CV | ganti `public/cv.pdf` dengan CV Anda |
| Proyek | `PROJECTS` |
| Keahlian, statistik, perjalanan | `SKILLS`, `STATS`, `TIMELINE` |
| Testimoni | `TESTIMONIALS` (isi sekarang hanya contoh; ganti atau kosongkan) |
| Teks antarmuka | `src/locales.js` |

### Foto dan video proyek

Tanpa gambar, kartu proyek memakai gradasi berhuruf sebagai placeholder. Untuk memakai gambar asli,
taruh file di `public/proyek/` lalu isi di `PROJECTS`:

```js
{
  id: 'lumen-studio', title: 'Lumen Studio', /* ... */
  cover: './proyek/lumen-cover.jpg',          // gambar utama
  video: './proyek/lumen-preview.mp4',        // diputar saat kartu di-hover (opsional)
  gallery: ['./proyek/a.jpg', './proyek/b.jpg', './proyek/c.jpg'], // 3 gambar galeri (opsional)
  url: 'https://situs-proyek.com',            // tombol "Kunjungi situs" (opsional)
  challenge: { id: '...', en: '...' },        // teks sendiri (opsional; ada teks bawaan)
}
```

### Formulir kontak

Secara bawaan, tombol Kirim membuka aplikasi email pengunjung dengan pesan yang sudah terisi.
Supaya pesan terkirim langsung ke email Anda tanpa membuka aplikasi apa pun:

1. Daftar gratis di [formspree.io](https://formspree.io), buat form, lalu salin alamatnya.
2. Salin `.env.example` menjadi `.env`, lalu isi `VITE_FORM_ENDPOINT` dengan alamat itu.
3. Jalankan ulang `npm run dev` (atau `npm run build`).

Formulir memakai kolom jebakan tersembunyi untuk menyaring bot.

### Catatan (blog)

Setiap file `.md` di `src/content/blog/` otomatis menjadi satu catatan. Awali dengan:

```
---
title: Judul catatan
date: 2026-10-02
summary: Ringkasan satu kalimat.
---

Isi catatan dalam Markdown...
```

Nama file menjadi alamatnya. Yang didukung: judul (`#`, `##`, `###`), paragraf, daftar, kutipan (`>`),
blok kode, **tebal**, *miring*, `kode`, dan tautan.

### Pratinjau media sosial

Sebelum mengunggah, ubah `https://contoh.com` di `index.html` (tag `og:`) dan `PROFILE.siteUrl`
menjadi alamat situs Anda. Gambar pratinjau ada di `public/og.png` (ganti dengan desain Anda, 1200×630).

## Struktur

```
src/
  App.jsx            tirai transisi, smooth scroll, rute
  data.js            profil, proyek, keahlian, testimoni
  locales.js         teks antarmuka ID/EN
  prefs.jsx          bahasa + tema
  notes.js           pemuat catatan Markdown
  content/blog/      catatan (.md)
  components/        Loader, Header, Footer, Magnetic, Cursor, Reveal, SplitWords, ProjectMedia, ...
  pages/             Home, Work, Project, Notes, NotePost, About, Contact, NotFound
  styles.css         seluruh gaya
public/              foto.png, cv.pdf, og.png, favicon.svg
```
