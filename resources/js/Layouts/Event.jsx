import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function Event() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let isMounted = true
        fetch('/api/events')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Gagal memuat event.')
                }
                return res.json()
            })
            .then((payload) => {
                if (!isMounted) return
                setEvents(Array.isArray(payload?.data) ? payload.data : [])
            })
            .catch((err) => {
                if (!isMounted) return
                setError(err.message || 'Gagal memuat event.')
            })
            .finally(() => {
                if (!isMounted) return
                setLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [])

    const formattedEvents = useMemo(() => {
        return events.map((event) => {
            let dateLabel = '-'
            if (event.event_date) {
                const parsed = new Date(event.event_date)
                if (!Number.isNaN(parsed.getTime())) {
                    dateLabel = new Intl.DateTimeFormat('id-ID', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                    }).format(parsed)
                }
            }

            return {
                ...event,
                dateLabel,
                modeLabel: event.type === 'online' ? 'Online' : 'Offline',
                pricingLabel: event.pricing_type === 'paid' ? 'Berbayar' : 'Gratis',
                image: event.cover_image_url || '/images/poto1.jpg',
                description: event.description || 'Belum ada deskripsi.',
                location: event.location || 'Lamongan',
            }
        })
    }, [events])

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
                        {loading && (
                            <div className="col-span-full text-center text-sm text-slate-500">
                                Memuat event...
                            </div>
                        )}
                        {error && !loading && (
                            <div className="col-span-full text-center text-sm text-rose-600">
                                {error}
                            </div>
                        )}
                        {!loading && !error && formattedEvents.length === 0 && (
                            <div className="col-span-full text-center text-sm text-slate-500">
                                Belum ada event yang tersedia.
                            </div>
                        )}
                        {formattedEvents.map((event) => (
                            <article
                                key={event.id || event.title}
                                className="grid overflow-hidden rounded-2xl border border-white bg-white shadow-lg shadow-emerald-100/60 md:grid-cols-[260px_1fr]"
                            >
                                <div className="relative h-60 md:h-full">
                                    <img
                                        alt={event.title}
                                        className="h-full w-full object-cover"
                                        src={event.image}
                                    />
                                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                        <span className="rounded-full border border-[#2A96CD] bg-white/95 px-3 py-1 text-xs font-semibold text-[#2A96CD]">
                                            {event.modeLabel} Event
                                        </span>
                                        <span className="rounded-full border border-[#2A96CD] bg-white/95 px-3 py-1 text-xs font-semibold text-[#2A96CD]">
                                            {event.pricingLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 p-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900">
                                            {event.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-500">
                                            {event.dateLabel}
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
                                    {event.registration_url ? (
                                        <a
                                            className="mt-2 w-fit rounded-full bg-[#2A96CD] px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                            href={event.registration_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Detail event ${event.title}`}
                                        >
                                            Detail Event
                                        </a>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled
                                            aria-label={`Detail event ${event.title} belum tersedia`}
                                            className="mt-2 w-fit rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-400"
                                        >
                                            Detail Event
                                        </button>
                                    )}
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
