import './styles/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';

const container = document.getElementById('root');
if (!container) throw new Error('未找到 #root');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
