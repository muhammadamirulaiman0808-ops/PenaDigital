# PenaDigital AI (Malaysia) 🇲🇾

Platform Web Penjana Surat Rasmi standard JPA dan korporat Malaysia menggunakan Next.js, Tailwind CSS, dan enjin AI.

## 🚀 Ciri-Ciri Utama MVP
1. **10 Templat Rasmi:**
   - Cuti Kerja & Peletakan Jawatan (Resign)
   - Rayuan Kenaikan Gaji & Surat Tunjuk Sebab
   - Pelepasan Kuliah & Rayuan Semakan Gred Pelajar
   - Aduan Awam PBT & Rayuan Saman Trafik/PBT
   - Tuntutan Invois Tertunggak & Jemputan Rasmi VIP
2. **Pematuhan Format Rasmi Malaysia:**
   - Kedudukan nombor rujukan & tarikh di sebelah kanan
   - Perenggan 1 tanpa nombor, perenggan seterusnya bernombor (2., 3., ...)
   - Slogan rasmi "BERKHIDMAT UNTUK NEGARA" / "Yang benar"
3. **Eksport Dokumen:**
   - Muat turun fail Microsoft Word (.docx) dengan margin dan tipografi standard
   - Cetak terus PDF A4
4. **Pilihan Model Harga (Modal RM0):**
   - 3 surat percuma peranti
   - Pilihan Pay-per-surat (RM1.90) & Pro Bulanan (RM9.90)

---

## 💻 Cara Uji di Laptop (Localhost)

1. Buka folder ini di PowerShell / Terminal:
   ```bash
   cd "c:\Users\Nursyifaa\OneDrive\Documents\BUSINESS\Surat & Bahasa AI\web-app"
   ```
2. Pasang pakej:
   ```bash
   npm install
   ```
3. Mulakan server:
   ```bash
   npm run dev
   ```
4. Buka pelayar web di `http://localhost:3000`.

*(Pilihan)* Untuk aktifkan AI Gemini sepenuhnya, cipta fail `.env.local` dan masukkan:
```env
GEMINI_API_KEY=kunci_api_gemini_anda
```
*(Jika tiada API key, aplikasi automatik berjalan menggunakan enjin templat pintar tempatan).*

---

## 🌐 Cara Deploy ke Internet (Live & Percuma)

Paling mudah menggunakan **Vercel** (pembina Next.js):
1. Cipta akaun percuma di [github.com](https://github.com) dan [vercel.com](https://vercel.com).
2. Muat naik (push) folder ini ke repositori GitHub anda.
3. Di dashboard Vercel: Tekan **"Add New Project"** -> Pilih repositori GitHub tadi -> Tekan **"Deploy"**.
4. Dalam 1 minit, laman web anda akan terus aktif dengan URL rasmi (contoh: `surat-bahasa-ai.vercel.app`)!
