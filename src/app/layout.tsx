import type { Metadata } from 'next';
// @ts-expect-error CSS imports are handled by the Next.js bundler
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://penadigital.vercel.app'),
  title: 'PenaDigital AI | Penjana Surat Rasmi Format Malaysia',
  description: 'PenaDigital AI - Jana surat rasmi JPA, permohonan cuti, notis peletakan jawatan, rayuan saman dan aduan awam dalam Bahasa Melayu standard dalam masa kurang 30 saat.',
  verification: {
    google: 'UY-yrup0LOwQUeBzTR1qu4OAclY95QTdDLvBCYu0H_A',
  },
  openGraph: {
    title: 'PenaDigital AI | Penjana Surat Rasmi Format Malaysia',
    description: 'Jana surat rasmi JPA, rayuan saman, surat cuti, dan aduan awam dalam format standard Malaysia dalam 30 saat.',
    url: 'https://penadigital.vercel.app',
    siteName: 'PenaDigital AI',
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PenaDigital AI | Penjana Surat Rasmi Format Malaysia',
    description: 'Jana surat rasmi JPA, permohonan cuti, notis peletakan jawatan dan rayuan saman dalam masa 30 saat.',
  },
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
