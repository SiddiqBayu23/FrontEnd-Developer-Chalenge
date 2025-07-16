# User Guide - OBE Dashboard Next.js

## 🎯 Panduan Lengkap Penggunaan Aplikasi

Dashboard OBE ini dibangun dengan Next.js 14+ dan dirancang untuk memudahkan dosen dalam mengelola nilai mahasiswa dengan sistem Outcome Based Education (OBE). Panduan ini akan membantu Anda memahami semua fitur dan cara penggunaannya.

## 🚀 Memulai

### Akses Aplikasi
1. Buka browser web modern (Chrome, Firefox, Safari, atau Edge)
2. Navigasi ke URL aplikasi
3. Aplikasi akan terbuka dengan Dashboard utama
4. Interface akan otomatis menyesuaikan ukuran layar Anda

### Interface Utama
- **Header**: Navigasi utama dengan branding BTIK UDINUS
- **Sidebar**: Menu navigasi dengan 5 pilihan utama (desktop)
- **Main Content**: Area kerja utama dengan konten dinamis
- **Responsive**: Otomatis menyesuaikan untuk mobile, tablet, dan desktop

## 📊 Dashboard Utama (/)

### Overview Statistik
Dashboard menampilkan 4 kartu statistik utama:

1. **Total Kelas**: Jumlah kelas yang diampu
   - Warna: Biru (Primary)
   - Icon: School

2. **Total Mahasiswa**: Jumlah mahasiswa di semua kelas
   - Warna: Teal (Secondary)
   - Icon: People

3. **Kelas Terkonfigurasi**: Perbandingan kelas yang sudah/belum dikonfigurasi
   - Warna: Hijau (Success)
   - Icon: CheckCircle
   - Format: "X/Y" (configured/total)

4. **Rata-rata Progress**: Persentase progress penilaian
   - Warna: Orange (Warning)
   - Icon: Assessment
   - Format: "X%" dengan progress bar

### Daftar Kelas
Setiap kelas ditampilkan dalam format card dengan informasi:

#### Informasi Kelas
- **Nama Mata Kuliah**: Contoh "Pemrograman Web"
- **Semester**: Contoh "Ganjil 2024/2025"
- **Jumlah Mahasiswa**: Ditampilkan dengan ikon orang
- **Status Konfigurasi**: 
  - ✅ **Configured** (chip hijau): Sudah dikonfigurasi
  - ⚠️ **Not Configured** (chip kuning): Belum dikonfigurasi

#### Progress Indicator
- **Progress Bar**: Menunjukkan persentase kelengkapan nilai
- **Warna**: Gradasi dari merah ke hijau berdasarkan progress
- **Label**: Persentase numerik di atas progress bar

#### Tombol Aksi
- **Konfigurasi**: Setup persentase komponen nilai
  - Selalu aktif untuk semua kelas
  - Navigasi ke `/configuration`
- **Input Nilai**: Masuk ke halaman input nilai
  - Hanya aktif jika kelas sudah dikonfigurasi
  - Navigasi ke `/grades`

### Hover Effects
- **Card Hover**: Kartu terangkat dengan shadow yang lebih dalam
- **Button Hover**: Perubahan warna dan efek transisi
- **Smooth Animations**: Semua transisi menggunakan ease-out timing

## ⚙️ Konfigurasi Komponen Nilai (/configuration)

### Mengakses Konfigurasi
1. Dari Dashboard, klik tombol **"Konfigurasi"** pada card kelas
2. Atau gunakan menu **"Konfigurasi"** di sidebar
3. Sistem akan redirect ke `/configuration`

### Validasi Akses
- **Kelas Terpilih**: Harus memilih kelas dari dashboard
- **Error State**: Jika tidak ada kelas terpilih, tampil pesan error
- **Back Navigation**: Tombol kembali ke dashboard

### Komponen Nilai
Sistem OBE menggunakan 5 komponen nilai:

1. **Tugas** (default: 25%)
   - Kontribusi bab dapat disesuaikan
   - Slider range: 0-50%

2. **UTS** (default: 20%)
   - Ujian Tengah Semester
   - Biasanya fokus pada bab awal

3. **UAS** (default: 30%)
   - Ujian Akhir Semester
   - Komponen dengan bobot tertinggi

4. **Proyek** (default: 20%)
   - Project-based assessment
   - Biasanya fokus pada bab akhir

