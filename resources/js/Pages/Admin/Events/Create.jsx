import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import EventForm from '../../../Components/Admin/EventForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        type: 'offline',
        title: '',
        pricing_type: 'free',
        event_date: '',
        cover_image: null,
        location: '',
        description: '',
        registration_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/events', { forceFormData: true });
    };

    return (
        <AdminLayout title="Buat Event">
            <Head title="Buat Event" />
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Buat Event</h2>
                    <p className="text-sm text-slate-500">Isi detail event baru.</p>
                </div>
                <Link
                    href="/admin/events"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#2A96CD] hover:text-[#2A96CD]"
                >
                    Kembali
                </Link>
            </div>

            <EventForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submit}
                submitLabel="Simpan Event"
            />
        </AdminLayout>
    );
}
