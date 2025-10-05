import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Common/Navbar";
<<<<<<< HEAD
=======
import ToTop from "./components/Common/ToTop";
import Footer from "./components/Common/Footer";
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a

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
<<<<<<< HEAD
=======
        <ToTop />
        <Footer />
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
      </body>
    </html>
  );
}
