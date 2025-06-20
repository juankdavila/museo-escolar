import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function RegistroVisitante() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    const usuarioExistente = localStorage.getItem(email);
    if (usuarioExistente) {
      alert('Este correo ya está registrado.');
      return;
    }

    const usuario = {
      nombre,
      apellido,
      contraseña,
      rol: 'visitante',
    };

    localStorage.setItem(email, JSON.stringify(usuario));
    alert('Visitante registrado con éxito');
    navigate('/login');
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleRegistro}>
        <h2 className="registro-title">Registro de Visitante</h2>

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
          type="email"
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
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}

export default RegistroVisitante;