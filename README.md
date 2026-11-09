# COREX — Strength & Conditioning (Fullstack Web App)

Aplikasi Web Fullstack Modern untuk Gym & Pusat Kebugaran **COREX Strength and Conditioning**, dibangun berdasarkan desain template landing page dengan integrasi Frontend (React 19, Tailwind CSS, Lucide Icons, Vite) dan Backend REST API (Node.js, Express 5, JSON Database persistent).

---

## 🚀 Fitur Utama

### 🏋️ Frontend (User Interface)
- **Desain Presisi & Responsif**: Mengikuti identitas visual COREX dengan palet warna Crimson (`#8b1424`), Dark (`#0e0e11`), font condensed *Bebas Neue* untuk headline dan *Inter* untuk teks tubuh.
- **Header & Navigasi Interaktif**: Sticky navigation, mobile hamburger drawer, navigasi anchor halus (*smooth scrolling*), tombol *Join Now*, dan akses cepat ke *Admin Portal*.
- **Hero Section Dinamis**: Header visual bertenaga, badge fasilitas, avatar stack bukti sosial (*750+ members*), dan CTA *Join The Tribe*.
- **Infinite Running Ticker**: Marquee animasi berulang (*Strength, Conditioning, Hypertrophy, Mobility, Olympic Lifting, Boxing, Recovery*) dengan efek jeda saat kursor diarahkan (*hover pause*).
- **Ethos & About Us**: Filosofi latihan berfokus pada hasil nyata (*Built for the work, not the mirror*) beserta tag metadata resmi sejak 2014.
- **Discipline Carousel**: 4 pilar latihan (Strength, HIIT & Conditioning, Hypertrophy, 1-on-1 Coaching) dengan ikon dan navigasi slide.
- **Jadwal Kelas Mingguan (Real-time Schedule)**:
  - Tab pemilih hari: **MON, TUE, WED, THU, FRI, SAT, SUN**.
  - Filter kategori latihan (Strength, Conditioning, Hypertrophy, Cardio, Olympic, Recovery).
  - Indikator ketersediaan slot dinamis (*Live Spots Remaining*, peringatan kuota menipis, atau *Class Full*).
  - **Sistem Booking Interaktif**: Klik **BOOK** pada sesi apa pun untuk membuka formulir pemesanan, memasukkan nama & kontak, dan langsung mendapatkan **Kode Tiket Resmi (contoh: `CRX-8424`)** dengan pengurangan sisa slot secara real-time.
- **Profil Pelatih (Trainers)**: Ned Chen, Marcus Vance, Diego Ortiz, dan Frank Reyes lengkap dengan foto, keahlian, pengalaman, serta tombol konsultasi 1-on-1.
- **Transformasi Atlet**: Perbandingan interaktif Sebelum & Sesudah (*Before & After*) disertai metrik penurunan lemak dan peningkatan beban angkatan.
- **Paket Membership & Toggle Penagihan**:
  - Pilihan pembayaran: **Bulanan (Monthly)** atau **Tahunan (Yearly - Hemat 20%)**.
  - 3 Tingkatan paket: **Open Floor** ($39/bln), **All Access** ($79/bln - Paling Populer), dan **Coached** ($189/bln).
  - Modal registrasi anggota yang menerbitkan kartu member digital instan (*Member ID Card*).
- **Bento Grid Galeri Fasilitas (The Space)**: Foto area rack, dumbbell, turf bay, dan ergometer line dengan fitur **Lightbox Zoom Modal**.
- **Quote Banner Carousel**: Testimoni berputar otomatis dengan navigasi titik (*dots indicator*).
- **Accordion Tanya Jawab (FAQ)**: 6 pertanyaan umum yang dapat dibuka-tutup dengan transisi halus.
- **Newsletter Subscription**: Formulir pendaftaran mingguan (*Weekly Training Note*) yang terhubung ke backend API dengan notifikasi Toast.
- **Staff Admin Dashboard**:
  - Metrik statistik gym secara live (total booking, kapasitas utilisasi, total member aktif, dan pelanggan newsletter).
  - Manajemen reservasi kelas dengan fitur **Batalkan Booking (1-Click Cancel)** yang otomatis mengembalikan kuota slot ke jadwal.
  - Daftar anggota terdaftar & daftar email newsletter.
  - Tombol **Reset Demo Data** untuk mengembalikan database ke status awal kapan saja.

