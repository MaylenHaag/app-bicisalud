// src/indexedDB.js
import { openDB } from 'idb';

// Inicializa la base de datos
const dbPromise = openDB('app-bicisalud-db', 1, {
  upgrade(db) {
    // Creamos un "store" llamado "datos" para almacenar la información
    db.createObjectStore('datos', { keyPath: 'id', autoIncrement: true });
  },
});

// Guardar datos en IndexedDB
export async function saveDataOffline(data) {
  const db = await dbPromise;
  await db.add('datos', data);
}

// Obtener todos los datos de IndexedDB
export async function getDataOffline() {
  const db = await dbPromise;
  return await db.getAll('datos');
}
