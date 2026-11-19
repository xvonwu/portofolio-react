---
title: Cara kerja transisi halaman tanpa reload
date: 2026-10-02
summary: Tirai yang menutup layar, rute berganti di baliknya, lalu tirai terbuka lagi.
---

Transisi halaman membuat situs terasa seperti satu aplikasi, bukan kumpulan halaman terpisah. Idenya sederhana: **tutup layar dulu, ganti isi di baliknya, lalu buka kembali**.

## Urutannya

1. Pengunjung mengklik tautan, dan kita mencegat klik itu.
2. Sebuah tirai naik menutupi layar.
3. Saat layar tertutup, rute diganti dan posisi scroll dikembalikan ke atas.
4. Tirai naik keluar dan halaman baru terlihat.

## Potongan kodenya

```js
gsap.timeline()
  .to(curtain, { yPercent: 0, duration: 0.75, ease: 'power4.inOut' })
  .call(() => navigate(to))
  .to(curtain, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' })
```

Satu hal yang mudah terlewat: jangan lupa `ScrollTrigger.refresh()` setelah halaman baru terpasang, supaya posisi animasi scroll dihitung ulang.
