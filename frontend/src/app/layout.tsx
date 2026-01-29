import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Common/Navbar";
import ToTop from "@/components/Common/ToTop";
import Footer from "@/components/Common/Footer";
import ConditionalFooter from "@/components/Common/ConditionalFooter";
import ConditionalHeader from "@/components/Common/ConditionalHeader";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import Providers from "@/components/tanstackProvider";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const isLoggedIn = !!token;
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo_icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} ${instrumentSans.variable} antialiased min-h-screen`}
      >
        <Providers>
          <div className="max-w-[1920px] mx-auto w-full flex flex-col min-h-screen">
            <ConditionalHeader isLoggedIn={isLoggedIn} />
            {children}
            <ConditionalFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
