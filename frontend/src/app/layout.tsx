import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Common/Navbar";

const inter = Inter({
  variable: "--font-geist-inter",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-geist-inst-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrowthWell",
  description: "Marketplace for farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSans.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
