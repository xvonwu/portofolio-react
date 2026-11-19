---
title: Catatan belajar React untuk portofolio
date: 2026-08-20
summary: Tiga kebiasaan kecil yang membuat kode portofolio lebih mudah dirawat.
---

Portofolio adalah proyek terbaik untuk belajar React, karena Anda sendiri yang menjadi kliennya. Tiga kebiasaan yang membantu saya:

1. **Pisahkan data dari tampilan.** Semua teks, proyek, dan tautan ada di satu file, jadi mengganti isi tidak perlu menyentuh komponen.
2. **Bungkus efek yang berulang jadi komponen.** Tombol magnetis, teks yang muncul saat discroll, dan kursor kustom masing-masing satu komponen kecil.
3. **Bersihkan setelah dipakai.** Setiap animasi dibuat di dalam `gsap.context` dan dibatalkan saat komponen dilepas.

Dengan begitu menambah halaman baru cukup berupa satu file dan satu baris rute.
