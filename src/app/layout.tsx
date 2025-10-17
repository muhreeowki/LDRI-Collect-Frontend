import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Toaster } from "sonner";
import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth antialiased ${font.className}`}
      suppressHydrationWarning
    >
      <head></head>
      <body className="selection:bg-zinc-800 selection:text-zinc-100 relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <RootProvider>{children}</RootProvider>
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
