import React from 'react';
import { useAuth } from '../../context/authContext';

function ComprarObra({ producto, cantidad = 1 }) {
  const { usuario } = useAuth();

  const guardarCompra = () => {
    if (!usuario || !usuario.email) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const localStorageKey = `compras_${usuario.email}`;
    const comprasAnteriores = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    const nuevaCompra = { producto, cantidad };
    const nuevasCompras = [...comprasAnteriores, nuevaCompra];

    localStorage.setItem(localStorageKey, JSON.stringify(nuevasCompras));
    alert(`¡${producto.titulo} comprada correctamente!`);
  };

  return (
    <button className="btn btn-success" onClick={guardarCompra}>
      🛒 Comprar
    </button>
  );
}

export default ComprarObra;