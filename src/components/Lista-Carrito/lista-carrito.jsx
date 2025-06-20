import React, { useState } from 'react';
import { useCarrito } from '../../context/CarritoContext.js';
import { useAuth } from '../../context/authContext';
import './lista-carrito.css';

const ListaCarrito = () => {
  const { usuario } = useAuth();
  const {
    listaCarrito,
    eliminar,
    actualizar,
    finalizarCompra
  } = useCarrito();

  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const enviarpedido = () => {
    if (!usuario?.email) {
      window.alert("Debes iniciar sesión para realizar la compra.");
      return;
    }

    const localStorageKey = `compras_${usuario.email}`;
    const comprasAnteriores = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    // Opcional: añadir fecha de compra a cada ítem
    const comprasConFecha = listaCarrito.map(item => ({
      ...item,
      fechaCompra: new Date().toISOString(),
    }));

    const nuevasCompras = [...comprasAnteriores, ...comprasConFecha];

    localStorage.setItem(localStorageKey, JSON.stringify(nuevasCompras));

    finalizarCompra();
    setPedidoEnviado(true);
    window.alert("¡Tu compra se ha realizado con éxito!");
  };

  const totalCarrito = listaCarrito.reduce(
    (acc, item) => acc + (item.producto.precio || 0) * item.cantidad,
    0
  );

  return (
    <div className="container mt-3">
      <h3 className="text-center" style={{ color: "chocolate" }}>Mi Carrito de Compras</h3>
      <hr />

      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card" style={{ width: '100%' }}>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped text-center">
                  <thead>
                    <tr>
                      <th>id_obra</th>
                      <th>Titulo</th>
                      <th>Autor</th>
                      <th>Descripción</th>
                      <th>Imagen</th>
                      <th>Precio</th>
                      <th>FechaCreacion</th>
                      <th>Tecnica</th>                      
                      <th>Cantidad</th>
                      <th>Total</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaCarrito.length === 0 ? (
                      <tr>
                        <td colSpan="11">El carrito está vacío.</td>
                      </tr>
                    ) : (
                      listaCarrito.map(({ producto, cantidad }) => (
                        <tr key={producto.id_obra}>
                          <td>{producto.id_obra}</td>
                          <td>{producto.titulo}</td>
                          <td>{producto.autor || '-'}</td>
                          <td>{producto.descripcion || '-'}</td>
                          <td>
                            {producto.imagen ? (
                              <img src={producto.imagen} alt="imagen" width="100" height="120" />
                            ) : (
                              '-'
                            )}
                          </td>
                          <td>{producto.precio != null ? `$${Number(producto.precio).toFixed(2)}` : 'Sin precio'}</td>
                          <td>{producto.fechaCreacion ? new Date(producto.fechaCreacion).toLocaleDateString() : 'Sin fecha'}</td>
                          <td>{producto.tecnica || '-'}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              min="1"
                              value={cantidad}
                              onChange={(e) => actualizar(producto.id_obra, Number(e.target.value))}
                            />
                          </td>
                          <td>${(Number(producto.precio || 0) * cantidad).toFixed(2)}</td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => {
                              if (window.confirm(`¿Estás seguro de que deseas eliminar del carrito?`)) {
                                eliminar(producto.id_obra);
                              }
                            }}>
                              🗑 Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {listaCarrito.length > 0 && (
        <div className="row justify-content-center mt-4">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h3 style={{ color: "brown" }}>Compra</h3>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <p>Total:</p>
                  <p>${totalCarrito.toFixed(2)}</p>
                </div>
                <button className="btn btn-dark btn-block btn-lg" onClick={enviarpedido}>
                  Enviar Pedido
                </button>
                {pedidoEnviado && <p className="text-success mt-3">¡Pedido enviado con éxito!</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaCarrito;