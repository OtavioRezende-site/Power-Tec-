import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

(window as Window & { __POWERTEC_MOUNTED__?: boolean }).__POWERTEC_MOUNTED__ = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
