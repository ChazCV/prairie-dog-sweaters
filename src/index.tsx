import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Handle GitHub Pages base path
const basePath = '/prairie-dog-sweaters';
document.getElementsByTagName('base')[0]?.setAttribute('href', basePath);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);