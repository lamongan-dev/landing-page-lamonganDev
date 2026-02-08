import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ title, children }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_top,_rgba(42,150,205,0.10),_transparent_55%),linear-gradient(180deg,_#ffffff_0%,_#f6fbff_45%,_#f3fbf5_100%)] text-slate-900 font-[var(--font-space-grotesk)]">
            <Head title={title ? `${title} - Admin` : 'Admin'} />
            <header className="border-b border-sky-100 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <img
                            src="/images/lamongan-dev.png"
                            alt="LamonganDev"
                            className="h-10 w-auto object-contain"
                        />
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                                Admin Panel
                            </p>
                            <h1 className="text-lg font-semibold text-slate-900">LamonganDev Events</h1>
                        </div>
                    </div>
                    <nav className="flex items-center gap-3 text-sm">
                        <Link
                            className="rounded-full border border-[#2A96CD]/30 bg-white px-4 py-2 font-semibold text-[#2A96CD] transition hover:bg-[#2A96CD] hover:text-white"
                            href="/admin/events"
                        >
                            Events
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
                <aside className="h-fit rounded-3xl border border-sky-100 bg-white/90 p-5 shadow-sm backdrop-blur">
                    <div className="mb-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Menu</p>
                        <p className="text-base font-semibold text-slate-800">Admin Panel</p>
                    </div>
                    <nav className="space-y-2 text-sm">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 font-semibold text-slate-700 transition hover:border-[#2A96CD]/30 hover:bg-[#2A96CD]/10 hover:text-[#2A96CD]"
                        >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#2A96CD]/10 text-[#2A96CD]">
                                DB
                            </span>
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/events"
                            className="flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 font-semibold text-slate-700 transition hover:border-[#2A96CD]/30 hover:bg-[#2A96CD]/10 hover:text-[#2A96CD]"
                        >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#2A96CD]/10 text-[#2A96CD]">
                                EV
                            </span>
                            Events
                        </Link>
                        <Link
                            href="/admin/blogs"
                            className="flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 font-semibold text-slate-700 transition hover:border-[#2A96CD]/30 hover:bg-[#2A96CD]/10 hover:text-[#2A96CD]"
                        >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#2A96CD]/10 text-[#2A96CD]">
                                BL
                            </span>
                            Blog
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 font-semibold text-slate-700 transition hover:border-[#8CC63F]/30 hover:bg-[#8CC63F]/10 hover:text-[#7BB336]"
                        >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#8CC63F]/15 text-[#7BB336]">
                                FE
                            </span>
                            Lihat Landing
                        </Link>
                    </nav>
                </aside>

                <main>
                    {flash?.success && (
                        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {flash.error}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
