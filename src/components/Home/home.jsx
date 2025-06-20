import React, { useEffect, useState } from 'react';
import { useCarrito } from '../../context/CarritoContext';
import './home.css';

function Home() {
  const [obras, setObras] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [campoBusqueda, setCampoBusqueda] = useState('titulo');
  const { obrasVendidas,agregar } = useCarrito();


  useEffect(() => {
    fetch('http://localhost:3000/api/obras')
      .then(res => res.json())
      .then(data => {
        const obrasNormalizadas = data.map(obra => ({
          ...obra,
          precio: Number(obra.precio),
        }));
        setObras(obrasNormalizadas);
      })
      .catch(err => console.error(err));

    
    const guardado = localStorage.getItem('obrasVendidas');
    if (guardado) {
      (JSON.parse(guardado));
    }
  }, []);

  const agregarAlCarritoConAlerta = (obra) => {
    if (obrasVendidas.includes(obra.id_obra)) {
      alert('Esta obra ya fue vendida.');
      return;
    }

    agregar(obra, 1);
    window.alert(`Obra "${obra.titulo}" agregada al carrito.`);
  };
  const sugerencias = obras.filter(obra =>
    obra[campoBusqueda]?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const obrasFiltradas = sugerencias;
  

  return (
    <div className="home-container"> 
      
      <div className="busqueda-container">
  <div className="busqueda-fila">
  
    <select
      className="campo-select"
      value={campoBusqueda}
      onChange={(e) => setCampoBusqueda(e.target.value)}
    >
      <option value="titulo">Título</option>
      <option value="autor">Autor</option>
      
    </select>

    {/* Campo de texto */}
    <input
      type="text"
      placeholder={`Buscar por ${campoBusqueda}`}
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      className="busqueda-input"
    />
  </div>
  
</div>
<h2 style={{textAlign: 'center', color: 'brown'}}>Galeria de Obras Artisticas</h2>


      <div className="obras-grid">
        {obrasFiltradas.length === 0 && (
    <p className="mensaje-no-encontrado">No se encontraron resultados.</p>
  )}
        {obrasFiltradas.map(obra => (
          <div key={obra.id_obra} className="obra-card">
            <h4 style={{color: 'brown'}}>{obra.titulo }</h4>
            {obra.imagen && (
              <img src={obra.imagen} alt={obra.titulo} />
            )}
            <p><strong>Autor:</strong> {obra.autor}</p>
            <p><strong>Técnica:</strong> {obra.tecnica}</p>
            <p><strong>Precio:</strong> ${obra.precio}</p>
            <p><strong>Fecha creación:</strong> {new Date(obra.fechaCreacion).toLocaleDateString()}</p>
            <p><strong>Descripción:</strong> {obra.descripcion}</p>
            

            {obrasVendidas.includes(obra.id_obra) ? (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Vendido</span>
            ) : (
              <button onClick={() => agregarAlCarritoConAlerta(obra)}>
                🛒 Agregar al carrito
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;