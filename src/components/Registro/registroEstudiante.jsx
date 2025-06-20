import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registro.estudiante.css';

function RegistroEstudiante() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  localStorage.setItem(email, JSON.stringify({ contraseña, rol: 'estudiante' }));


  const handleSubmit = async (e) => {
  e.preventDefault();

  const nuevoEstudiante = { nombre, apellido, email, contraseña };

  try {
    const res = await fetch('http://localhost:3000/api/estudiantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEstudiante)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al registrar');

    
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    usuarios[email] = { contraseña, rol: 'estudiante' };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    setMensaje('Estudiante registrado con éxito');
    setNombre('');
    setApellido('');
    setEmail('');
    setContraseña('');
    navigate('/login');
  } catch (err) {
    setMensaje(`${err.message}`);
  }
};

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2 className="registro-title">Registro de Estudiante</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />

        <label htmlFor="email">Correo</label>
        <input
          type="correo"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="contraseña">Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>

        {mensaje && <p className="registro-mensaje">{mensaje}</p>}
      </form>
    </div>
  );
}

export default RegistroEstudiante;