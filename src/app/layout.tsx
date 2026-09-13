import type { Metadata } from "next";
import { Raleway, Arimo } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midhilesh Raj — Mobile Application Developer",
  description:
    "Portfolio of Midhilesh Raj, a Mobile Application Developer and Flutter Developer with 4.5+ years of experience shipping Android and iOS apps, located in Kerala, India.",
  keywords:
    "flutter, mobile app developer, android, ios, dart, python, firebase, kerala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${arimo.variable}`}>
      <body className="min-h-full bg-black text-white font-[family-name:var(--font-raleway)] antialiased">
        {children}
      </body>
    </html>
  );
}
