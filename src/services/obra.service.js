import Obras from '../models/obra.js'

const API_URL = 'http://localhost:3000/obras'

export const obtenerObras = async () => {
  const res = await fetch(API_URL, { credentials: 'include' })
  const data = await res.json()
  return data.map(o => new Obras(
    o.id_obra, o.titulo, o.autor, o.descripcion,
    o.imagen, o.precio, o.fechaCreacion,
    o.tecnica, o.cantidad, o.total, o.estudianteId
  ))
}

export const crearObra = async (obra) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obra)
  })
  if (!res.ok) throw new Error('Error al crear obra')
  return await res.json()
}

export const eliminarObra = async (id_obra) => {
  const res = await fetch(`${API_URL}/${id_obra}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  if (!res.ok) throw new Error('Error al eliminar obra')
}