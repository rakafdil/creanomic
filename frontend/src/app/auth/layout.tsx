import { Inter, Instrument_Sans } from "next/font/google";

const inter = Inter({
    variable: "--font-geist-inter",
    subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
    variable: "--font-geist-inst-sans",
    subsets: ["latin"],
});

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${instrumentSans.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}