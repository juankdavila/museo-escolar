import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', {
        credentials: 'include',
      });

      localStorage.removeItem('usuarioActual'); 
      sessionStorage.clear(); 

   
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      navigate('/login', { replace: true }); 
    }
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}

export default Logout;