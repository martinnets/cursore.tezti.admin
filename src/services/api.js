/* eslint-disable no-unused-vars */
export async function getAvailableScormPackages() {
    try {
      // En un entorno real, esto sería una llamada a una API o una lectura del sistema de archivos
      // Simulamos la lectura de la estructura de carpetas scorm-package/1, scorm-package/2, scorm-package/3
      
      // En un entorno de producción utilizaríamos el filesystem de Node.js si es posible
      // o una API específica para acceder a los archivos de la carpeta
      
      // Para la demo, simulamos el contenido de las carpetas
      const packages = [
        {
          id: "1",
          title: "Introducción a React",
          description: "Curso básico sobre React y sus conceptos fundamentales",
          path: "scorm/1"
        },
        {
          id: "2",
          title: "JavaScript Avanzado",
          description: "Profundiza en conceptos avanzados de JavaScript",
          path: "scorm/2"
        },
        {
          id: "3",
          title: "Diseño Responsive",
          description: "Aprende a crear sitios web adaptables a diferentes dispositivos",
          path: "scorm/3"
        }
      ];
      
      return packages;
    } catch (error) {
      console.error("Error al cargar paquetes SCORM:", error);
      return [];
    }
  }
  
  // Función para cargar un paquete SCORM específico por ID
  export async function loadScormPackage(packageId) {
    try {
      // Ahora buscamos el paquete en la carpeta scorm-package/{id}
      const packagePath = `scorm/${packageId}`;
      console.log(`Cargando paquete SCORM desde: ${packagePath}`);
      
      // En un entorno real, aquí leeríamos el archivo imsmanifest.xml de la carpeta
      // y los archivos asociados al contenido SCORM
      
      // Para la demo, simulamos la carga del paquete
      const manifestPath = `${packagePath}/imsmanifest.xml`;
      
      // Crear una solicitud fetch para el archivo manifest
      // En un entorno de desarrollo podríamos usar:
      // const manifestResponse = await fetch(manifestPath);
      // const manifestXML = await manifestResponse.text();
      
      // Simulación de los datos del paquete
      const mockScormData = {
        id: packageId,
        title: packageId === "1" ? "Introducción a React" : 
               packageId === "2" ? "JavaScript Avanzado" : "Diseño Responsive",
        manifestXML: `
          <?xml version="1.0" encoding="UTF-8"?>
          <manifest identifier="com.example.scorm${packageId}" version="1.0">
            <organizations default="default_org">
              <organization identifier="default_org">
                <title>${packageId === "1" ? "Introducción a React" : 
                       packageId === "2" ? "JavaScript Avanzado" : "Diseño Responsive"}</title>
                <item identifier="item_1" identifierref="resource_1">
                  <title>Página 1</title>
                </item>
                <item identifier="item_2" identifierref="resource_2">
                  <title>Página 2</title>
                </item>
                <item identifier="item_3" identifierref="resource_3">
                  <title>Página 3</title>
                </item>
              </organization>
            </organizations>
            <resources>
              <resource identifier="resource_1" type="webcontent" href="page1.html">
                <file href="page1.html"/>
              </resource>
              <resource identifier="resource_2" type="webcontent" href="page2.html">
                <file href="page2.html"/>
              </resource>
              <resource identifier="resource_3" type="webcontent" href="page3.html">
                <file href="page3.html"/>
              </resource>
            </resources>
          </manifest>
        `,
        basePath: packagePath,
        // Contenido simulado para las páginas SCORM
        resources: [
          {
            id: "resource_1",
            href: "page1.html",
            content: `
              <div style="font-family: Arial; padding: 20px">
                <h1>Bienvenido al curso ${packageId === "1" ? "Introducción a React" : 
                  packageId === "2" ? "JavaScript Avanzado" : "Diseño Responsive"}</h1>
                <p>Esta es la primera página del contenido SCORM. Aquí comenzarás tu aprendizaje sobre este tema.</p>
                <div style="background-color: #f0f7ff; padding: 15px; border-radius: 8px;">
                  <h3>Objetivos del curso</h3>
                  <ul>
                    <li>Comprender los conceptos básicos</li>
                    <li>Aplicar las técnicas aprendidas</li>
                    <li>Desarrollar habilidades prácticas</li>
                  </ul>
                </div>
                <script>
                  // Script básico de SCORM para inicializar
                  if (window.API) {
                    window.API.SetValue("cmi.core.lesson_location", "page1");
                  }
                </script>
              </div>
            `
          },
          {
            id: "resource_2",
            href: "page2.html",
            content: `
              <div style="font-family: Arial; padding: 20px">
                <h1>Contenido principal - ${packageId === "1" ? "React" : 
                  packageId === "2" ? "JavaScript" : "Diseño Web"}</h1>
                <p>Esta es la segunda página con el contenido principal del curso.</p>
                
                <div style="margin: 20px 0;">
                  <h3>Pregunta de práctica:</h3>
                  <p>¿Cuál de las siguientes opciones es correcta para ${packageId === "1" ? "React" : 
                    packageId === "2" ? "JavaScript" : "Diseño Responsive"}?</p>
                  
                  <div id="question">
                    <div class="option">
                      <input type="radio" name="q1" id="q1_a" value="a">
                      <label for="q1_a">Opción A</label>
                    </div>
                    <div class="option">
                      <input type="radio" name="q1" id="q1_b" value="b">
                      <label for="q1_b">Opción B</label>
                    </div>
                    <div class="option">
                      <input type="radio" name="q1" id="q1_c" value="c">
                      <label for="q1_c">Opción C (Correcta)</label>
                    </div>
                    
                    <button id="checkAnswer" style="margin-top: 15px; padding: 8px 15px;">Verificar</button>
                    <div id="feedback" style="margin-top: 10px;"></div>
                  </div>
                </div>
                
                <script>
                  // Script para manejar la interacción
                  document.getElementById('checkAnswer').addEventListener('click', function() {
                    const selectedOption = document.querySelector('input[name="q1"]:checked');
                    const feedback = document.getElementById('feedback');
                    
                    if (!selectedOption) {
                      feedback.textContent = "Por favor selecciona una opción";
                      feedback.style.color = "orange";
                      return;
                    }
                    
                    const isCorrect = selectedOption.value === "c";
                    
                    if (isCorrect) {
                      feedback.textContent = "¡Correcto!";
                      feedback.style.color = "green";
                    } else {
                      feedback.textContent = "Incorrecto. La respuesta correcta es la Opción C.";
                      feedback.style.color = "red";
                    }
                    
                    // Registrar interacción en SCORM
                    if (window.API) {
                      window.API.SetValue("cmi.core.score.raw", isCorrect ? "100" : "0");
                      
                      // Registrar la interacción
                      window.API.data.interactions.push({
                        id: "q1",
                        description: "¿Cuál de las siguientes opciones es correcta?",
                        learnerResponse: selectedOption.value,
                        correctResponse: "c",
                        result: isCorrect ? "correct" : "incorrect"
                      });
                    }
                  });
                  
                  // Actualizar ubicación en SCORM
                  if (window.API) {
                    window.API.SetValue("cmi.core.lesson_location", "page2");
                  }
                </script>
              </div>
            `
          },
          {
            id: "resource_3",
            href: "page3.html",
            content: `
              <div style="font-family: Arial; padding: 20px">
                <h1>Conclusión del curso ${packageId === "1" ? "React" : 
                  packageId === "2" ? "JavaScript" : "Diseño Web"}</h1>
                <p>Has llegado al final del módulo. ¡Felicidades por completar todas las lecciones!</p>
                
                <div style="background-color: #f0fff0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3>Resumen de lo aprendido</h3>
                  <p>En este curso has aprendido:</p>
                  <ul>
                    <li>${packageId === "1" ? "Componentes React y su ciclo de vida" : 
                       packageId === "2" ? "Closures y promesas en JavaScript" : "Media queries y flexbox"}</li>
                    <li>Aplicaciones prácticas</li>
                    <li>Resolución de problemas</li>
                  </ul>
                </div>
                
                <button id="completeBtn" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
                  Marcar como completado
                </button>
                
                <script>
                  // Script para finalizar el SCORM
                  document.getElementById('completeBtn').addEventListener('click', function() {
                    if (window.API) {
                      // Marcar como completado
                      window.API.SetValue("cmi.core.lesson_status", "completed");
                      window.API.Commit("");
                      
                      alert("¡Curso completado con éxito!");
                    }
                  });
                  
                  // Actualizar ubicación en SCORM
                  if (window.API) {
                    window.API.SetValue("cmi.core.lesson_location", "page3");
                  }
                </script>
              </div>
            `
          }
        ]
      };
      
      return mockScormData;
    } catch (error) {
      console.error(`Error al cargar el paquete SCORM ${packageId}:`, error);
      throw new Error(`No se pudo cargar el paquete SCORM con ID ${packageId}`);
    }
  }
  
  // Función para enviar los resultados del SCORM a la API externa
  export async function sendScormResults(packageId, results) {
    try {
      // URL de la API REST externa (deberás reemplazarla con tu API real)
      const apiUrl = "https://tu-api-rest.com/scorm/results";
      
      // Datos a enviar
      const data = {
        packageId,
        timestamp: new Date().toISOString(),
        ...results
      };
      
      console.log(`Enviando resultados para el paquete ${packageId} a ${apiUrl}:`, data);
      
      // En un entorno real, haríamos una petición fetch:
      /*
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Error al enviar resultados: ${response.status}`);
      }
      
      return await response.json();
      */
      
      // Para la demo, simulamos una respuesta exitosa
      return {
        success: true,
        message: "Resultados guardados correctamente",
        id: `result_${Date.now()}`
      };
    } catch (error) {
      console.error("Error al enviar resultados SCORM:", error);
      throw error;
    }
  }