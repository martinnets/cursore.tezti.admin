import axios from 'axios';
import { CONFIG } from '../config/settings';

/**
 * Guarda los resultados del SCORM a través de la API REST
 * @param {string} moduleId - ID del módulo SCORM
 * @param {Object} data - Datos del SCORM a guardar
 * @returns {Promise<Object>} - Respuesta del servidor
 */
export async function saveResults(moduleId, data) {
  try {
    // Preparar los datos para enviar
    const payload = {
      moduleId,
      completionDate: new Date().toISOString(),
      data
    };
    
    // Enviar los datos al servidor
    const response = await axios.post(CONFIG.API_ENDPOINT, payload);
    
    console.log(`Resultados guardados para el módulo ${moduleId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al guardar resultados del módulo ${moduleId}:`, error);
    throw error;
  }
}