5. **Kuis** (default: 5%)
   - Assessment berkala
   - Bobot paling kecil

### Cara Mengatur Persentase
1. **Menggunakan Slider**: 
   - Geser slider untuk mengubah persentase
   - Range: 0-50% per komponen
   - Marks pada 0%, 25%, 50%

2. **Real-time Feedback**:
   - Total persentase ditampilkan di atas
   - Chip berwarna: Hijau (100%) atau Merah (≠100%)

3. **Validasi Otomatis**:
   - Error message jika total ≠ 100%
   - Tombol simpan disabled jika ada error

### Konfigurasi Kontribusi Bab
Setiap komponen memiliki 5 bab dengan kontribusi yang dapat diatur:

#### Struktur Bab
- **Bab 1**: Kontribusi terhadap komponen (default: 20%)
- **Bab 2**: Kontribusi terhadap komponen (default: 20%)
- **Bab 3**: Kontribusi terhadap komponen (default: 20%)
- **Bab 4**: Kontribusi terhadap komponen (default: 20%)
- **Bab 5**: Kontribusi terhadap komponen (default: 20%)

#### Pengaturan Kontribusi
- **Slider per Bab**: Range 0-50%
- **Real-time Display**: Persentase ditampilkan di samping nama bab
- **Total Indicator**: Paper dengan total kontribusi bab
- **Validation**: Total harus = 100% per komponen

### Validasi Konfigurasi
❌ **Error akan muncul jika**:
- Total persentase komponen ≠ 100%
- Total kontribusi bab untuk setiap komponen ≠ 100%
- Alert merah dengan daftar error

✅ **Konfigurasi valid jika**:
- Total persentase komponen = 100%
- Total kontribusi bab untuk setiap komponen = 100%
- Chip hijau dan tombol simpan aktif

### Menyimpan Konfigurasi
1. **Validasi**: Pastikan tidak ada error (pesan merah)
2. **Tombol Simpan**: Klik **"Simpan Konfigurasi"**
3. **Feedback**: Alert JavaScript "Konfigurasi berhasil disimpan!"
4. **Status Update**: Status kelas berubah menjadi "Configured"
5. **Navigation**: Dapat kembali ke dashboard

### Tombol Reset
- **Fungsi**: Mengembalikan ke konfigurasi awal
- **Icon**: Refresh
- **Behavior**: Reset semua slider ke nilai default

## 📝 Input Nilai Mahasiswa (/grades)

### Mengakses Input Nilai
1. Dari Dashboard, klik tombol **"Input Nilai"** pada kelas yang sudah dikonfigurasi
2. Atau gunakan menu **"Input Nilai"** di sidebar
3. Sistem akan redirect ke `/grades`

### Validasi Akses
- **Kelas Terpilih**: Harus memilih kelas dari dashboard
- **Kelas Terkonfigurasi**: Kelas harus sudah dikonfigurasi
- **Error States**: 
  - Tidak ada kelas terpilih
  - Kelas belum dikonfigurasi

### Interface Input Nilai
Tampilan berupa tabel responsif dengan struktur:

#### Kolom Tetap
- **Kolom 1**: Nama Mahasiswa (sticky)
- **Kolom 2**: NIM (sticky)

#### Kolom Dinamis (5 komponen × 5 bab = 25 kolom)
- **Header Ganda**: 
  - Baris 1: Nama komponen (Tugas, UTS, UAS, Proyek, Kuis)
  - Baris 2: Nama bab (Bab 1, Bab 2, dst)
- **Input Fields**: TextField dengan validasi

#### Kolom Hasil
- **Nilai Akhir**: Otomatis terhitung (bold, warna primary)
- **Grade Huruf**: Chip berwarna (A, B, C, D, E)

### Cara Input Nilai
1. **Klik Cell**: Klik pada TextField yang ingin diisi
2. **Masukkan Nilai**: Ketik nilai antara 0-100
3. **Validasi Real-time**: 
   - Error jika nilai < 0 atau > 100
   - Error jika input bukan angka
4. **Auto-save**: Nilai tersimpan otomatis ke store

### Validasi Input
❌ **Error akan muncul jika**:
- Nilai < 0 atau > 100
- Input bukan angka (NaN)
- Helper text merah di bawah field

✅ **Input valid jika**:
- Nilai antara 0-100
- Input berupa angka valid
- Field border normal (tidak merah)

