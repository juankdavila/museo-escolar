import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('visitante');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const usuarioGuardado = localStorage.getItem(email);
    if (!usuarioGuardado) {
      setError('Usuario no registrado');
      return;
    }

    const { contraseña: claveGuardada, rol: rolRegistrado } = JSON.parse(usuarioGuardado);

    if (claveGuardada !== contraseña) {
      setError('Contraseña incorrecta');
      return;
    }

 if (rol !== rolRegistrado) {
  setError('Acceso denegado');
  return;
}

    login({ email, rol });

    if (rol === 'estudiante') {
      navigate('/perfilEstudiante');
    } else {
      navigate('/perfilVisitante');
      navigate('/home');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <p className="error-msg">{error}</p>}

        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="contraseña">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="********"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />

        <label htmlFor="rol">Tipo de Usuario</label>
        <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="estudiante">Estudiante</option>
          <option value="visitante">Visitante</option>
        </select>

        <button type="submit" className="btn-login">Ingresar</button>

        <p>
          ¿No tienes cuenta?{' '}
          <a href="/seleccionarRegistro">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}

export default Login;