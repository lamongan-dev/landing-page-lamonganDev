import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function formatDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
}

export default function Show({ event }) {
    return (
        <AdminLayout title="Detail Event">
            <Head title={event.title} />
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Detail Event</h2>
                    <p className="text-sm text-slate-500">Informasi lengkap event.</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#2A96CD] hover:text-[#2A96CD]"
                    >
                        Edit
                    </Link>
                    <Link
                        href="/admin/events"
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#2A96CD] hover:text-[#2A96CD]"
                    >
                        Kembali
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <div className="space-y-6">
                    <div className="rounded-2xl border border-sky-100 bg-white p-6">
                        <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
                        <p className="mt-2 text-sm text-slate-500">Slug: {event.slug}</p>
                        <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                            <div>
                                <p className="text-xs uppercase text-slate-400">Tipe</p>
                                <p className="font-semibold capitalize text-slate-900">{event.type}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-slate-400">Harga</p>
                                <p className="font-semibold capitalize text-slate-900">{event.pricing_type}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-slate-400">Tanggal</p>
                                <p className="font-semibold text-slate-900">{formatDate(event.event_date)}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase text-slate-400">Lokasi</p>
                                <p className="font-semibold text-slate-900">{event.location || '-'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-sky-100 bg-white p-6">
                        <h4 className="text-lg font-semibold">Deskripsi</h4>
                        <div
                            className="prose mt-4 max-w-none text-sm text-slate-700"
                            dangerouslySetInnerHTML={{ __html: event.description || '<p>Tidak ada deskripsi.</p>' }}
                        />
                        <p className="mt-4 text-xs text-slate-400">
                            Deskripsi disanitasi di backend (script tag dihapus). Untuk sanitasi lengkap, gunakan
                            HTMLPurifier/mews/purifier.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
                        {event.cover_image_url ? (
                            <img src={event.cover_image_url} alt={event.title} className="h-64 w-full object-cover" />
                        ) : (
                            <div className="flex h-64 items-center justify-center text-sm text-slate-500">
                                Tidak ada cover
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
