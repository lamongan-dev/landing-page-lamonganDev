import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import Home from './Pages/Home';
import AboutUs from './Layouts/AboutUs';
import Event from './Layouts/Event';
import EventDetail from './Layouts/EventDetail';

const rootElement = document.getElementById('app');

if (rootElement?.dataset?.page) {
    createInertiaApp({
        resolve: (name) => {
            const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
            return pages[`./Pages/${name}.jsx`];
        },
        setup({ el, App, props }) {
            createRoot(el).render(
                <React.StrictMode>
                    <App {...props} />
                </React.StrictMode>
            );
        },
        progress: { color: '#0f172a' },
    });
} else if (rootElement) {
    const path = window.location.pathname;
    const eventDetailMatch = path.match(/^\/event\/([^/]+)$/);
    const routes = {
        '/about': { component: AboutUs, title: 'About Us' },
        '/event': { component: Event, title: 'Event' },
    };
    if (eventDetailMatch) {
        const slug = eventDetailMatch[1];
        const Page = () => <EventDetail slug={slug} />;
        document.title = 'Event Detail';
        createRoot(rootElement).render(
            <React.StrictMode>
                <Page />
            </React.StrictMode>
        );
    } else {
        const route = routes[path] || { component: Home, title: 'LamonganDev' };
        const Page = route.component;
        document.title = route.title;
        createRoot(rootElement).render(
            <React.StrictMode>
                <Page />
            </React.StrictMode>
        );
    }
}
