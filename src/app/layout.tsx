import type { Metadata } from "next";
import { Archivo, Newsreader, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSync } from "@/components/ThemeSync";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Loader } from "@/components/Loader";
import "./globals.css";

// Archivo has a width axis: the same family runs condensed for the big
// headings and normal for interface text.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Serif for reading text (summaries, descriptions).
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed Guizani | Cybersecurity Engineering Student",
  description:
    "Portfolio of Mohamed Guizani, a cybersecurity engineering student: API penetration testing, SOC and SIEM/SOAR pipelines, network hardening, secure development and DevSecOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>{/* Ensure no whitespace/newline before body */}
      <head>
        {/* Set the explicit theme choice and the intro-seen flag before paint to avoid flashes */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;d.dataset.mode=localStorage.getItem('theme')||'system';if(sessionStorage.getItem('intro-seen')==='1')d.dataset.seen='1';}catch(e){}",
          }}
        />
      </head>
      <body className={`${archivo.variable} ${newsreader.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeSync />
          <SmoothScroll />
          <Loader />
          <ScrollProgress />
          <Header />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>{/* Ensure no whitespace/newline after body */}
    </html>
  );
}
