import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Provide the global polyfill
(window as any).global = window;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