### Menghitung Nilai Akhir
1. **Tombol Hitung**: Klik **"Hitung Nilai Akhir"** (button besar, primary)
2. **Proses Kalkulasi**:
   - Nilai per komponen berdasarkan kontribusi bab
   - Nilai akhir berdasarkan persentase komponen
   - Grade huruf berdasarkan skala nilai
3. **Update Display**: Kolom nilai akhir dan grade terupdate

### Skala Grade
- **A**: 85-100 (chip hijau)
- **A-**: 80-84 (chip hijau)
- **B+**: 75-79 (chip biru)
- **B**: 70-74 (chip biru)
- **B-**: 65-69 (chip biru)
- **C+**: 60-64 (chip orange)
- **C**: 55-59 (chip orange)
- **C-**: 50-54 (chip orange)
- **D+**: 45-49 (chip merah)
- **D**: 40-44 (chip merah)
- **E**: 0-39 (chip merah)

### Responsive Table
- **Desktop**: Full table dengan semua kolom visible
- **Tablet**: Horizontal scroll dengan sticky columns
- **Mobile**: Horizontal scroll dengan touch-friendly interface

## 📊 Analisis Nilai

### Statistik Kelas
Card pertama menampilkan:

1. **Rata-rata Kelas**: 
   - Nilai rata-rata semua mahasiswa
   - Typography H4, warna primary
   - Calculated real-time

2. **Total Mahasiswa**: 
   - Jumlah mahasiswa di kelas
   - Typography H4, warna secondary

3. **Progress Penilaian**: 
   - Persentase kelengkapan input nilai
   - Linear progress bar dengan label
   - Height 8px, border radius 4px

