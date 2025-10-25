/* Easyappz Service Worker for Push */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = { title: event.data ? event.data.text() : 'Новое сообщение', body: '' };
  }

  const title = payload.title || 'Уведомление кофейни';
  const options = {
    body: payload.body || 'Откройте приложение для подробностей',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: { url: payload.url || '/' }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || '/';
  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      let client = allClients.find((c) => c.url.includes(self.location.origin));
      if (client) {
        client.focus();
        client.navigate(targetUrl);
      } else {
        self.clients.openWindow(targetUrl);
      }
    })()
  );
});
