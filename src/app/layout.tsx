import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { AppProviders } from "@/providers/app-providers";

export const metadata: Metadata = {
  title: "Battles Of Biology • এইচএসসি সিলেবাস প্রগ্রেস ম্যাপ",
  description: "Battles Of Biology — এইচএসসি জীববিজ্ঞান ও বিজ্ঞান সিলেবাসের কতটুকু সম্পন্ন হয়েছে হেক্সাগন ম্যাপে দেখুন ও প্রগ্রেস কার্ড ডাউনলোড করুন।",
  icons: {
    icon: "/bob-logo.svg",
    shortcut: "/bob-logo.svg",
    apple: "/bob-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#faf8f4] text-[#17201c] selection:bg-[#0f6b4f] selection:text-white">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
