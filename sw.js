self.addEventListener('install', (event) => {
    console.log("Almacenando archivos en cachee....ESPE");
    const wu = new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const addFiles = ""; // Aquí puedes agregar los archivos que deseas almacenar en caché
                console.log("Service Worker installed Espe");
                resolve();
            }, 1000);
            self.skipWaiting(); // Forzar la activación inmediata del Service Worker
        } catch (error) {
            reject(error);
        }
        event.waitUntil(wu); // Asegura que la instalación se complete antes de activar el Service Worker
    });
});

self.addEventListener('activate', (event) => {
    console.log("Service Worker activated");
    event.waitUntil(clients.claim()); // Asegura que el Service Worker tome el control de las páginas abiertas
});

self.addEventListener('fetch', (event) => {
    console.log("Cacheando claims");
    console.log(event.request.url);
});