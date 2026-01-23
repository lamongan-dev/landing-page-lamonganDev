import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { events } from '../dummy/event'

export default function Event() {
    

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="relative flex-1 overflow-hidden pt-32 sm:pt-36">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                            Event LamonganDev
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                            List event komunitas LamonganDev yang akan datang.
                            Yuk, gabung dan tingkatkan skill IT-mu bersama kami!
                        </p>
                    </div>

                    <section className="mb-16 mt-14 grid gap-8 lg:grid-cols-2">
                        {events.map((event) => (
                            <article
                                key={event.title}
                                className="grid overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-lg shadow-emerald-100/60 md:grid-cols-[260px_1fr]"
                            >
                                <div className="relative h-60 md:h-full">
                                    <img
                                        alt={event.title}
                                        className="h-full w-full object-cover"
                                        src={event.image}
                                    />
                                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                        <span className="rounded-full border border-[#2A96CD] bg-white/95 px-3 py-1 text-xs font-semibold text-[#2A96CD]">
                                            {event.mode} Event
                                        </span>
                                        <span className="rounded-full border border-[#2A96CD] bg-white/95 px-3 py-1 text-xs font-semibold text-[#2A96CD]">
                                            {event.pricing}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 p-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900">
                                            {event.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-500">
                                            {event.date}
                                        </p>
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        {event.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                                            {event.location}
                                        </span>
                                    </div>
                                    <button
                                        className="mt-2 w-fit rounded-full  bg-[#2A96CD] px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                        type="button"
                                    >
                                        Detail Event
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
