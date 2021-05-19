const staticCacheName = 'static-cache-v0';
const dynamicCacheName = 'dynamic-cache-v0';

const staticAssets = [
    '/favicons/favicon-16x16.png',
    '/favicons/favicon.ico',
    '/assets/icons/icon-72x72.png',
    '/assets/icons/icon-96x96.png',
    '/assets/icons/icon-144x144.png',
    '/assets/icons/icon-128x128.png',
    '/assets/icons/icon-152x152.png',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png',
    '/manifest.json',
    // '/js/app.js',
    '/offline.html'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    // console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    // console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    // console.log(`Trying to fetch ${event.request.url}`);
    // Не кэшируем файлы для авто обновления страницы
    if (event.request.url.indexOf('/api') !== -1) return;
    //
    // event.respondWith(checkCache(event.request));

    const { request } = event;

    // Always bypass for range requests, due to browser bugs
    if (request.headers.has('range')) return;

    event.respondWith(async function() {
        // Try to get from the cache:
        const cachedResponse = await checkCache(request);
        if (cachedResponse) return cachedResponse;

        try {
            const response = await event.preloadResponse;
            if (response) return response;

            // Otherwise, get from the network
            return await fetch(request);
        } catch (err) {
            // If this was a navigation, show the offline page:
            if (request.mode === 'navigate') {
                return caches.match('/ offline.html');
            }

            // Otherwise throw
            throw err;
        }
    }());
});

async function checkCache(req) {
    // Пробуем найти это в кэше
    const cachedResponse = await caches.match(req);
    // Возвращаем пользователю либо данные из кэша,
    // либо если их нет, идем в онлайн
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('/offline.html');
        } else {
            return caches.match('./images/no-image.jpg');
        }
    }
}

// Пуш уведомления
self.addEventListener('push', function (e) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        //notifications aren't supported or permission not granted!
        return;
    }

    if (e.data) {
        let msg = e.data.json();
        console.log(msg)
        e.waitUntil(self.registration.showNotification(msg.title, {
            body: msg.body,
            icon: msg.icon,
            actions: msg.actions
        }));
    }
});

self.addEventListener('notificationclick', function(event) {
    let messageId = event.notification.data;

    event.notification.close();

    if (event.action == 'open') {
        clients.openWindow("/account/eggs");
    } else if (event.action == 'birds') {
        clients.openWindow("/birds");
    } else if (event.action == 'sellers') {
        clients.openWindow("/sellers");
    } else if (event.action == 'certificates') {
        clients.openWindow("/certificates");
    }
    else {
        clients.openWindow("/");
    }
}, false);
