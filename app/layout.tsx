import type { Metadata } from 'next';
import { Poppins, Open_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PredictLearn - Master Prediction Markets',
  description: 'Master prediction markets with real Polymarket data and AI-powered insights. Learn to predict with confidence.',
  keywords: ['prediction markets', 'polymarket', 'trading education', 'market analysis', 'predictlearn'],
  authors: [{ name: 'PredictLearn' }],
  openGraph: {
    title: 'PredictLearn - Master Prediction Markets',
    description: 'Master prediction markets with real Polymarket data and AI-powered insights',
    url: 'https://github.com/jirassssa/PredictLearn',
    siteName: 'PredictLearn',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body className="antialiased min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:to-indigo-950 font-body">
        <Providers>
          <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
