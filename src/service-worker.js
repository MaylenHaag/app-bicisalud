self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-datos') {
      event.waitUntil(syncData());
    }
  });
  
  async function syncData() {
    const db = await openDB('mi-app-db', 1);
    const datos = await db.getAll('datos');
    
    // Aquí enviarías los datos al servidor usando fetch()
    await fetch('/api/sync', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' },
    });
  
    // Limpia los datos luego de sincronizarlos
    await Promise.all(datos.map(async (dato) => {
      await db.delete('datos', dato.id);
    }));
  }

navigator.serviceWorker.ready.then((sw) => {
    sw.sync.register('sync-datos').catch((err) => console.error('Sync failed', err));
});
  