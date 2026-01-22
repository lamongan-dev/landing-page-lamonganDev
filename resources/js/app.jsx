import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Pages/Home';
import AboutUs from './Layouts/AboutUs';

const rootElement = document.getElementById('app');

console.log('App.jsx is running!');
console.log('Root element:', rootElement);

if (rootElement) {
    try {
        const path = window.location.pathname;
        const Page = path === '/about' ? AboutUs : Home;
        document.title = path === '/about' ? 'About Us ' : 'LamonganDev';
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
