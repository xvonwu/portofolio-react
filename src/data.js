// Ganti isi file ini dengan data Anda sendiri.
// Teks dua bahasa ditulis sebagai { id: '...', en: '...' }.

export const PROFILE = {
  name: 'John Doe',
  email: 'halo@contoh.com',
  phone: '+62 800 0000 0000',
  city: 'Jakarta',
  timeZone: 'Asia/Jakarta',

  // Foto profil: taruh file di public/ (mis. public/foto.png), lalu isi './foto.png'. Kosongkan untuk menyembunyikan.
  photo: './foto.png',
  // CV: ganti public/cv.pdf dengan CV Anda. Kosongkan untuk menyembunyikan tombol unduh.
  cv: './cv.pdf',

  // Formulir kontak. Daftar gratis di formspree.io, lalu isi alamat formnya di file .env:
  //   VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
  // Jika kosong, formulir membuka aplikasi email pengunjung dengan pesan yang sudah terisi.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',

  // Alamat situs setelah diunggah (dipakai gambar pratinjau media sosial). Ubah juga di index.html.
  siteUrl: 'https://contoh.com',

  intro: {
    id: 'Saya merancang dan membangun situs web yang terasa hidup: rapi di mata, ringan di perangkat, dan nyaman dipakai.',
    en: 'I design and build websites that feel alive: tidy to look at, light on every device, and pleasant to use.',
  },
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
}

export const NAV = [
  { to: '/', key: 'nav.home' },
  { to: '/karya', key: 'nav.work' },
  { to: '/catatan', key: 'nav.notes' },
  { to: '/tentang', key: 'nav.about' },
  { to: '/kontak', key: 'nav.contact' },
]

/*
 * PROYEK
 * Foto/video asli (semua opsional, taruh file di public/proyek/):
 *   cover:   './proyek/lumen-cover.jpg'      gambar utama (kartu + halaman detail)
 *   video:   './proyek/lumen-preview.mp4'    video pendek yang diputar saat kartu di-hover
 *   gallery: ['./proyek/a.jpg', './proyek/b.jpg', './proyek/c.jpg']   3 gambar galeri
 *   url:     'https://situs-proyek.com'      tombol "Kunjungi situs"
 * Tanpa cover, kartu memakai gradasi berhuruf sebagai placeholder.
 * Isi challenge/solution/result/summary/role per proyek untuk menimpa teks bawaan per kategori.
 */
export const PROJECTS = [
  { id: 'lumen-studio', title: 'Lumen Studio', type: 'web', year: 2025, a: '#ff6a3d', b: '#7a1d4b', tech: ['React', 'GSAP', 'Vite'] },
  { id: 'kopi-senja', title: 'Kopi Senja', type: 'branding', year: 2025, a: '#f7c948', b: '#b4531a', tech: ['Figma', 'Illustrator'] },
  { id: 'nusa-pay', title: 'Nusa Pay', type: 'app', year: 2024, a: '#3dd6ff', b: '#1c2f8a', tech: ['React Native', 'TypeScript'] },
  { id: 'arsip-kota', title: 'Arsip Kota', type: 'web', year: 2024, a: '#9dff8a', b: '#0d5c4a', tech: ['React', 'Node.js'] },
  { id: 'fable-books', title: 'Fable Books', type: 'branding', year: 2023, a: '#ff8ad4', b: '#4a1d7a', tech: ['Figma', 'Photoshop'] },
  { id: 'pulse-fit', title: 'Pulse Fit', type: 'app', year: 2023, a: '#ffd36b', b: '#d1344f', tech: ['Flutter', 'Firebase'] },
  { id: 'atap-hijau', title: 'Atap Hijau', type: 'web', year: 2022, a: '#b5ff6b', b: '#1f6b3a', tech: ['Astro', 'Tailwind'] },
  { id: 'mimpi-kecil', title: 'Mimpi Kecil', type: 'branding', year: 2022, a: '#ffb38a', b: '#5a2a7a', tech: ['Figma', 'After Effects'] },
]

