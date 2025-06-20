import React, { useEffect, useState } from 'react';
import ComprarObra from './ComprarObra';

function GaleriaObras() {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/obras')
      .then(res => res.json())
      .then(data => setObras(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="galeria-container">
      {obras.map((obra) => (
        <div key={obra.id_obra} className="obra-card">
          <h3>{obra.titulo}</h3>
          <p>{obra.descripcion}</p>
          <p>Precio: ${obra.precio}</p>
          <ComprarObra producto={obra} cantidad={1} />
        </div>
      ))}
    </div>
  );
}

export default GaleriaObras;