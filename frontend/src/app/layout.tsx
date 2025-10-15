import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Common/Navbar";
import ToTop from "./components/Common/ToTop";
import Footer from "./components/Common/Footer";
import ConditionalFooter from "./components/Common/ConditionalFooter";
import ConditionalHeader from "./components/Common/ConditionalHeader";

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
        className={`${inter.variable} ${instrumentSans.variable} antialiased min-h-screen`}
      >
        <div className="max-w-[1920px] mx-auto w-full flex flex-col min-h-screen">
          <ConditionalHeader />
          {children}
          <ConditionalFooter />
        </div>
      </body>
    </html>
  );
}
