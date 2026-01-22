import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Event', href: '' },
  { name: 'Blog', href: '#' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className={`flex items-center justify-between border-b p-6 transition lg:px-8 ${
          isScrolled
            ? 'border-gray-200 bg-white/70 shadow-lg backdrop-blur'
            : 'border-transparent bg-white shadow-none'
        }`}
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="LamonganDev"
              src="/images/lamongan-dev.png"
              className="h-20 w-auto object-contain sm:h-14 lg:h-16"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm/6 font-semibold text-gray-900 transition hover:bg-[#2A96CD] hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md border border-[#2A96CD] px-4 py-2.5 text-base font-semibold text-[#2A96CD] transition hover:bg-[#2A96CD] hover:text-white"
          >
            Hubungi Kami
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="LamonganDev"
                src="/images/lamongan-dev.png"
                className="h-20 w-auto object-contain sm:h-14 lg:h-16"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-[#2A96CD] hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="inline-flex w-full items-center justify-center rounded-md border border-[#2A96CD] px-4 py-2.5 text-base font-semibold text-[#2A96CD] transition hover:bg-[#2A96CD] hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
