'use client'
import { Poppins } from 'next/font/google'

import { Header } from "@/components/Headers/Headers";
import { Banner } from "@/components/Banner/Banner";
import { HomePageBody } from '@/components/HomePage/HomePageBody';

// If loading a variable font, you don't need to specify the font weight
const inter = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export default function Home() {
  return (
    <main className={inter.className}>
      <div className="wrapper py-10 px-24">
        <Header />
        <Banner />
        <HomePageBody />
      </div>
    </main>
  );
}
