# MindCare – Aplikasi Mobile untuk Dukungan Kesehatan Mental

## Project info

**URL**: https://lovable.dev/projects/f20a30d6-1463-43fd-8551-3a5d1a185dcf

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f20a30d6-1463-43fd-8551-3a5d1a185dcf) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f20a30d6-1463-43fd-8551-3a5d1a185dcf) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 1. Latar Belakang & Tujuan

Di era digital yang serba cepat dan penuh tekanan, isu kesehatan mental menjadi semakin mendesak untuk ditangani secara inklusif dan terstruktur. Berbagai kalangan, khususnya remaja dan dewasa muda, menghadapi tantangan mental seperti stres akademik, tekanan pekerjaan, kesepian, burnout, hingga gangguan cemas yang menghambat produktivitas dan kualitas hidup mereka. Sayangnya, akses terhadap layanan psikologis masih sangat terbatas, baik karena faktor biaya, jarak, kurangnya edukasi, maupun stigma sosial yang masih melekat.

Melihat kebutuhan tersebut, MindCare hadir sebagai solusi digital berupa aplikasi mobile yang bertujuan untuk:

- Menyediakan ruang aman dan privat untuk eksplorasi kesehatan mental secara mandiri.
- Memberikan akses awal terhadap self-help tools serta layanan konsultasi psikolog profesional secara daring.
- Meningkatkan literasi masyarakat tentang kesehatan mental melalui konten edukatif yang berkualitas.
- Mendorong pengguna untuk rutin mengevaluasi kondisi emosional dan membangun kebiasaan positif secara progresif.

## 2. Target Pengguna

MindCare ditujukan untuk individu yang memiliki ketertarikan atau kebutuhan dalam menjaga kesehatan mental, dengan karakteristik sebagai berikut:

- **Mahasiswa dan Pelajar**: menghadapi tekanan akademik dan transisi usia dewasa.
- **Dewasa muda (18–30 tahun)**: sedang berada pada fase karier awal, peralihan hidup, dan relasi sosial yang dinamis.
- **Masyarakat umum**: yang membutuhkan alat bantu dasar untuk mengenali kondisi mental sebelum berkonsultasi lebih lanjut ke tenaga profesional.

Ciri pengguna:

- Familiar dengan teknologi digital dan terbiasa menggunakan aplikasi mobile.
- Mencari pendekatan fleksibel, non-stigmatis, dan bersifat anonim.
- Menghargai privasi dan kecepatan akses informasi.

## 3. Kebutuhan Fungsional

- Tersedia fitur self-assessment untuk mengevaluasi kondisi emosional (depresi, kecemasan, burnout, dll).
- Pengguna dapat mengakses artikel seputar kesehatan mental.
- Tersedia fitur journaling harian untuk mencatat suasana hati dan refleksi pribadi.
- Pengguna dapat mengakses layanan konsultasi daring (chat) dengan psikolog.
- Sistem mendukung fitur chatbot (chatbot interaktif) untuk menjawab pertanyaan umum, memberikan tips harian, dan mendampingi pengguna secara otomatis.
- Pengguna dapat melaporkan konten atau interaksi yang melanggar etika atau ketentuan.

## 4. Kebutuhan Non-Fungsional

- **Keamanan**: Semua data pribadi pengguna disimpan secara terenkripsi menggunakan standar industri.
- **Privasi**: Sistem sesuai dengan prinsip GDPR dan UU Perlindungan Data Pribadi (PDP) di Indonesia.
- **Usability**: Desain antarmuka minimalis, intuitif, dan user-friendly untuk semua kalangan.
- **Performa**: Aplikasi dapat diakses dengan lancar di perangkat Android dan iOS menengah ke atas, tanpa lag.
- **Kompatibilitas**: Mendukung Android versi 8 ke atas dan iOS 12 ke atas.
- **Ketersediaan**: Target uptime sistem ≥ 99% selama periode peluncuran awal.

## 5. Fitur Utama

### 5.1. Registrasi dan Login

- Registrasi dengan email, nomor HP, atau akun Google.
- Dukungan autentikasi dua faktor (opsional).
- Profil pengguna: nama, usia, jenis kelamin, tujuan penggunaan aplikasi.

### 5.2. Jurnal Harian

- Fitur catatan bebas harian.
- Prompt refleksi seperti "apa yang kamu syukuri hari ini".

### 5.3. Konseling Online

- Layanan chat dengan psikolog profesional melalui jadwal yang tersedia.
- Komunikasi aman dan terenkripsi.
- Pengguna dapat memberikan rating dan ulasan untuk psikolog.

### 5.4. Artikel & Tips Kesehatan Mental

- Akses artikel yang ditulis oleh psikolog dan praktisi.
- Topik meliputi kecemasan, stres, self-esteem, burnout, dan lainnya.
- Fitur bookmark artikel untuk dibaca ulang.

### 5.5. Chatbot Interaktif (AI Assistant)

- Menjawab pertanyaan umum seputar kesehatan mental.
- Memberikan tips harian dan afirmasi positif.
- Tidak menggantikan psikolog, hanya memberikan pendampingan awal.

## 6. Batasan Sistem

- Aplikasi tidak menggantikan diagnosis resmi dari profesional kesehatan jiwa secara langsung.
- Konsultasi dengan psikolog hanya tersedia sesuai jam kerja dan jadwal yang ditentukan.
- Versi awal hanya tersedia dalam Bahasa Indonesia.
- Tidak menyediakan fitur komunitas terbuka untuk menghindari penyebaran informasi tidak terverifikasi.
- Fitur konsultasi tidak ditujukan untuk kondisi darurat atau krisis psikologis berat.
- Fitur chatbot hanya menjawab pertanyaan seputar kesehatan mental.

## 7. Kriteria Keberhasilan

Dalam waktu 1 bulan setelah peluncuran, proyek dianggap berhasil apabila:

- Aplikasi berhasil menjangkau minimal 10 pengguna aktif.
- 80% pengguna memberikan respons positif terhadap pengalaman pengguna (user experience) dalam survei internal.
- Semua fitur utama dapat berfungsi tanpa bug mayor dalam uji coba akhir.
- Aplikasi mencapai uptime minimal 95% selama bulan pertama.
- Chatbot AI mampu merespons minimal 5 topik kesehatan mental dasar dengan akurat dan nada mendukung.

## 8. Timeline Pengembangan (High-Level)

| Tahapan                               | Waktu (Minggu) |
|---------------------------------------|----------------|
| Riset pengguna & validasi ide         | Minggu 1       |
| Penyusunan PRD & desain wireframe     | Minggu 2       |
| Pengembangan fitur utama (core)       | Minggu 3–4     |
| Integrasi backend & front-end         | Minggu 5       |
| Pengujian internal (UAT)              | Minggu 6       |
| Perbaikan & optimalisasi awal         | Minggu 7       |
| Peluncuran beta                       | Minggu 8       |

## 9. Referensi / Sumber

- **WHO**: [World Mental Health Report (2022)](https://www.who.int/publications/i/item/9789240049338)
- **HIMPSI** – [Pedoman Praktik Psikologi Klinis](https://himpsi.or.id/)

Aplikasi sejenis untuk benchmarking fitur dan UX:

- [Riliv](https://riliv.co)
- [Mindtera](https://mindtera.com)
- [Calm](https://www.calm.com)

Jurnal ilmiah: "Digital Interventions for Mental Health in Youth" (Elsevier, 2022) [https://doi.org/10.1016/j.chc.2021.12.004](https://doi.org/10.1016/j.chc.2021.12.004)