// Teks bawaan per kategori (placeholder). Ganti per proyek lewat field di atas.
export const TYPE_COPY = {
  web: {
    summary: {
      id: 'Situs web interaktif dengan animasi halus dan performa yang terjaga.',
      en: 'An interactive website with smooth animation and carefully managed performance.',
    },
    role: { id: 'Desain & pengembangan frontend', en: 'Design & frontend development' },
    challenge: {
      id: 'Klien ingin situs yang terasa premium, tetapi tetap cepat dibuka di ponsel dan koneksi lambat.',
      en: 'The client wanted a site that feels premium yet still loads fast on phones and slow connections.',
    },
    solution: {
      id: 'Antarmuka dirancang modular, animasi dibatasi pada elemen penting, dan gambar dimuat bertahap.',
      en: 'A modular interface, animation limited to the elements that matter, and images loaded progressively.',
    },
    result: {
      id: 'Skor performa tinggi, waktu kunjungan lebih lama, dan lebih banyak pesan masuk dari formulir.',
      en: 'A high performance score, longer visits, and more messages coming in through the contact form.',
    },
  },
  branding: {
    summary: {
      id: 'Identitas visual lengkap: logo, warna, tipografi, dan panduan penggunaan.',
      en: 'A complete visual identity: logo, color, typography, and usage guidelines.',
    },
    role: { id: 'Arahan kreatif & desain merek', en: 'Creative direction & brand design' },
    challenge: {
      id: 'Merek baru perlu tampil berbeda di pasar yang ramai tanpa kehilangan karakter aslinya.',
      en: 'A new brand had to stand apart in a crowded market without losing its original character.',
    },
    solution: {
      id: 'Sistem visual sederhana yang konsisten: satu simbol kuat, palet terbatas, dan tipografi yang jelas.',
      en: 'A simple, consistent visual system: one strong symbol, a limited palette, and clear typography.',
    },
    result: {
      id: 'Merek dikenali lebih cepat dan dipakai seragam di kemasan, media sosial, dan materi cetak.',
      en: 'The brand became recognizable faster and is applied consistently across packaging, social, and print.',
    },
  },
  app: {
    summary: {
      id: 'Aplikasi seluler dengan alur sederhana dan antarmuka yang mudah dipahami.',
      en: 'A mobile app with simple flows and an interface that is easy to understand.',
    },
    role: { id: 'Desain produk & pengembangan', en: 'Product design & development' },
    challenge: {
      id: 'Pengguna baru sering berhenti di tengah proses pendaftaran karena langkahnya terlalu banyak.',
      en: 'New users often dropped out mid-signup because there were too many steps.',
    },
    solution: {
      id: 'Alur dipangkas menjadi tiga langkah, dengan umpan balik langsung dan bahasa yang lebih ringkas.',
      en: 'The flow was cut to three steps, with instant feedback and more concise wording.',
    },
    result: {
      id: 'Tingkat penyelesaian pendaftaran naik dan keluhan pengguna turun dalam sebulan pertama.',
      en: 'Signup completion went up and user complaints went down within the first month.',
    },
  },
}

export const GREETINGS = ['Halo', 'Hello', 'Bonjour', 'Ciao', 'Hola', 'こんにちは', 'Olá', 'Hallo', 'Selamat datang']

export const SKILLS = [
  { id: 'Desain UI/UX', en: 'UI/UX design' },
  { id: 'React & JavaScript', en: 'React & JavaScript' },
  { id: 'Animasi (GSAP)', en: 'Animation (GSAP)' },
  { id: 'Desain merek', en: 'Brand design' },
  { id: 'Aksesibilitas', en: 'Accessibility' },
  { id: 'Performa web', en: 'Web performance' },
]

export const STATS = [
  { value: 8, suffix: '+', label: { id: 'Tahun pengalaman', en: 'Years of experience' } },
  { value: 60, suffix: '+', label: { id: 'Proyek selesai', en: 'Projects delivered' } },
  { value: 24, suffix: '', label: { id: 'Klien di 9 negara', en: 'Clients in 9 countries' } },
]

export const TIMELINE = [
  { year: '2025', text: { id: 'Freelance penuh waktu: situs interaktif untuk studio dan startup.', en: 'Full-time freelance: interactive sites for studios and startups.' } },
  { year: '2022', text: { id: 'Lead frontend di agensi digital, memimpin tim kecil.', en: 'Lead frontend at a digital agency, guiding a small team.' } },
  { year: '2019', text: { id: 'Mulai sebagai developer frontend dan desainer antarmuka.', en: 'Started as a frontend developer and interface designer.' } },
  { year: '2017', text: { id: 'Lulus Informatika, mulai membuat proyek pertama.', en: 'Graduated in Informatics and began the first projects.' } },
]

// CONTOH testimoni (fiktif). Ganti dengan kutipan klien Anda yang asli, atau kosongkan array ini
// untuk menyembunyikan bagian testimoni.
export const TESTIMONIALS = [
  {
    quote: {
      id: 'Hasilnya melampaui bayangan kami. Situsnya cepat, indah, dan tim kami mudah mengelolanya.',
      en: 'The result went beyond what we imagined. The site is fast, beautiful, and easy for our team to manage.',
    },
    name: 'Rina A.',
    role: { id: 'Pendiri, Lumen Studio', en: 'Founder, Lumen Studio' },
  },
  {
    quote: {
      id: 'Komunikasinya jelas dan selalu tepat waktu. Detail kecil pun diperhatikan.',
      en: 'Clear communication and always on time. Even the small details were taken care of.',
    },
    name: 'Dimas P.',
    role: { id: 'Manajer Produk, Nusa Pay', en: 'Product Manager, Nusa Pay' },
  },
  {
    quote: {
      id: 'Identitas merek yang dibuat membuat kami langsung terlihat lebih profesional.',
      en: 'The brand identity made us look more professional right away.',
    },
    name: 'Lena K.',
    role: { id: 'Pemilik, Kopi Senja', en: 'Owner, Kopi Senja' },
  },
]
