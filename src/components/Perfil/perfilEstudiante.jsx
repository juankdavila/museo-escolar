import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import './Estudiante.css';


function PerfilEstudiante() {
  const { usuario } = useAuth();
  const [obras, setObras] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [estudianteId, setEstudianteId] = useState('');
  

  
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [precio, setPrecio] = useState('');
  const [tecnica, setTecnica] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [total, setTotal] = useState('');

  

  useEffect(() => {
    if (!usuario?.email) return;

    
    fetch(`http://localhost:3000/api/obras/email/${usuario.email}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setObras(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
      })
      .catch(err => console.error(err));

    
    fetch(`http://localhost:3000/api/estudiantes/email/${usuario.email}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setEstudianteId(data.id);
        }
      })
      .catch(err => console.error('Error al obtener estudiante ID:', err));
  }, [usuario]);

  const limpiarFormulario = () => {
    setTitulo('');
    setAutor('');
    setFechaCreacion('');
    setDescripcion('');
    setImagen('');
    setPrecio('');
    setTecnica('');
    setCantidad('');
    setTotal('');
    setEditandoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalCalc = precio && cantidad ? parseFloat(precio) * parseFloat(cantidad) : 0;

    const obraData = {
      titulo,
      autor,
      fechaCreacion: fechaCreacion ? new Date(fechaCreacion).toISOString() : new Date().toISOString(),
      descripcion,
      imagen,
      precio: precio ? parseFloat(precio) : 0,
      tecnica,
      cantidad: cantidad ? parseFloat(cantidad) : 0,
      total: totalCalc? parseFloat(totalCalc) : 0,
      estudianteId: parseInt(estudianteId)
    };

    try {
      let res;
      let data;
      if (editandoId) {
        
        res = await fetch(`http://localhost:3000/api/obras/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obraData)
        });
        data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Error al actualizar');

        setObras(obras.map((o) => (o.id_obra === editandoId ? data : o)));
        alert('Obra actualizada correctamente');
      } else {
        
        res = await fetch('http://localhost:3000/api/obras', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obraData)
        });
        data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Error al crear obra');

        setObras([...obras, data]);
        alert('Obra guardada');
      }

      limpiarFormulario();
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const eliminarObra = async (id_obra) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta obra?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/obras/${id_obra}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar la obra');
      }

      setObras(obras.filter(obra => obra.id_obra !== id_obra));
      alert('Obra eliminada correctamente');
    } catch (err) {
      alert(err.message);
    }
  };

  const editarObra = (obra) => {
    setShowForm(true);
    setTitulo(obra.titulo || '');
    setAutor(obra.autor);
    setDescripcion(obra.descripcion);
    setImagen(obra.imagen);
    setPrecio(obra.precio);
    setFechaCreacion(new Date(obra.fechaCreacion).toISOString().slice(0, 10));
    setTecnica(obra.tecnica);
    setCantidad(obra.cantidad);
    setTotal(obra.total);
    setEstudianteId(obra.estudianteId)
    setEditandoId(obra.id_obra);
  };
  

  return (
    <div className="perfil-container">
      <h2>Perfil de {usuario.email}</h2>
      <p>Rol: {usuario.rol}</p>

      <button
  className="boton-subir-obra"
  onClick={() => {
    if (showForm && editandoId) limpiarFormulario();
    setShowForm(!showForm);
  }}
>
  {showForm ? (editandoId ? 'Cancelar edición' : 'Cancelar') : 'Subir nueva obra'}
</button>

      {showForm && (
        <form className="perfil-form" onSubmit={handleSubmit}>
          <input type="text" value={titulo || ''} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Autor" required />
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" required />
          <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="URL de la imagen" required />
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" required />
          <input type="date" value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)} placeholder="Fecha de creación" required />
          <input type="text" value={tecnica} onChange={(e) => setTecnica(e.target.value)} placeholder="Técnica" />
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder="Cantidad" />
          <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="Total" />
          <input type="text" value={estudianteId} onChange={(e) => setEstudianteId(e.target.value)} placeholder="EstudinateId" />
          <button type="submit">{editandoId ? 'Actualizar obra' : 'Guardar obra'}</button>
        </form>
      )}

      <div className="obras-grid">
        {obras.map((obra) => (
          <div key={obra.id_obra} className="obra-card">
            <h4>{obra.titulo}</h4>
            <p><strong>Autor:</strong> {obra.autor}</p>
            <p><strong>Técnica:</strong> {obra.tecnica}</p>
            <p><strong>Precio:</strong> ${obra.precio}</p>
            <p><strong>Fecha creación:</strong> {new Date(obra.fechaCreacion).toLocaleDateString()}</p>
            <p><strong>Cantidad:</strong> {obra.cantidad}</p>
            <p><strong>Total:</strong> ${obra.total}</p>
            <p><strong>Descripción:</strong>{obra.descripcion}</p>
            {obra.imagen && <img src={obra.imagen} alt={obra.titulo} />}
            <button onClick={() => editarObra(obra)} style={{ backgroundColor: 'blue', color: 'white' }}>Editar</button>
            <button onClick={() => eliminarObra(obra.id_obra)} style={{ backgroundColor: 'red', color: 'white', marginTop: '10px' }}>Eliminar Obra</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerfilEstudiante;