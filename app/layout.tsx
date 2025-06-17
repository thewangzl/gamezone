// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { getCategories } from '@/lib/data';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';


export const metadata: Metadata = {
  title: {
    template: '%s | Relex Game Zone',
    default: 'Relex Game Zone - Play Free Online Games',
  },
  description: 'Play the best free online games at Relex Game Zone. We offer a wide selection of games including action, adventure, puzzle, and more. No download required, play instantly in your browser!',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4B6QZH6XJP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4B6QZH6XJP');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header categories={categories} />
        <main className="flex-grow pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="hidden lg:block w-64 flex-shrink-0">
                <Sidebar categories={categories} />
              </div>
              <div className="flex-1 min-w-0">
                {children}
                <Analytics />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}