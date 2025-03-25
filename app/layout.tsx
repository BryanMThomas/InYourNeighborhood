import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "In Your Neighborhood",
  description: "Connect with service providers in your neighborhood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="border-b bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-primary">In Your Neighborhood</h1>
            <MainNav />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
