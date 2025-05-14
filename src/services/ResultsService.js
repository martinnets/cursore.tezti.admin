export async function saveResults(scormId, results) {
    console.log(`Guardando resultados para SCORM ${scormId}:`, results);
    
    try {
      const response = await fetch('/api/scorm-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          scormId,
          timestamp: new Date().toISOString(),
          ...results
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error al guardar resultados: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Resultados guardados correctamente:', data);
      return data;
    } catch (error) {
      console.error('Error al guardar resultados:', error);
      // En producción, podrías implementar reintentos o almacenamiento local temporal
      return null;
    }
  }
  