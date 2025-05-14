import { useState, useEffect, useRef } from 'react';
import { loadScormContent } from '../services/scormService';
import ScormAPI from '../utils/ScormAPI';

function ScormPlayer({ item, scormId, onScormEvent }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const scormAPIRef = useRef(null);

  useEffect(() => {
    // Inicializar la API de SCORM
    scormAPIRef.current = new ScormAPI({
      onStateChange: (data) => {
        if (onScormEvent) {
          onScormEvent(data);
        }
      }
    });

    // Exponer la API de SCORM para que el contenido SCORM pueda encontrarla
    window.API = scormAPIRef.current;
    window.API_1484_11 = scormAPIRef.current; // Para SCORM 2004

    const loadContent = async () => {
      setLoading(true);
      try {
        const scormContent = await loadScormContent(scormId, item.href);
       
        setContent(scormContent);
        setLoading(false);
      } catch (err) {
        setError(`Error al cargar el contenido: ${err.message}`);
        setLoading(false);
      }
    };

    loadContent();

    return () => {
      // Limpiar la API de SCORM al desmontar
      if (scormAPIRef.current) {
        scormAPIRef.current.terminate();
      }
      delete window.API;
      delete window.API_1484_11;
    };
  }, [item, scormId, onScormEvent]);

  useEffect(() => {
    if (content && containerRef.current) {
      // Interpretar el HTML y ejecutar scripts
      containerRef.current.innerHTML = content;
      
      // Ejecutar scripts manualmente ya que innerHTML no los ejecuta
      const scripts = containerRef.current.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => 
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    }
  }, [content]);

  if (loading) return <div>Cargando contenido...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="scorm-player">
      <div ref={containerRef} className="scorm-content-container"></div>
    </div>
  );
}

export default ScormPlayer;