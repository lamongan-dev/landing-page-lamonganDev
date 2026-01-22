import React from 'react'
import { AcademicCapIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function AboutUs() {
    const imageGallery = [ 
      { id: 1, src: '/images/poto1.jpg', alt: 'Kegiatan 1' },
    { id: 2, src: '/images/poto2.jpg', alt: 'Kegiatan 2' },
  ]
  const tentangKami = [
    {
      title: 'Memperluas Koneksi',
      description:
        'Kami berkomitmen untuk memperluas koneksi antara para pengembang dan komunitas di Lamongan.',
      Icon: UserGroupIcon,
    },
    {
      title: 'Berbagi Ilmu',
      description:
        'Menjadi wadah yang tepat untuk bisa saling berbagi ilmu, pengalaman maupun wawasan tentang update teknologi.',
      Icon: SparklesIcon,
      },
     {
      title: 'Wadah Belajar',
      description:
        'Menjadi wadah belajar pegiat IT untuk bisa terus update mengenai tech industry saat ini..',
      Icon: AcademicCapIcon,
    },
  ]
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="relative flex-1 overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#8CC63F]/20 blur-3xl" />
          <div className="absolute top-24 right-[-80px] h-56 w-56 rounded-full bg-[#2A96CD]/20 blur-3xl" />
          <div className="absolute bottom-0 left-[-60px] h-48 w-48 rounded-full bg-[#2A96CD]/10 blur-3xl" />
        </div>
              <section className='py-16 px-8 bg-white'>
    
        <div className='max-w-6xl mx-auto flex flex-col items-center text-center'>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Tentang Kami</h2>
            
            <p className="text-gray-600 max-w-2xl mb-20 leading-relaxed">
                LamonganDev merupakan komunitas teknologi yang dibentuk sejak tahun 2019 
                dan merupakan wadah untuk belajar dan kolaborasi di Kota Lamongan
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
              {tentangKami.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <item.Icon className="mb-4 h-9 w-9 text-[#2A96CD]" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-500">{item.description}</p>
                      
                </div>
              ))}
                          
            {imageGallery.map((image) => (
            <div 
              key={image.id} 
              className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            ))}           
                      </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 mt-24 mb-6 text-center">Pengurus LamonganDev</h2>
            
        </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
