import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/locale/ru_RU';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getPublicKey, subscribePush } from './api/push';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Easyappz: setup dayjs locale
dayjs.locale('ru');

const rootEl = document.getElementById('root');
if (rootEl) {
  rootEl.setAttribute('data-easytag', 'id1-react/src/index.js');
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ru_RU} theme={{ token: { colorPrimary: '#1677ff', fontSize: 14 } }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div data-easytag="id2-react/src/index.js">
            <AuthProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </AuthProvider>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);

function base64UrlToUint8Array(base64Url) {
  const padLength = (4 - (base64Url.length % 4)) % 4;
  let base64 = base64Url + (padLength === 0 ? '' : (padLength === 2 ? '==' : padLength === 3 ? '=' : '===='));
  base64 = base64.split('-').join('+');
  base64 = base64.split('_').join('/');
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

async function ensureServiceWorker() {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    return registration;
  } catch (e) {
    console.error('SW registration error', e);
    return null;
  }
}

async function requestAndSubscribePush() {
  try {
    const registration = await ensureServiceWorker();
    if (!registration) return;

    if ('Notification' in window) {
      const current = Notification.permission;
      if (current === 'denied') return;
      if (current !== 'granted') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') return;
      }
    }

    const existing = await registration.pushManager.getSubscription();
    let subscription = existing;
    if (!subscription) {
      const { publicKey } = await getPublicKey();
      const appServerKey = base64UrlToUint8Array(publicKey);
      subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appServerKey });
    }
    if (subscription) {
      await subscribePush(subscription);
    }
  } catch (e) {
    console.error('Push subscribe error', e);
  }
}

// Expose helper to pages when needed (profile, checkout)
window.easyappzRequestPush = requestAndSubscribePush;

reportWebVitals();
