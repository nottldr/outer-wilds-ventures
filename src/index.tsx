import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StrictMode>
);
