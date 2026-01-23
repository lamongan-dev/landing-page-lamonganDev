import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { imageGallery, pengurus, tentangKami } from '../dummy/about_us'

export default function AboutUs() {
 
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="relative flex-1 overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#8CC63F]/20 blur-3xl" />
          <div className="absolute top-24 -right-20 h-56 w-56 rounded-full bg-[#2A96CD]/20 blur-3xl" />
          <div className="absolute bottom-0 -left-15 h-48 w-48 rounded-full bg-[#2A96CD]/10 blur-3xl" />
        </div>
              <section className='py-16 px-8 bg-white'>
    
        <div className='max-w-6xl mx-auto flex flex-col items-center text-center'>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Tentang Kami</h2>
            
            <p className="text-gray-600 max-w-2xl mb-20 leading-relaxed">
               Lamongan Dev adalah rumah kolaborasi bagi pegiat teknologi Lamongan untuk bertumbuh, berjejaring, dan menciptakan solusi digital yang berdampak nyata bagi kemajuan daerah.
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
             <section className="mt-20 w-full">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2A96CD]">
                    Visi
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-gray-900">
                    Ekosistem IT yang tumbuh, kolaboratif, dan berdampak
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Menjadi ekosistem IT yang tumbuh dan berkolaborasi untuk
                    mewujudkan transformasi digital berdampak nyata di Kabupaten
                    Lamongan.
                  </p>
                 
                </div>
                <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2A96CD]">
                    Misi
                  </p>
                  <ol className="mt-4 space-y-3 text-gray-700">
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2A96CD] text-xs font-semibold text-white">
                        1
                      </span>
                      <span>
                        Meningkatkan Kapasitas &amp; Kompetensi Anggota
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2A96CD] text-xs font-semibold text-white">
                        2
                      </span>
                      <span>Memfasilitasi Kolaborasi &amp; Jejaring</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2A96CD] text-xs font-semibold text-white">
                        3
                      </span>
                      <span>
                        Mengembangkan Solusi Teknologi yang Relevan &amp;
                        Berdampak
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2A96CD] text-xs font-semibold text-white">
                        4
                      </span>
                      <span>
                        Mendorong Adopsi &amp; Transformasi Digital
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2A96CD] text-xs font-semibold text-white">
                        5
                      </span>
                      <span>Membangun Jejak &amp; Reputasi Ekosistem</span>
                    </li>
                  </ol>
                </div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2A96CD]">
                    Personality
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    Tech-Savvy
                  </p>
                  <p className="mt-3 text-gray-600">
                    Adaptif, eksploratif, dan selalu mengikuti perkembangan
                    teknologi untuk menciptakan dampak nyata.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2A96CD]">
                    Target Audiens
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    Tech Enthusiast
                  </p>
                  <p className="mt-3 text-gray-600">
                    Komunitas bagi mereka yang antusias belajar, membangun, dan
                    berkolaborasi di dunia teknologi.
                  </p>
                </div>
              </div>
            </section>
            <h2 className="text-4xl font-bold text-gray-900 mt-24 mb-6 text-center">Pengurus LamonganDev</h2>
            <div className="mt-10 w-full space-y-12">
              {pengurus.map((section) => (
                <div key={section.title} className="flex w-full flex-col items-center">
                  <h3 className="mb-6 text-center text-2xl font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <div className="grid w-full max-w-5xl grid-cols-2 justify-center justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,260px)]">
                    {section.members.map((member) => (
                      <div
                        key={member.name}
                        className="flex w-full max-w-65 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white pb-5 text-center shadow-sm"
                      >
                        <div className="h-36 w-full bg-gray-100">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h4 className="mt-4 text-lg font-semibold text-[#2A9D54]">
                          {member.name}
                        </h4>
                        
                        <p className="text-sm text-gray-500">
                          {member.role}
                        </p>
                        <p className="mt-1 text-sm font-medium text-[#2A96CD]">
                          {member.position}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
        </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
