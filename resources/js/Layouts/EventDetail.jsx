import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function EventDetail({ slug }) {
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let isMounted = true
        fetch(`/api/events/${slug}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Event tidak ditemukan.')
                }
                return res.json()
            })
            .then((payload) => {
                if (!isMounted) return
                setEvent(payload?.data || null)
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
    }, [slug])

    const view = useMemo(() => {
        if (!event) return null

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
            location: event.location || 'Lamongan',
            description: event.description || 'Belum ada deskripsi.',
        }
    }, [event])

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="relative flex-1 overflow-hidden pt-32 sm:pt-36">
                <div className="mx-auto max-w-5xl px-6">
                    {loading && (
                        <div className="py-20 text-center text-sm text-slate-500">
                            Memuat event...
                        </div>
                    )}
                    {error && !loading && (
                        <div className="py-20 text-center text-sm text-rose-600">
                            {error}
                        </div>
                    )}
                    {!loading && !error && view && (
                        <div className="space-y-8 pb-16">
                            <div className="rounded-3xl border border-white bg-white shadow-xl shadow-emerald-100/60">
                                <div className="overflow-hidden rounded-3xl">
                                    <img
                                        src={view.image}
                                        alt={view.title}
                                        className="h-72 w-full object-cover sm:h-96"
                                    />
                                </div>
                                <div className="p-6 sm:p-8">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-full border border-[#2A96CD] bg-white/95 px-3 py-1 text-xs font-semibold text-[#2A96CD]">
                                            {view.modeLabel} Event
                                        </span>
                                        <span className="rounded-full border border-[#2A96CD] bg-white/95 px-3 py-1 text-xs font-semibold text-[#2A96CD]">
                                            {view.pricingLabel}
                                        </span>
                                    </div>
                                    <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                                        {view.title}
                                    </h1>
                                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                                        <span>{view.dateLabel}</span>
                                        <span>•</span>
                                        <span>{view.location}</span>
                                    </div>
                                    <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                                        {view.description}
                                    </p>
                                </div>
                            </div>

                            <a
                                href="/event"
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#2A96CD] hover:text-[#2A96CD]"
                            >
                                Kembali ke daftar event
                            </a>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
