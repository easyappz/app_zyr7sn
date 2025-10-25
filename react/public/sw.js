self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const data = (() => {
    try { return event.data ? event.data.json() : {}; } catch (e) { return {}; }
  })();
  const title = data.title || 'Уведомление';
  const options = {
    body: data.body || '',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: data.data || {},
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
