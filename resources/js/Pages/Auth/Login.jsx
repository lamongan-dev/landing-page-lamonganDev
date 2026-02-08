import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(900px_circle_at_top,_rgba(42,150,205,0.18),_transparent_55%),linear-gradient(180deg,_#ffffff_0%,_#f6fbff_45%,_#f3fbf5_100%)] font-[var(--font-space-grotesk)] text-slate-900">
            <Head title="Login" />
            <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
                <div className="w-full max-w-md rounded-3xl border border-sky-100 bg-white/85 p-8 shadow-xl backdrop-blur">
                    <div className="mb-6 text-center">
                        <img
                            src="/images/lamongan-dev.png"
                            alt="LamonganDev"
                            className="mx-auto h-14 w-auto object-contain"
                        />
                        <h1 className="mt-4 text-2xl font-semibold">Masuk Admin</h1>
                        <p className="mt-1 text-sm text-slate-500">Gunakan akun yang sudah terdaftar.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                            <input
                                type="email"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                            />
                            {errors?.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                            <input
                                type="password"
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#2A96CD] focus:outline-none focus:ring-2 focus:ring-[#2A96CD]/20"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                            />
                            {errors?.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 text-[#2A96CD] focus:ring-[#2A96CD]"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            Ingat saya
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-full bg-[#2A96CD] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2389bb] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Masuk...' : 'Masuk'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-600">
                        Belum punya akun?{' '}
                        <Link href="/register" className="font-semibold text-[#2A96CD] hover:underline">
                            Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