---

### ⚙️ Backend (RESTful API)
- **Node.js & Express 5**: Arsitektur modular dengan pemisahan Controllers, Routes, dan Database configuration.
- **Persistent JSON Database**: Menyimpan data jadwal, pelatih, paket keanggotaan, booking, dan newsletter di `backend/data/gym_data.json` secara aman dan persistent tanpa memerlukan konfigurasi database eksternal yang rumit.
- **CORS & Environment Setup**: Dilengkapi file `.env` dan middleware CORS terkonfigurasi untuk kemudahan integrasi.
- **SPA Static Serving**: Backend siap menyajikan file build produksi frontend di root URL `http://localhost:5000`.

---

## 📁 Struktur Direktori

```
website-gyn-bone/
├── backend/
│   ├── data/
│   │   └── gym_data.json            # Database JSON (persistent)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # Koneksi & inisialisasi data seed DB
│   │   ├── controllers/
│   │   │   ├── adminController.js   # Statistik, manajemen booking & data
│   │   │   ├── membershipController.js # Pengambilan paket & pendaftaran member
│   │   │   ├── newsletterController.js # Pendaftaran newsletter
│   │   │   ├── scheduleController.js   # Jadwal, booking, pembatalan
│   │   │   └── trainerController.js    # Data pelatih & konsultasi 1-on-1
│   │   ├── routes/
│   │   │   └── api.js               # Definisi endpoint REST API
│   │   └── server.js                # Server Express & static file fallback
│   ├── .env                         # Konfigurasi PORT & environment
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboardModal.jsx # Panel admin untuk staf gym
│   │   │   ├── BookingModal.jsx        # Modal reservasi kelas
│   │   │   ├── ConsultationModal.jsx   # Modal konsultasi pelatih
│   │   │   ├── Disciplines.jsx         # Carousel disiplin latihan
│   │   │   ├── Ethos.jsx               # Seksi filosofi & about
│   │   │   ├── FacilityGallery.jsx     # Bento grid & lightbox fasilitas
│   │   │   ├── FAQ.jsx                 # Accordion pertanyaan umum
│   │   │   ├── Footer.jsx              # Footer gym
│   │   │   ├── Hero.jsx                # Hero section
│   │   │   ├── JoinModal.jsx           # Modal pendaftaran membership
│   │   │   ├── Navbar.jsx              # Navigasi utama & mobile drawer
│   │   │   ├── Newsletter.jsx          # Form newsletter mingguan
│   │   │   ├── Pricing.jsx             # Paket harga & toggle bulanan/tahunan
│   │   │   ├── QuoteBanner.jsx         # Banner testimoni crimson
│   │   │   ├── Schedule.jsx            # Tabel jadwal kelas & filter hari
│   │   │   ├── Ticker.jsx              # Running text ticker
│   │   │   ├── Toast.jsx               # Notifikasi pop-up
│   │   │   ├── Trainers.jsx            # Galeri pelatih
│   │   │   └── Transformation.jsx      # Kisah transformasi Before & After
│   │   ├── services/
│   │   │   └── api.js                  # Klien pemanggil API backend
│   │   ├── App.jsx                     # Komponen induk
│   │   ├── index.css                   # Tailwind base, utilities, font headline
│   │   └── main.jsx
│   ├── index.html                      # HTML root dengan font Bebas Neue & Inter
│   ├── tailwind.config.js              # Konfigurasi warna brand dan font
│   ├── vite.config.js                  # Konfigurasi Vite & proxy API
│   └── package.json
│
├── package.json                        # Root helper scripts
└── README.md                           # Dokumentasi lengkap
```

---

## 🛠️ Cara Menjalankan Project

Pastikan di komputer Anda telah terpasang **Node.js** (v18 ke atas) dan **npm**.

### Opsi 1: Menjalankan Sekaligus (Production Mode / Satu Port)

