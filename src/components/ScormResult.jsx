function ScormResult({ results }) {
    return (
      <div className="scorm-results">
        <h2>Resultados del SCORM</h2>
        
        <div className="result-card" style={{ padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '8px' }}>
          <h3>Resumen</h3>
          <div className="result-item">
            <strong>Puntuación:</strong> {results.score} / 100
          </div>
          <div className="result-item">
            <strong>Progreso:</strong> {Math.round(results.progress)}%
          </div>
          <div className="result-item">
            <strong>Estado:</strong> {results.completed ? 'Completado' : 'No completado'}
          </div>
          
          {results.interactions && results.interactions.length > 0 && (
            <div className="interactions" style={{ marginTop: '20px' }}>
              <h3>Interacciones</h3>
              <ul>
                {results.interactions.map((interaction, index) => (
                  <li key={index}>
                    <div><strong>Pregunta {index + 1}:</strong> {interaction.description}</div>
                    <div><strong>Respuesta:</strong> {interaction.learnerResponse}</div>
                    <div><strong>Correcta:</strong> {interaction.result === 'correct' ? 'Sí' : 'No'}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default ScormResult;