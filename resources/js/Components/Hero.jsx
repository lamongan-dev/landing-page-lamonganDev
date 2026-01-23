import React, { useEffect, useState } from 'react';

export default function Hero() {
  const ImageCarouselHero = [
    '/images/poto1.jpg',
    '/images/poto2.jpg',
    
  ]
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (ImageCarouselHero.length <= 1) return undefined
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ImageCarouselHero.length)
    }, 4000)

    return () => clearInterval(intervalId)
  }, [ImageCarouselHero.length])

  return (
    <div className="relative isolate px-6 pt-0 sm:pt-2 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 mt-4 sm:-mt-8">
        <div className="text-center">
            <div className="flex flex-col items-center gap-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 text-balance md:whitespace-nowrap">
        Komunitas IT Wong Lamongan,
        </h1>
        
        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-semibold tracking-tight whitespace-nowrap">
          <span style={{ color: '#2A96CD' }}>Lamongan</span>
          <span style={{ color: '#8CC63F' }}>Dev</span>
        </h1>
    </div>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            LamonganDev adalah komunitas yang berfokus pada pengembangan dan penerapan teknologi informasi di daerah Wong Lamongan, Jawa Timur.
          </p>
           <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                    href="https://t.me/lamongandev"
                    className=" w-full sm:w-auto text-center rounded-md bg-[#8CC63F]
                    px-3.5 sm:px-8
                    py-4 sm:py-4
                    text-sm sm:text-base
                    font-semibold text-white shadow-sm
                    hover:bg-[#7BB336] focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-[#8CC63F]"
                >
                    Join Telegram
                </a>
          </div>
          <div className="mt-8 w-full overflow-hidden rounded-2xl">
            <img
              src={ImageCarouselHero[currentSlide]}
              alt={`Hero slide ${currentSlide + 1}`}
              className="h-64 w-full object-cover sm:h-72 lg:h-80"
            />
          </div>
          <div className="mt-4 flex w-full justify-center gap-2">
            {ImageCarouselHero.map((_, index) => (
              <button
                key={`slide-${index}`}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition ${
                  index === currentSlide ? 'bg-[#2A96CD]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
