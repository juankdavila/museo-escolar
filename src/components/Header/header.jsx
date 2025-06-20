import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/authContext';
import './header.css';

const Header = () => {
  const { usuario, logout } = useAuth();
  const { cantidad } = useCarrito();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              
    navigate('/login');    
  };

  return (
    <nav className="navbar navbar-expand-lg banner-navbar">
      <div className="container-fluid position-relative p-0">

        
        <img src="/img/logonuevo.png" alt="Logo del museo" className="logo-img" />

        
        <div className="img-overlay"></div>
        <div className="Titulo"><h3 style={{color: 'orange'}}>Museo Escolar</h3></div>

        
        <div className="overlay-content w-100 d-flex justify-content-between align-items-center px-4">
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <Link to="/home" className="nav-link text-white">
                <i className="fa-solid fa-building-columns" style={{ color: 'rgb(234, 150, 47)' }}></i>
                <h5>Home</h5>
              </Link>
            </li>

            
          {usuario?.rol === 'estudiante' && (
            <li className="nav-item mx-3">
                <Link to="/subir" className="nav-link text-white">
                  <i className="fa-solid fa-upload" style={{ color: 'turquoise' }}></i>
                </Link>
            </li>
          )}

            
          {usuario && (
            <li className="nav-item mx-3">
              <Link
                to={usuario.rol === 'estudiante' ? '/perfilEstudiante' : '/perfilVisitante'}
                className="nav-link text-white">
                <i className="fa-solid fa-user" style={{ color: 'turquoise' }}></i>
                <h5>Mi Perfil</h5>
              </Link>
            </li>
            
          )}
          <li className="nav-item mx-3">
                  <Link to="/carrito" className="nav-link text-white" >🛒
                    (<span className="fw-bold">{cantidad}</span>)
                  </Link>
                </li>
          </ul>
          <div className="d-flex align-items-center">
            {usuario && (
              <div className="text-white me-3">
                <small>Bienvenido, {usuario.email}</small>
              </div>
            )}
            {usuario && (
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
        <div className="lema-container text-white">
          <h5 style={{color: 'orange'}}>"Porque cada generación tiene algo que contar"</h5>
        </div>
            
      </div>
      
    </nav>
  );
};

export default Header;