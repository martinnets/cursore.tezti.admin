import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompletionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="completion-page">
      <div className="completion-content">
        <h1>¡Felicidades!</h1>
        <p>Has completado todos los módulos del curso exitosamente.</p>
        
        <div className="completion-stats">
          <div className="stat-box">
            <h3>Progreso</h3>
            <div className="progress-bar">
              <div className="progress-fill complete"></div>
            </div>
            <p>100% completado</p>
          </div>
        </div>
        
        <div className="completion-actions">
          <button 
            className="primary-button"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;