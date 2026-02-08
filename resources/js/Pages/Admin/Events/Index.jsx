import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Index({ events, filters }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        type: filters.type || '',
        pricing_type: filters.pricing_type || '',
        sort: filters.sort || 'desc',
    });

    const submitFilter = (e) => {
        e.preventDefault();
        get('/admin/events', { preserveState: true, replace: true });
    };

    const resetFilter = () => {
        setData({ search: '', type: '', pricing_type: '', sort: 'desc' });
        get('/admin/events', { preserveState: true, replace: true });
    };

    const openDelete = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeDelete = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const confirmDelete = () => {
        if (!selectedEvent) return;
        router.delete(`/admin/events/${selectedEvent.id}`, {
            onFinish: closeDelete,
        });
    };

    return (
        <AdminLayout title="Events">
            <Head title="Event List" />
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Event</h2>
                    <p className="text-sm text-slate-500">Kelola semua event di sini.</p>
                </div>
                <Link
                    href="/admin/events/create"
                    className="inline-flex items-center justify-center rounded-full bg-[#8CC63F] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7BB336]"
                >
                    + Event Baru
                </Link>
            </div>

            <form
                onSubmit={submitFilter}
                className="mb-6 grid gap-3 rounded-2xl border border-sky-100 bg-white/80 p-4 backdrop-blur md:grid-cols-4"
            >
                <input
                    type="text"
                    placeholder="Cari judul event"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                />
                <select
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                >
                    <option value="">Semua Tipe</option>
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                </select>
                <select
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                    value={data.pricing_type}
                    onChange={(e) => setData('pricing_type', e.target.value)}
                >
                    <option value="">Semua Harga</option>
                    <option value="free">Gratis</option>
                    <option value="paid">Berbayar</option>
                </select>
                <select
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                    value={data.sort}
                    onChange={(e) => setData('sort', e.target.value)}
                >
                    <option value="desc">Tanggal Terbaru</option>
                    <option value="asc">Tanggal Terlama</option>
                </select>
                <div className="md:col-span-4 flex flex-wrap gap-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-full bg-[#2A96CD] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2389bb] disabled:opacity-60"
                    >
                        {processing ? 'Memuat...' : 'Terapkan'}
                    </button>
                    <button
                        type="button"
                        onClick={resetFilter}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#2A96CD] hover:text-[#2A96CD]"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#2A96CD]/10 text-xs uppercase text-[#2A96CD]">
                        <tr>
                            <th className="px-4 py-3">Event</th>
                            <th className="px-4 py-3">Tipe</th>
                            <th className="px-4 py-3">Harga</th>
                            <th className="px-4 py-3">Tanggal</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.data.length === 0 && (
                            <tr>
                                <td className="px-4 py-6 text-center text-slate-500" colSpan="5">
                                    Belum ada event.
                                </td>
                            </tr>
                        )}
                        {events.data.map((event) => (
                            <tr key={event.id} className="border-t border-slate-100 hover:bg-[#2A96CD]/5">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        {event.cover_image_url ? (
                                            <img
                                                src={event.cover_image_url}
                                                alt={event.title}
                                                className="h-12 w-12 rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-500">
                                                No Image
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-slate-900">{event.title}</p>
                                            {event.location && (
                                                <p className="text-xs text-slate-500">{event.location}</p>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 capitalize">{event.type}</td>
                                <td className="px-4 py-3 capitalize">{event.pricing_type}</td>
                                <td className="px-4 py-3">{event.event_date}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href={`/admin/events/${event.id}`}
                                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-[#2A96CD] hover:text-[#2A96CD]"
                                        >
                                            Detail
                                        </Link>
                                        <Link
                                            href={`/admin/events/${event.id}/edit`}
                                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-[#2A96CD] hover:text-[#2A96CD]"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => openDelete(event)}
                                            className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {events.links.length > 1 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {events.links.map((link) => (
                        <button
                            key={link.label}
                            type="button"
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url)}
                            className={`rounded-lg px-3 py-2 text-sm ${
                                link.active
                                    ? 'bg-[#2A96CD] text-white'
                                    : 'border border-slate-200 text-slate-700'
                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="text-lg font-semibold">Hapus Event</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Yakin ingin menghapus event
                            <span className="font-semibold"> {selectedEvent?.title}</span>? Tindakan ini tidak bisa
                            dibatalkan.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeDelete}
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
