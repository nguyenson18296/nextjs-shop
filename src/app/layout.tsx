import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/Footer/Footer";
import StoreProvider from './StoreProvider';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}
