import React from 'react';

export default function EventForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
    existingCoverUrl,
}) {
    const isOffline = data.type === 'offline';
    const handleSubmit = (e) => {
        if (e?.preventDefault) e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-sky-100 bg-white/80 p-6 backdrop-blur">
            {errors?.general && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {errors.general}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Tipe Event</label>
                    <select
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                    >
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                    </select>
                    {errors?.type && <p className="mt-1 text-xs text-rose-600">{errors.type}</p>}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Tipe Harga</label>
                    <select
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                        value={data.pricing_type}
                        onChange={(e) => setData('pricing_type', e.target.value)}
                    >
                        <option value="free">Gratis</option>
                        <option value="paid">Berbayar</option>
                    </select>
                    {errors?.pricing_type && (
                        <p className="mt-1 text-xs text-rose-600">{errors.pricing_type}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Judul Event</label>
                <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                {errors?.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Tanggal & Waktu</label>
                <input
                    type="datetime-local"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                    value={data.event_date}
                    onChange={(e) => setData('event_date', e.target.value)}
                />
                {errors?.event_date && <p className="mt-1 text-xs text-rose-600">{errors.event_date}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Lokasi {isOffline && <span className="text-rose-600">*</span>}
                </label>
                <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                />
                {errors?.location && <p className="mt-1 text-xs text-rose-600">{errors.location}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Cover Image</label>
                {existingCoverUrl && (
                    <div className="mb-3 overflow-hidden rounded-2xl border border-sky-100 bg-white">
                        <img src={existingCoverUrl} alt="Cover" className="h-48 w-full object-cover" />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#2A96CD]/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#2A96CD] hover:file:bg-[#2A96CD]/20"
                    onChange={(e) => setData('cover_image', e.target.files[0])}
                />
                {errors?.cover_image && <p className="mt-1 text-xs text-rose-600">{errors.cover_image}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Deskripsi</label>
                <textarea
                    className="min-h-[180px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                    value={data.description || ''}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Tulis deskripsi event..."
                />
                {errors?.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
            </div>

            <div className="flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={processing}
                    className="rounded-full bg-[#8CC63F] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7BB336] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Menyimpan...' : submitLabel}
                </button>
            </div>
        </form>
    );
}
