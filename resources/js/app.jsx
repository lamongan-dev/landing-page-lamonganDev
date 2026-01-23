import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Pages/Home';
import AboutUs from './Layouts/AboutUs';
import Event from './Layouts/Event';

const rootElement = document.getElementById('app');

console.log('App.jsx is running!');
console.log('Root element:', rootElement);

if (rootElement) {
    try {
        const path = window.location.pathname;
        const routes = {
            '/about': { component: AboutUs, title: 'About Us' },
            '/event': { component: Event, title: 'Event' },
        };
        const route = routes[path] || { component: Home, title: 'LamonganDev' };
        const Page = route.component;
        document.title = route.title;
        const root = createRoot(rootElement);
        root.render(
            <React.StrictMode>
                <Page />
            </React.StrictMode>
        );
        console.log('React rendered successfully');
    } catch (e) {
        console.error('React render error:', e);
    }
} else {
    console.error('Root element #app not found!');
}
