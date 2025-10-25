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
import { getPublicKey, saveSubscription } from './api/push';

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
            <App />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);

async function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function registerServiceWorkerAndPush() {
  try {
    if (!('serviceWorker' in navigator)) return;

    const registration = await navigator.serviceWorker.register('/sw.js');

    // Request notification permission
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') return;
    }

    // Subscribe to push
    const existing = await registration.pushManager.getSubscription();
    let subscription = existing;
    if (!subscription) {
      const { publicKey } = await getPublicKey();
      const appServerKey = await urlBase64ToUint8Array(publicKey);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: appServerKey
      });
    }

    // Send subscription to backend
    if (subscription) {
      await saveSubscription(subscription);
    }
  } catch (e) {
    // Silent fail: errors are already intercepted by axios instance
    console.error('SW/Push error', e);
  }
}

registerServiceWorkerAndPush();

reportWebVitals();
