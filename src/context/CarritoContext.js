import React, { createContext, useContext, useEffect, useState } from 'react';

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [listaCarrito, setListaCarrito] = useState([]);
  const [compras, setCompras] = useState([]);
  const [obrasVendidas, setObrasVendidas] = useState(() => {
    const guardado = localStorage.getItem('obrasVendidas');
    return guardado ? JSON.parse(guardado) : [];
  });

  
  useEffect(() => {
    const local = localStorage.getItem('carrito');
    if (local) setListaCarrito(JSON.parse(local));

    const comprasLocal = localStorage.getItem('compras');
    if (comprasLocal) setCompras(JSON.parse(comprasLocal));

    const vendidasLocal = localStorage.getItem('obrasVendidas');
    if (vendidasLocal) setObrasVendidas(JSON.parse(vendidasLocal));
  }, []);

  
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(listaCarrito));
  }, [listaCarrito]);

  useEffect(() => {
    localStorage.setItem('compras', JSON.stringify(compras));
  }, [compras]);

  useEffect(() => {
    localStorage.setItem('obrasVendidas', JSON.stringify(obrasVendidas));
  }, [obrasVendidas]);

  
  const agregar = (producto, cantidad = 1) => {
    const existe = listaCarrito.some(item => item.producto.id_obra=== producto.id_obra);

    let nuevaLista;
    if (existe) {
      nuevaLista = listaCarrito.map(item =>
        item.producto.id_obra === producto.id_obra
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
    } else {
      nuevaLista = [...listaCarrito, { producto, cantidad }];
    }

    setListaCarrito(nuevaLista);
  };

  
  const eliminar = (productoId) => {
    const nuevaLista = listaCarrito.filter(item => item.producto.id_obra !== productoId);
    setListaCarrito(nuevaLista);
  };

  
  const actualizar = (productoId, cantidad) => {
    const nuevaLista = listaCarrito.map(item =>
      item.producto.id === productoId
        ? { ...item, cantidad }
        : item
    );
    setListaCarrito(nuevaLista);
  };

  
  const finalizarCompra = () => {
    setCompras([...compras, ...listaCarrito]);

  
    const idsComprados = listaCarrito.map(item => item.producto.id_obra);

    
    setObrasVendidas(prev => Array.from(new Set([...prev, ...idsComprados])));

    setListaCarrito([]);
  };

  const cantidad = listaCarrito.reduce((acc, item) => acc + item.cantidad, 0);

  const total = listaCarrito.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);

  
  const vaciarCarrito = () => {
    setListaCarrito([]);
    localStorage.removeItem('carrito');
  };

  return (
    <CarritoContext.Provider value={{
      listaCarrito,
      agregar,
      eliminar,
      actualizar,
      cantidad,
      total,
      compras,
      finalizarCompra,
      vaciarCarrito,
      obrasVendidas,  
    }}>
      {children}
    </CarritoContext.Provider>
  );
};