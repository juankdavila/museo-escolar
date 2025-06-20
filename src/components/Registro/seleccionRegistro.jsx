import React from 'react';
import { useNavigate } from 'react-router-dom';
import './seleccionRegistro.css'; 

function SeleccionarRegistro() {
  const navigate = useNavigate();

  return (
    <div className="seleccion-registro" style={{ color: 'blue'}}>
      <h2 style={{ textAlign: 'center'}}>Cómo deseas registrarte?</h2>
      <br />
      <div className="botones-registro">
        <button onClick={() => navigate('/registroEstudiante')}>
          Registrarme como Estudiante
        </button>
        <br />
        <br />
        <button onClick={() => navigate('/registroVisitante')}>
          Registrarme como Visitante
        </button>
      </div>
    </div>
  );
}

export default SeleccionarRegistro;