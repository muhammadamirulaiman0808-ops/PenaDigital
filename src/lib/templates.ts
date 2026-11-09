import { LetterTemplate } from '@/types/letter';

export const LETTER_CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: 'semua', label: 'Semua Templat', icon: 'FileText' },
  { id: 'kerja', label: 'Pekerjaan & Kerjaya', icon: 'Briefcase' },
  { id: 'pelajar', label: 'Pelajar & Universiti', icon: 'GraduationCap' },
  { id: 'aduan_rayuan', label: 'Aduan & Rayuan Rasmi', icon: 'AlertCircle' },
  { id: 'perniagaan', label: 'Perniagaan & Komuniti', icon: 'Building2' },
];

export const LETTER_TEMPLATES: LetterTemplate[] = [
  // 1. Kerja: Mohon Cuti
  {
    id: 'cuti_kerja',
    category: 'kerja',
    name: 'Surat Permohonan Cuti Kerja',
    description: 'Permohonan cuti rehat, kecemasan, atau urusan peribadi kepada majikan.',
    defaultSubject: 'PERMOHONAN CUTI REHAT / KECEMASAN',
    defaultSalutation: 'Tuan / Puan,',
    suggestedClosing: 'Kerjasama dan pertimbangan daripada pihak Tuan/Puan amat saya hargai.',
    guidance: 'Nyatakan tarikh mula, tarikh tamat, jumlah hari cuti, serta rancangan penggantian tugas (handover).',
    fields: [
      { key: 'jenisCuti', label: 'Jenis Cuti', placeholder: 'Cth: Cuti Rehat Tahunan / Cuti Kecemasan Keluarga', required: true },
      { key: 'tarikhMula', label: 'Tarikh Mula Cuti', placeholder: 'Cth: 15 November 2026', required: true },
      { key: 'tarikhTamat', label: 'Tarikh Tamat Cuti', placeholder: 'Cth: 18 November 2026', required: true },
      { key: 'jumlahHari', label: 'Bilangan Hari', placeholder: 'Cth: 4 hari bekerja', required: true },
      { key: 'alasanCuti', label: 'Sebab / Alasan Cuti', placeholder: 'Cth: Menguruskan hal kecemasan keluarga di kampung halaman...', type: 'textarea', required: true },
      { key: 'penamaTugas', label: 'Pegawai Pengganti (Handover)', placeholder: 'Cth: Encik Hafiz telah bersetuju mengambil alih tugas semasa ketiadaan saya', required: false }
    ]
  },

  // 2. Kerja: Peletakan Jawatan
  {
    id: 'letak_jawatan',
    category: 'kerja',
    name: 'Surat Peletakan Jawatan (Resign)',
    description: 'Notis rasmi berhenti kerja mengikut syarat kontrak dan tempoh notis.',
    defaultSubject: 'NOTIS PELETAKAN JAWATAN SEBAGAI [JAWATAN SEMASA]',
    defaultSalutation: 'Tuan / Puan,',
    suggestedClosing: 'Saya mengucapkan setinggi-tinggi penghargaan atas peluang dan bimbingan sepanjang perkhidmatan saya.',
    guidance: 'Pastikan tempoh notis (cth: 1 bulan / 2 minggu) selaras dengan surat tawaran kerja anda.',
    fields: [
      { key: 'jawatanSemasa', label: 'Jawatan Anda Sekarang', placeholder: 'Cth: Eksekutif Pemasaran Digital', required: true },
      { key: 'jabatanUnit', label: 'Bahagian / Jabatan', placeholder: 'Cth: Jabatan Komunikasi Korporat', required: true },
      { key: 'tempohNotis', label: 'Tempoh Notis', placeholder: 'Cth: Satu (1) bulan selaras dengan syarat kontrak', required: true },
      { key: 'tarikhAkhir', label: 'Hari Terakhir Bekerja', placeholder: 'Cth: 15 Disember 2026', required: true },
      { key: 'sebabRingkas', label: 'Sebab Ringkas (Pilihan)', placeholder: 'Cth: Menerima tawaran kerjaya baharu / menyambung pengajian / urusan peribadi', type: 'textarea' }
    ]
  },

  // 3. Kerja: Rayuan Gaji / Kenaikan
  {
    id: 'rayuan_kenaikan',
    category: 'kerja',
    name: 'Surat Rayuan Semakan Gaji / Pangkat',
    description: 'Mengemukakan rayuan pertimbangan semakan imbuhan berasaskan sumbangan.',
    defaultSubject: 'RAYUAN SEMAKAN DAN PERTIMBANGAN PENYELARASAN GAJI',
    defaultSalutation: 'Tuan,',
    suggestedClosing: 'Besar harapan saya agar permohonan ini mendapat pertimbangan sewajarnya daripada pihak pengurusan.',
    guidance: 'Fokus kepada pencapaian dan nilai tambah yang telah anda berikan kepada syarikat secara sopan.',
    fields: [
      { key: 'jawatanSemasa', label: 'Jawatan & Tempoh Berkhidmat', placeholder: 'Cth: Pegawai Sokongan IT (telah berkhidmat 3 tahun)', required: true },
      { key: 'sumbanganUtama', label: 'Pencapaian / Beban Tugas Tambahan', placeholder: 'Cth: Berjaya mengetuai migrasi sistem cloud syarikat tanpa kos luar...', type: 'textarea', required: true },
      { key: 'cadanganSemakan', label: 'Cadangan / Harapan Semakan', placeholder: 'Cth: Memohon pertimbangan kenaikan gaji sebanyak 15% selaras dengan pasaran semasa', required: true }
    ]
  },

  // 4. Kerja: Surat Tunjuk Sebab
  {
    id: 'tunjuk_sebab',
    category: 'kerja',
    name: 'Surat Jawapan Tunjuk Sebab (Show Cause)',
    description: 'Memberikan penjelasan rasmi dan berhemah terhadap surat tunjuk sebab daripada majikan.',
    defaultSubject: 'PENJELASAN BERHUBUNG SURAT TUNJUK SEBAB BERTARIKH [TARIKH]',
    defaultSalutation: 'Tuan / Puan,',
    suggestedClosing: 'Saya berjanji akan terus komited dan memastikan perkara seumpama ini tidak berulang kembali.',
    guidance: 'Gunakan nada yang rendah diri, jujur, dan berikan bukti atau sebab munasabah tanpa menyalahkan orang lain.',
    fields: [
      { key: 'rujukanSuratAsal', label: 'No. Rujukan & Tarikh Surat Tunjuk Sebab', placeholder: 'Cth: HR/DISC/2026/04 bertarikh 2 November 2026', required: true },
      { key: 'isuDibangkitkan', label: 'Perkara / Isu yang Dinyatakan', placeholder: 'Cth: Ketidakhadiran bertugas tanpa makluman awal pada 1 November 2026', required: true },
      { key: 'kronologiSebab', label: 'Penjelasan & Alasan Sebenar', placeholder: 'Cth: Saya mengalami kerosakan kenderaan teruk di lebuh raya dan talian telefon terputus...', type: 'textarea', required: true },
      { key: 'tindakanSusulan', label: 'Langkah Pembetulan yang Telah Diambil', placeholder: 'Cth: Saya telah melengkapkan kerja tertunggak dan menyerahkan resit bengkel tunda...', required: true }
    ]
  },

  // 5. Pelajar: Cuti / Pelepasan Kuliah
  {
    id: 'cuti_pelajar',
    category: 'pelajar',
    name: 'Surat Pelepasan Kuliah / Cuti Sakit',
    description: 'Surat mohon cuti atau pelepasan hadir kuliah/kelas kepada dekan, pensyarah, atau tutor.',
    defaultSubject: 'PERMOHONAN PELEPASAN KULIAH / KELAS AKIBAT KECEMASAN KESIHATAN',
    defaultSalutation: 'Prof. / Dr. / Tuan / Puan,',
    suggestedClosing: 'Segala kerjasama dan keperihatinan pihak Dr./Tuan amat dihargai dan didahului ucapan terima kasih.',
    guidance: 'Sertakan no. matrik, kod kursus yang terlibat, dan nyatakan bahawa sijil cuti sakit (MC) dilampirkan.',
    fields: [
      { key: 'noMatrik', label: 'No. Matrik & Program Pengajian', placeholder: 'Cth: A188204 - Ijazah Sarjana Muda Sains Komputer', required: true },
      { key: 'namaPensyarahKursus', label: 'Nama Kursus / Kod Subjek', placeholder: 'Cth: CS301 (Algoritma dan Struktur Data)', required: true },
      { key: 'tarikhKetidakhadiran', label: 'Tarikh & Masa Kelas', placeholder: 'Cth: 10 November 2026 (10:00 pagi - 12:00 tengah hari)', required: true },
      { key: 'sebabCuti', label: 'Sebab Ketidakhadiran', placeholder: 'Cth: Disahkan dijangkiti demam denggi dan dimasukkan ke wad...', type: 'textarea', required: true },
      { key: 'lampiran', label: 'Dokumen Sokongan yang Dilampirkan', placeholder: 'Cth: Sijil Sakit Klinik Kesihatan No. MC-9812', required: false }
    ]
  },

  // 6. Pelajar: Rayuan Peperiksaan / Pengajian
  {
    id: 'rayuan_peperiksaan',
    category: 'pelajar',
    name: 'Surat Rayuan Semakan Gred / Keputusan',
    description: 'Mengemukakan rayuan rasmi semakan semula keputusan peperiksaan atau rayuan menyambung pengajian.',
    defaultSubject: 'SURAT RAYUAN SEMAKAN SEMULA KEPUTUSAN PEPERIKSAAN SEMESTER [NO]',
    defaultSalutation: 'Dekan / Ketua Jabatan Akademik,',
    suggestedClosing: 'Besar harapan saya agar pihak jawatankuasa rayuan dapat mempertimbangkan permohonan ini dengan penuh ihsan.',
    guidance: 'Kekalkan nada penuh tertib. Nyatakan halangan luar jangka yang menjejaskan prestasi anda.',
    fields: [
      { key: 'noMatrikFakulti', label: 'No. Matrik & Fakulti', placeholder: 'Cth: D2024109 - Fakulti Sains & Matematik', required: true },
      { key: 'kodSubjekGred', label: 'Kursus / Subjek & Gred Semasa', placeholder: 'Cth: MAT201 - Matematik Diskret (Gred C-)', required: true },
      { key: 'justifikasiRayuan', label: 'Alasan & Bukti Usaha', placeholder: 'Cth: Saya yakin jawapan bagi soalan tugasan akhir telah menepati rubrik, selain mengalami masalah kesihatan semasa hari ujian...', type: 'textarea', required: true }
    ]
  },

  // 7. Aduan & Rayuan: Aduan PBT
  {
    id: 'aduan_pbt',
    category: 'aduan_rayuan',
    name: 'Surat Aduan Awam PBT / Majlis Perbandaran',
    description: 'Aduan kerosakan jalan, lampu isyarat, parit tersumbat, longgokan sampah, atau gangguan anjing liar.',
    defaultSubject: 'ADUAN KEROSAKAN JALAN RAYA DAN RISIKO KESELAMATAN PENDUDUK DI [LOKASI]',
    defaultSalutation: 'Yang Dipertua / Pegawai Bahagian Aduan Awam,',
    suggestedClosing: 'Tindakan segera dan keprihatinan pihak Majlis amat dihargai demi keselamatan orang ramai.',
    guidance: 'Berikan lokasi yang sangat spesifik (nama jalan, mercu tanda, no tiang lampu jika ada).',
    fields: [
      { key: 'lokasiTepat', label: 'Lokasi Kejadian / Aduan Lengkap', placeholder: 'Cth: Hadapan Rumah No. 45, Jalan Anggerik 2, Taman Melati', required: true },
      { key: 'jenisAduan', label: 'Masalah Utama', placeholder: 'Cth: Lubang jalan berdiameter 1 meter yang mendap selepas hujan lebat', required: true },
      { key: 'kesanMasalah', label: 'Kesan Buruk / Risiko kepada Awam', placeholder: 'Cth: Dua buah motosikal telah terbabas minggu ini dan membahayakan nyawa...', type: 'textarea', required: true },
      { key: 'tuntutanTindakan', label: 'Tindakan yang Diharapkan', placeholder: 'Cth: Memohon pihak PBT menurap semula jalan raya ini dengan kadar segera', required: true }
    ]
  },

  // 8. Aduan & Rayuan: Rayuan Saman / Kompaun
  {
    id: 'rayuan_saman',
    category: 'aduan_rayuan',
    name: 'Surat Rayuan Pengurangan Kompaun / Saman',
    description: 'Permohonan rayuan pengurangan kadar kompaun saman PBT, Polis Diraja Malaysia, atau JPJ.',
    defaultSubject: 'RAYUAN PENGURANGAN KADAR KOMPAUN SAMAN NO. [NO SAMAN]',
    defaultSalutation: 'Tuan,',
    suggestedClosing: 'Jasa baik dan pertimbangan kemanusiaan pihak Tuan amatlah saya harapkan dan didahului ribuan terima kasih.',
    guidance: 'Akui kesilapan, terangkan kesempitan kewangan secara sopan, dan mohon diskaun maksimum.',
    fields: [
      { key: 'noNotisSaman', label: 'No. Notis Saman / Kompaun', placeholder: 'Cth: PBT/KM/2026/89412', required: true },
      { key: 'noKenderaan', label: 'No. Pendaftaran Kenderaan (Plat)', placeholder: 'Cth: WXY 1234', required: true },
      { key: 'kesalahanDinyatakan', label: 'Kesalahan Mengikut Notis', placeholder: 'Cth: Meletak kenderaan di luar petak sah pada 3 November 2026', required: true },
      { key: 'alasanRayuan', label: 'Alasan & Sebab Rayuan Pengurangan', placeholder: 'Cth: Saya terpaksa berhenti seketika membantu ibu uzur mengambil ubat. Sebagai pelajar/pekerja berpendapatan rendah, jumlah RM150 membebankan...', type: 'textarea', required: true }
    ]
  },

  // 9. Perniagaan: Tuntutan Bayaran Invois
  {
    id: 'tuntutan_bayaran',
    category: 'perniagaan',
    name: 'Surat Tuntutan Bayaran Invois Tertunggak',
    description: 'Surat peringatan mesra atau notis tuntutan rasmi bagi invois yang melepasi tempoh kredit.',
    defaultSubject: 'PERINGATAN MESRA / TUNTUTAN BAYARAN INVOIS TERTUNGGAK NO. [NO INVOIS]',
    defaultSalutation: 'Tuan / Puan,',
    suggestedClosing: 'Kami berharap bayaran penuh dapat diselesaikan dengan segera bagi mengelakkan sebarang tindakan lanjut.',
    guidance: 'Kekalkan profesionalisme, nyatakan nombor invois, tarikh matang, dan nombor akaun bank untuk pembayaran.',
    fields: [
      { key: 'noInvois', label: 'No. Invois & Tarikh', placeholder: 'Cth: INV-2026-088 bertarikh 15 September 2026', required: true },
      { key: 'jumlahTertunggak', label: 'Jumlah Tertunggak (RM)', placeholder: 'Cth: RM 4,500.00', required: true },
      { key: 'perkhidmatanDibekal', label: 'Butiran Servis / Barangan', placeholder: 'Cth: Pembekalan perkhidmatan percetakan modul seminar...', required: true },
      { key: 'tarikhMatangLalu', label: 'Tarikh Matang Bayaran Asal', placeholder: 'Cth: 15 Oktober 2026 (lewat 25 hari)', required: true },
      { key: 'maklumatAkaunBank', label: 'Maklumat Bank untuk Pembayaran', placeholder: 'Cth: Maybank Syarikat: 5123 4567 8901 (Maju Kreatif Sdn Bhd)', required: true }
    ]
  },

  // 10. Komuniti: Surat Jemputan Rasmi
  {
    id: 'jemputan_rasmi',
    category: 'perniagaan',
    name: 'Surat Jemputan Tetamu Kehormat / Penceramah',
    description: 'Surat jemputan rasmi kepada VIP, penceramah, atau perasmi untuk program komuniti/sekolah/persatuan.',
    defaultSubject: 'JEMPUTAN SEBAGAI PERASMI / TETAMU KEHORMAT KE PROGRAM [NAMA PROGRAM]',
    defaultSalutation: 'Dato\' / Datin / Tuan / Puan,',
    suggestedClosing: 'Kesudian pihak Dato\'/Tuan menerima undangan ini didahului dengan setinggi-tinggi penghargaan.',
    guidance: 'Sertakan objektif ringkas program, tarikh, tempat, anggaran tetamu, dan tarikh pengesahan kehadiran (RSVP).',
    fields: [
      { key: 'namaProgram', label: 'Nama Program / Majlis', placeholder: 'Cth: Program Jelajah Kerjaya & Celik AI Komuniti 2026', required: true },
      { key: 'tarikhMasaProgram', label: 'Tarikh & Masa Program', placeholder: 'Cth: 28 November 2026 (Sabtu), 9:00 pagi - 1:00 tengah hari', required: true },
      { key: 'tempatProgram', label: 'Tempat / Lokasi Program', placeholder: 'Cth: Dewan Serbaguna Komuniti Seksyen 7, Shah Alam', required: true },
      { key: 'perananDijemput', label: 'Peranan yang Diharapkan', placeholder: 'Cth: Merasmikan majlis penutup dan menyampaikan sijil kepada peserta', required: true },
      { key: 'tarikhRSVP', label: 'Tarikh Akhir Pengesahan (RSVP) & Pegawai Dihubungi', placeholder: 'Cth: 20 November 2026 kepada Puan Zulaikha di talian 012-3456789', required: true }
    ]
  }
];
