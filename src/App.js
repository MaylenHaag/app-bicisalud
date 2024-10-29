// src/App.js
import React, { useState } from 'react';
import { saveDataOffline, getDataOffline } from './indexedDB';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [storedData, setStoredData] = useState([]);

  const handleSave = async () => {
    const data = { text: inputValue, date: new Date() };
    await saveDataOffline(data);
    setInputValue(''); // Limpiar el campo
    alert('Datos guardados offline!');
  };

  const handleRetrieve = async () => {
    const data = await getDataOffline();
    setStoredData(data);
  };

  return (
    <div>
      <h1>Aplicación Offline con React</h1>
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe algo..."
      />
      <button onClick={handleSave}>Guardar Offline</button>
      <button onClick={handleRetrieve}>Mostrar Datos Guardados</button>
      <ul>
        {storedData.map((item, index) => (
          <li key={index}>{item.text} - {new Date(item.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