Aplikasi telah dibuild sehingga backend Express dapat langsung melayani frontend di satu alamat:

```bash
# Dari root folder project:
npm start
```
Buka browser dan akses:
👉 **`http://localhost:5000`**

---

### Opsi 2: Mode Development (Hot Reloading Frontend & Backend)

Jika ingin melakukan pengeditan kode dengan *hot reload* aktif:

1. **Jalankan Backend (Terminal 1):**
   ```bash
   npm run dev:backend
   ```
   *Backend berjalan di: `http://localhost:5000`*

2. **Jalankan Frontend (Terminal 2):**
   ```bash
   npm run dev:frontend
   ```
   *Frontend berjalan di: `http://localhost:5173` (semua request `/api` otomatis di-proxy ke port 5000)*

---

### Opsi 3: Membangun Ulang Frontend (Build)

Jika Anda melakukan perubahan pada frontend dan ingin memperbarui file produksi:
```bash
npm run build
```

---

## 📡 Dokumentasi Endpoint REST API

Semua endpoint diawali dengan prefix `/api`:

| Metode | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck server & status backend |
| `GET` | `/api/schedules?day=MON` | Mendapatkan jadwal kelas (bisa difilter `day=MON`, `TUE`, dll) |
| `POST` | `/api/schedules/book` | Memesan slot kelas gym (`classId`, `userName`, `userEmail`, `userPhone`) |
| `DELETE` | `/api/schedules/booking/:id` | Membatalkan reservasi tiket & mengembalikan kuota slot |
| `GET` | `/api/memberships/plans` | Mendapatkan daftar harga & fasilitas paket membership |
| `POST` | `/api/memberships/join` | Mendaftarkan member baru (`planId`, `name`, `email`, `phone`, `billingCycle`) |
| `GET` | `/api/trainers` | Mendapatkan daftar seluruh pelatih (*coaches*) |
| `POST` | `/api/trainers/consult` | Mengajukan assessment intake atau konsultasi 1-on-1 |
| `POST` | `/api/newsletter/subscribe` | Berlangganan buletin mingguan (*Weekly Training Note*) |
| `GET` | `/api/faqs` | Mengambil daftar pertanyaan dan jawaban FAQ |
| `GET` | `/api/admin/stats` | Statistik operasional gym (total booking, kapasitas, member) |
| `GET` | `/api/admin/bookings` | Daftar seluruh booking aktif |
| `GET` | `/api/admin/members` | Daftar seluruh member yang terdaftar |
| `GET` | `/api/admin/subscribers` | Daftar email newsletter |
| `POST` | `/api/admin/reset` | Mereset database kembali ke status demo awal |

---

### Contoh Payload Pemesanan Kelas (`POST /api/schedules/book`):
```json
{
  "classId": "mon-1",
  "userName": "Budi Santoso",
  "userEmail": "budi.santoso@example.com",
  "userPhone": "+62 812 3456 7890"
}
```

### Contoh Response Berhasil:
```json
{
  "success": true,
  "message": "Booking confirmed! Your ticket code is CRX-8424",
  "booking": {
    "id": "CRX-8424",
    "classId": "mon-1",
    "className": "Power Hour",
    "coach": "Ned Chen",
    "day": "MON",
    "time": "06:00",
    "userName": "Budi Santoso",
    "userEmail": "budi.santoso@example.com",
    "userPhone": "+62 812 3456 7890",
    "createdAt": "2026-11-09T03:37:33.822Z",
    "status": "confirmed"
  },
  "spotsLeft": 1
}
```

---

## 🔑 Mengakses Staff Admin Panel
Klik tombol **ADMIN** (dengan ikon perisai) di pojok kanan atas navbar atau di bagian footer situs. Di panel ini Anda dapat:
- Melihat total reservasi dan kapasitas lantai secara live.
- Membatalkan reservasi pengguna untuk menguji pengembalian slot secara langsung.
- Melihat daftar pendaftaran anggota baru dan subscriber newsletter.
- Mereset data pengujian sewaktu-waktu.

---

Selamat menggunakan aplikasi **COREX Strength and Conditioning**! 🔥

