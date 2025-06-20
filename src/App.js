import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext.js';
import { AuthProvider } from './context/authContext.js';
import Home from './components/Home/home.jsx';
import ListaCarrito from './components/Lista-Carrito/lista-carrito.jsx';
import Login from './components/login/login.jsx';
import ProtectedRoute from './ProtectedRoute/protecteRoute.jsx';
import PerfilEstudiante from './components/Perfil/perfilEstudiante.jsx';
import PerfilVisitante from './components/Perfil/perfilVisitante.jsx';
import RegistroEstudiante from './components/Registro/registroEstudiante.jsx';
import LayoutProtegido from './components/Layout/layout.protegido.jsx';
import SeleccionarRegistro from './components/Registro/seleccionRegistro.jsx';
import RegistroVisitante from './components/Registro/registroVisitante.jsx';


function App() {
  return (
    <CarritoProvider>
      <AuthProvider>
        <Router>
          <Routes>
            
            <Route path="/login" element={<Login />} />
            <Route path="/registroEstudiante" element={<RegistroEstudiante />} />
            <Route path="/registroVisitante" element={<RegistroVisitante />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/seleccionarRegistro" element={<SeleccionarRegistro />} />

            
            <Route
              element={
                <ProtectedRoute>
                  <LayoutProtegido />
                </ProtectedRoute>
              }
            >

              
              <Route path="/perfilEstudiante" element={<PerfilEstudiante />} />
              <Route path="/perfilVisitante" element={<PerfilVisitante />} />
              <Route path="/carrito" element={<ListaCarrito />} />
              <Route path="/home" element={<Home />} />
            </Route>

          
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CarritoProvider>
  );
}

export default App;