import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PenaDigital AI | Penjana Surat Rasmi Format Malaysia',
  description: 'PenaDigital AI - Jana surat rasmi JPA, permohonan cuti, notis peletakan jawatan, rayuan saman dan aduan awam dalam Bahasa Melayu standard dalam masa kurang 30 saat.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
