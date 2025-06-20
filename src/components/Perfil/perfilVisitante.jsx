import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';

function PerfilVisitante() {
  const { usuario } = useAuth();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    if (!usuario?.email) return;

    const localStorageKey = `compras_${usuario.email}`; // ahora está dentro del useEffect

    const data = localStorage.getItem(localStorageKey);
    if (data) {
      setCompras(JSON.parse(data));
    } else {
      setCompras([]);
    }
  }, [usuario]);

  const eliminarCompra = (index) => {
    if (!usuario?.email) return;

    const localStorageKey = `compras_${usuario.email}`; // también dentro de la función
    const nuevasCompras = [...compras];
    nuevasCompras.splice(index, 1);
    setCompras(nuevasCompras);
    localStorage.setItem(localStorageKey, JSON.stringify(nuevasCompras));
  };

  return (
    <div className="perfil-container">
      <h2>Mis Compras Realizadas</h2>

      {compras.length === 0 ? (
        <p>No has realizado ninguna compra todavía.</p>
      ) : (
        <div className="obras-grid">
          {compras.map(({ producto, cantidad }, index) => (
            <div key={index} className="obra-card">
              <h4>{producto.titulo}</h4>
              <p><strong>Autor:</strong> {producto.autor || '-'}</p>
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Cantidad:</strong> {cantidad}</p>
              <p><strong>FechaCreacion:</strong> {new Date(producto.fechaCreacion).toLocaleDateString()}</p>
              <p><strong>Descripción:</strong> {producto.descripcion || '-'}</p>
              {producto.imagen && (
                <img src={producto.imagen} alt={producto.nombre} style={{ width: '100px' }} />
              )}
              <button className="btn btn-danger mt-2" onClick={() => eliminarCompra(index)}>
                🗑 Eliminar esta compra
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PerfilVisitante;