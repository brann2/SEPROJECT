# 🚀 Panduan Deployment MindCare ke IDCloudHost

## 📋 Prerequisites

Sebelum deployment, pastikan Anda memiliki:
- Akun IDCloudHost dengan paket hosting yang mendukung Node.js
- Domain yang sudah terdaftar di IDCloudHost
- Akses ke cPanel IDCloudHost

## 🔧 Langkah-langkah Deployment

### 1. Build Project Lokal

```bash
# Install dependencies
npm install

# Build project untuk production
npm run build

# Atau gunakan script deployment
chmod +x deploy.sh
./deploy.sh
```

### 2. Upload ke IDCloudHost

#### Metode 1: Via cPanel File Manager
1. Login ke cPanel IDCloudHost
2. Buka **File Manager**
3. Navigasi ke folder `public_html`
4. Upload semua file dari folder `dist/` ke `public_html`
5. Upload file `.htaccess` ke root `public_html`

#### Metode 2: Via FTP
1. Gunakan FTP client (FileZilla, WinSCP, dll)
2. Connect ke server IDCloudHost
3. Upload file dari `dist/` ke `public_html`

### 3. Konfigurasi Domain

1. Di cPanel, buka **Domains**
2. Pastikan domain Anda mengarah ke folder `public_html`
3. Jika menggunakan subdomain, buat di **Subdomains**

### 4. Setup Environment Variables

Jika menggunakan Supabase, setup environment variables di IDCloudHost:

#### Via cPanel
1. Buka **Software** > **Setup Node.js App**
2. Buat aplikasi Node.js baru
3. Set environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

#### Via .env file (Alternative)
Buat file `.env` di root `public_html`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Konfigurasi SSL

1. Di cPanel, buka **SSL/TLS**
2. Install SSL certificate untuk domain Anda
3. Aktifkan **Force HTTPS Redirect**

## 🔍 Troubleshooting

### White Screen
- Pastikan file `.htaccess` sudah terupload
- Cek error log di cPanel > **Errors**
- Pastikan semua file dari `dist/` sudah terupload

### Routing Issues
- Pastikan `.htaccess` berisi rewrite rules untuk React Router
- Cek apakah mod_rewrite aktif di server

### Environment Variables
- Pastikan environment variables sudah diset dengan benar
- Cek di browser console untuk error

## 📁 Struktur File Setelah Deployment

```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── [other static files]
```

## 🌐 URL Akses

Setelah deployment berhasil, aplikasi akan tersedia di:
- `https://yourdomain.com`
- `https://www.yourdomain.com`

## 🔄 Update Deployment

Untuk update aplikasi:

1. Build ulang project: `npm run build`
2. Upload file baru dari `dist/` ke `public_html`
3. Clear cache browser atau server

## 📞 Support

Jika mengalami masalah:
1. Cek error log di cPanel
2. Hubungi support IDCloudHost
3. Pastikan semua konfigurasi sudah benar

## 🎯 Optimasi Performa

- Aktifkan **Gzip Compression** di cPanel
- Gunakan **CDN** untuk assets statis
- Optimasi gambar sebelum upload
- Aktifkan **Browser Caching**

---

**Note**: Panduan ini disesuaikan untuk IDCloudHost. Untuk provider hosting lain, mungkin ada perbedaan dalam konfigurasi. 