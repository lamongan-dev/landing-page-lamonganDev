import React from 'react';

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
            <div className="flex flex-col items-center gap-y-2">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl text-balance md:whitespace-nowrap">
        Komunitas IT Wong Lamongan,
        </h1>
        
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight sm:text-6xl whitespace-nowrap">
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
                    hover:bg-[#7BB336]
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-[#8CC63F]"
                >
                    Join Telegram
                </a>
                </div>

        </div>
      </div>
    </div>
  )
}
