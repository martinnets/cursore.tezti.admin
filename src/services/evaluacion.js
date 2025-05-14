 // Función para enviar los resultados del SCORM a la API externa
 export async function getEvaluacion(token, position_id) {
    try {
      // URL de la API REST externa (deberás reemplazarla con tu API real)
      const apiUrl = "https://teztiapi.laravel.cloud/evaluacion";
      
      // Datos a enviar
      const data = {
        access_token:token,
        id:position_id
      };
      console.log(data)
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }
      
      return await response.json();
      
      
    //   // Para la demo, simulamos una respuesta exitosa
    //   return {
    //     success: true,
    //     message: "Resultados guardados correctamente",
    //     id: `result_${Date.now()}`
    //   };
    } catch (error) {
      console.error("Error al obtener datos de evaluacion:", error);
      throw error;
    }
  }