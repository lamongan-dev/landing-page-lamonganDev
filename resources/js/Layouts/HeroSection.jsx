import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Footer from '../Components/Footer';

export default function HeroSection() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <section className="bg-white text-gray-700">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-6 py-2 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide">
            Website Supported By
          </span>
          <img
            src="/images/pabrik_online.png"
            alt="Pabrik Online"
            className="h-12 w-auto sm:h-14 lg:h-16"
          />
        </div>
      </section>
      <Footer />
    </div>
  )
}
