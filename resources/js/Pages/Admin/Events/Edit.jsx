import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import EventForm from '../../../Components/Admin/EventForm';

export default function Edit({ event }) {
    const formatDateTimeLocal = (value) => {
        if (!value) return '';
        return value.slice(0, 16);
    };

    const { data, setData, post, put, processing, errors, reset } = useForm({
        type: event.type || 'offline',
        title: event.title || '',
        pricing_type: event.pricing_type || 'free',
        event_date: formatDateTimeLocal(event.event_date),
        cover_image: null,
        location: event.location || '',
        description: event.description || '',
        registration_url: event.registration_url || '',
    });

    const submit = (e) => {
        e.preventDefault();
        const hasFile = data.cover_image instanceof File;

        if (hasFile) {
            post(`/admin/events/${event.id}`, {
                forceFormData: true,
                preserveScroll: true,
                transform: (formData) => {
                    const payload = { ...formData, _method: 'put' };
                    return payload;
                },
                onSuccess: () => {
                    reset('cover_image');
                },
            });
            return;
        }

        put(`/admin/events/${event.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('cover_image');
            },
        });
    };

    return (
        <AdminLayout title="Edit Event">
            <Head title="Edit Event" />
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Edit Event</h2>
                    <p className="text-sm text-slate-500">Perbarui detail event.</p>
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
                submitLabel="Simpan Perubahan"
                existingCoverUrl={event.cover_image_url}
            />
        </AdminLayout>
    );
}
