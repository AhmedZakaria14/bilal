import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Head | موقع الرأس',
  description: 'موقع تفاعلي مخصص بالكامل لرأس هذا الشخص، مع تفاعل فيزيائي ومؤثرات وإكسسوارات ووضع الرأس الخالص.',
  openGraph: {
    title: 'The Head | موقع الرأس',
    description: 'موقع تفاعلي مخصص بالكامل لرأس هذا الشخص.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Head | موقع الرأس',
    description: 'موقع تفاعلي مخصص بالكامل لرأس هذا الشخص.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="bg-[#090a0f] text-slate-100 antialiased selection:bg-amber-500 selection:text-black overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
