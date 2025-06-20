import Estudiantes from '../models/estudiantes.js'

const API_URL = 'http://localhost:3000/api/estudiantes'

export const obtenerEstudiantes = async () => {
  const res = await fetch(API_URL, { credentials: 'include' })
  const data = await res.json()
  return data.map(e => new Estudiantes(e.id, e.nombre, e.apellido, e.email, '', e.obras || []))
}

export const obtenerEstudiantePorId = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { credentials: 'include' })
  const data = await res.json()
  return new Estudiantes(data.id, data.nombre, data.apellido, data.email, '', data.obras || [])
}

export const crearEstudiante = async (estudiante) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estudiante)
  })
  if (!res.ok) throw new Error('Error al crear estudiante')
  return await res.json()
}

export const actualizarEstudiante = async (id, estudiante) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estudiante)
  })
  if (!res.ok) throw new Error('Error al actualizar estudiante')
  return await res.json()
}

export const eliminarEstudiante = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  if (!res.ok) throw new Error('Error al eliminar estudiante')
}