import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/Navbar'
import ThemeProvider from "./utils/ThemeProvider";
import ThemeSwitcher from "@/components/DarkModeSwitch/ThemeSwitcher";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JOZO",
  description: "Come take a look ( ˘ ³˘)♥︎",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeSwitcher />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
