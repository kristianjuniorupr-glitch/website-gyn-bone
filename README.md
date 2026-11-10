# GYM BONE — Strength & Conditioning (Fullstack Web App)

Aplikasi Web Fullstack Modern untuk Gym & Pusat Kebugaran **GYM BONE Strength and Conditioning**, dibangun berdasarkan desain template landing page dengan integrasi Frontend (React 19, Tailwind CSS, Lucide Icons, Vite) dan Backend REST API (Node.js, Express 5, JSON Database persistent).

---

## 🚀 Fitur Utama

### 🏋️ Frontend (User Interface)
- **Desain Presisi & Responsif**: Mengikuti identitas visual COREX dengan palet warna Crimson (`#8b1424`), Dark (`#0e0e11`), font condensed *Bebas Neue* untuk headline dan *Inter* untuk teks tubuh.
- **Header & Navigasi Interaktif**: Sticky navigation, mobile hamburger drawer, navigasi anchor halus (*smooth scrolling*), tombol *Join Now*, dan akses cepat ke *Admin Portal*.
- **Hero Section Presisi Sesuai Foto Referensi**: 
  - Headline raksasa bertingkat `FUEL BUILD PERFORM` (*Bebas Neue*, putih pekat).
  - Foto atlet dumbbell row transparan (*no background*, 50% lebih besar) diposisikan di tengah-kanan dengan anchoring langsung setinggi paha (*thigh level*) di atas running ticker.
  - Social proof stack `1K+ MEMBERS / TRAIN WITH US` di kanan atas, serta callout card `THE ESSENTIAL INGREDIENT...` dengan tombol `BECOME A MEMBER` di kanan bawah.
- **Infinite Running Ticker**: Marquee animasi berulang (*Strength ○ Conditioning ○ Hypertrophy ○ Mobility ○ Olympic Lifting ○ Boxing ○ Recovery*) dengan simbol pemisah lingkaran cincin `○`.
- **Ethos & About Us**: Filosofi latihan berfokus pada hasil nyata (*Built for the work, not the mirror*) beserta tag metadata resmi sejak 2014.
- **Discipline Carousel**: 4 pilar latihan (Strength, HIIT & Conditioning, Hypertrophy, 1-on-1 Coaching) dengan ikon dan modal detail program latihan.
- **Transformasi Atlet (Before & After Real)**:
  - Menggunakan foto transformasi nyata anggota COREX gym (Sameer Hossain, -18kg Body Fat, +65kg Deadlift).
  - Mendukung **2 Mode Tampilan**: Mode **Side by Side** (kartu berdampingan dengan badge Before & After) serta Mode **Interactive Slider** (slider geser kiri-kanan interaktif secara real-time).
- **Paket Membership & Interaktivitas Warna Dinamis**:
  - **Dynamic Card Hover & Touch**: Ketika kursor atau sentuhan layar menyentuh kartu mana pun (misal Open Floor atau Coached), kartu tersebut bertransisi menjadi warna merah *brand crimson*, dan kartu All Access ikut berubah menjadi putih bersih.
  - Pilihan pembayaran: **Bulanan (Monthly)** atau **Tahunan (Yearly - Hemat 20%)**.
  - 3 Tingkatan paket: **Open Floor** ($39/bln), **All Access** ($79/bln - Paling Populer), dan **Coached** ($189/bln).
  - Modal registrasi anggota yang menerbitkan kartu member digital instan (*Member ID Card*).
- **Bento Grid Galeri Fasilitas (The Space)**: Foto area rack, dumbbell, turf bay, dan ergometer line dengan fitur **Lightbox Zoom Modal**.
- **Quote Banner Carousel**: Testimoni berputar otomatis dengan navigasi titik (*dots indicator*).
- **Accordion Tanya Jawab (FAQ)**: 6 pertanyaan umum yang dapat dibuka-tutup dengan transisi halus.
- **Newsletter Subscription**: Formulir pendaftaran mingguan (*Weekly Training Note*) yang terhubung ke backend API dengan notifikasi Toast.
- **Portal Staf & Admin Terpisah (`/admin`)**:
  - Halaman publik (`/`) bersih tanpa tombol admin demi tampilan profesional bagi pengunjung & anggota.
  - Halaman admin khusus diakses melalui URL: **`http://localhost:5000/admin`**.
  - **Custom Login Endpoint**: Proteksi sesi staf melalui `POST /api/admin/login` dengan Bearer token.
  - Kredensial default: Username `admin_gym` / Password `Gymbone2026` (dikonfigurasi di `backend/.env`).
  - Metrik statistik gym secara live (total booking, kapasitas utilisasi, total member aktif, dan pelanggan newsletter).
  - Manajemen reservasi kelas dengan fitur **Batalkan Booking (1-Click Cancel)** yang otomatis mengembalikan kuota slot ke jadwal.
  - Daftar direktori anggota terdaftar & daftar email prospek newsletter.
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