### Grafik Rata-rata per Komponen
Bar chart yang menunjukkan:
- **Data**: Performa mahasiswa per komponen
- **X-Axis**: Nama komponen (Tugas, UTS, UAS, Proyek, Kuis)
- **Y-Axis**: Nilai rata-rata (0-100)
- **Color**: Primary blue (#1976d2)
- **Responsive**: 100% width, height 300px
- **Tooltip**: Hover untuk detail nilai

### Distribusi Grade
Pie chart yang menampilkan:
- **Data**: Persentase mahasiswa per grade
- **Labels**: Grade dengan persentase (A (25.5%))
- **Colors**: Array 5 warna berbeda
- **Interactive**: Hover untuk detail
- **Legend**: Otomatis generated

### Detail Distribusi
Paper cards yang menunjukkan:
- **Layout**: Flex dengan gap 2
- **Content**: 
  - Chip dengan grade dan warna
  - Jumlah mahasiswa
  - Persentase dari total
- **Colors**: Sesuai dengan pie chart
- **Typography**: Body2 untuk detail

## 🔧 Fitur Tambahan

### Navigasi Next.js
- **useRouter**: Programmatic navigation
- **usePathname**: Active menu detection
- **Back Button**: Dengan ArrowBack icon
- **Breadcrumb**: Visual navigation indicator

### Responsive Design
- **Desktop** (>1024px): 
  - Full sidebar (240px width)
  - Full table layout
  - Grid layout untuk cards

- **Tablet** (768-1024px): 
  - Sidebar tetap visible
  - Horizontal scroll untuk table
  - Adjusted grid columns

- **Mobile** (<768px): 
  - Sidebar hidden (display: none)
  - Touch-friendly interfaces
  - Stacked layout untuk cards
  - Horizontal scroll dengan momentum

### Loading States
- **Fade-in Animation**: 0.3s ease-out
- **Skeleton Loading**: Untuk data yang loading
- **Progress Indicators**: Untuk long-running operations
- **Smooth Transitions**: Semua state changes

### Error Handling
- **Real-time Validation**: Immediate feedback
- **Error Messages**: Clear dan helpful
- **Error States**: Visual indicators (red borders, helper text)
- **Success Feedback**: Confirmation untuk successful actions

## 🎯 Workflow Penggunaan

### Workflow Lengkap
1. **Dashboard** (/) → Lihat overview kelas
2. **Pilih Kelas** → Klik card kelas yang diinginkan
3. **Konfigurasi** (/configuration) → Setup persentase komponen dan kontribusi bab
4. **Simpan Konfigurasi** → Validasi dan simpan pengaturan
5. **Input Nilai** (/grades) → Masukkan nilai mahasiswa
6. **Hitung Nilai Akhir** → Generate nilai akhir dan grade
7. **Analisis** → Review performa kelas dengan charts

### Best Practices
1. **Konfigurasi Dulu**: Pastikan konfigurasi selesai sebelum input nilai
2. **Input Bertahap**: Input nilai secara bertahap, tidak perlu sekaligus
3. **Validasi Berkala**: Periksa error messages secara berkala
4. **Gunakan Navigation**: Manfaatkan back button dan sidebar
5. **Review Analisis**: Gunakan charts untuk evaluasi pembelajaran

## 🚨 Troubleshooting

### Masalah Umum & Solusi

#### Tidak Bisa Input Nilai
**Penyebab**: Kelas belum dikonfigurasi
**Solusi**: 
1. Kembali ke Dashboard (/)
2. Klik "Konfigurasi" pada kelas
3. Lengkapi konfigurasi komponen
4. Simpan konfigurasi
5. Kembali ke input nilai

#### Error "Total Persentase Harus 100%"
**Penyebab**: Persentase komponen tidak sama dengan 100%
**Solusi**:
1. Periksa chip total persentase di bagian atas
2. Sesuaikan slider komponen
3. Pastikan total = 100%
4. Error akan hilang otomatis

#### Nilai Tidak Tersimpan
**Penyebab**: Input nilai invalid
**Solusi**:
1. Periksa range nilai (0-100)
2. Pastikan input berupa angka
3. Lihat helper text merah di bawah field
4. Perbaiki input yang error

#### Aplikasi Lambat
**Penyebab**: Data terlalu banyak atau koneksi lambat
**Solusi**:
1. Refresh browser (Ctrl+F5)
2. Input nilai secara bertahap
3. Hitung nilai akhir setelah semua input
4. Gunakan browser modern

#### Navigation Tidak Berfungsi
**Penyebab**: JavaScript error atau browser compatibility
**Solusi**:
1. Refresh halaman
2. Gunakan browser yang didukung
3. Enable JavaScript
4. Clear browser cache

## 📱 Tips Penggunaan

### Keyboard Shortcuts
- **Tab**: Pindah ke field berikutnya
- **Shift+Tab**: Pindah ke field sebelumnya
- **Enter**: Konfirmasi input dan pindah ke baris berikutnya
- **Escape**: Cancel input
- **Ctrl+Home**: Kembali ke dashboard

### Mobile Usage
- **Touch**: Tap untuk input dan navigasi
- **Swipe**: Scroll tabel horizontal
- **Pinch**: Zoom pada grafik (jika didukung)
- **Long Press**: Context menu (browser dependent)
- **Pull to Refresh**: Refresh halaman

### Efficiency Tips
1. **Batch Input**: Input nilai per komponen (semua mahasiswa)
2. **Keyboard Navigation**: Gunakan Tab untuk navigasi cepat
3. **Copy-Paste**: Gunakan Ctrl+C/V untuk nilai yang sama
4. **Quick Calculation**: Gunakan tombol hitung setelah input batch
5. **Bookmark Pages**: Bookmark untuk akses cepat

### Browser Compatibility
- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Responsive support

## 📞 Support

### Kontak Support
- **Email**: support@udinus.ac.id
- **Phone**: +62-24-3517261
- **Office Hours**: Senin-Jumat 08:00-16:00
- **Response Time**: 1-2 hari kerja

### Pelaporan Bug
Jika menemukan bug, sertakan:
1. **Screenshot**: Error message atau behavior
2. **Steps to Reproduce**: Langkah-langkah detail
3. **Browser Info**: Chrome/Firefox/Safari + version
4. **Device Info**: Desktop/Tablet/Mobile
5. **Data Context**: Kelas dan nilai yang diinput

### Request Feature
Untuk request fitur baru:
1. **Jelaskan Kebutuhan**: Use case yang spesifik
2. **Berikan Contoh**: Mockup atau referensi
3. **Priority Level**: Urgent/High/Medium/Low
4. **Business Impact**: Manfaat untuk pengguna

### Technical Requirements
- **Browser**: Modern browser dengan JavaScript enabled
- **Internet**: Stable internet connection
- **Screen**: Minimum 320px width
- **Performance**: 2GB RAM recommended

---

**Catatan**: Panduan ini untuk Next.js implementation. Fitur dapat berkembang dalam versi future dengan server-side capabilities dan database integration.