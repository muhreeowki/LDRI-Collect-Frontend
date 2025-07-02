import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Poppins } from 'next/font/google';
import type { ReactNode } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Header } from '@/components/homepage/header';
import { Toaster } from 'sonner';

const font = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth antialiased ${font.className}`}
      style={{ colorScheme: 'dark' }}
    >
      <head></head>
      <body className="selection:bg-zinc-800 selection:text-zinc-100 relative">
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
