// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useState, useContext, useEffect } from 'react';
// import { fetchManifest } from '../utils/scormUtils';

// const ScormContext = createContext();

// export const useScorm = () => useContext(ScormContext);

// export const ScormProvider = ({ children }) => {
//   const [scormSequence, setScormSequence] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [scormData, setScormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Inicializar la secuencia de SCORM desde URL o configuración predeterminada
//   useEffect(() => {
//     const initScormSequence = async () => {
//       try {
//         setLoading(true);
        
//         // Obtener el parámetro de la URL (ejemplo: ?scorms=tema1,tema2,tema3)
//         const urlParams = new URLSearchParams(window.location.search);
//         const scormParam = urlParams.get('scorm');
        
//         // Definir la secuencia de SCORM
//         const sequence = [
//           'intro', // Siempre comenzar con el SCORM de introducción
//           ...(scormParam ? scormParam.split(',') : []), // SCORM del parámetro o array vacío
//           'closing' // Siempre terminar con el SCORM de salida
//         ];
        
//         setScormSequence(sequence);
        
//         // Cargar el primer SCORM automáticamente
//         if (sequence.length > 0) {
//           const manifestData = await fetchManifest(`/scorms/${sequence[0]}/imsmanifest.xml`);
//           setScormData(manifestData);
//         }
        
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     initScormSequence();
//   }, []);

//   const moveToNextScorm = async () => {
//     if (currentIndex < scormSequence.length - 1) {
//       try {
//         setLoading(true);
//         const nextIndex = currentIndex + 1;
//         const nextScorm = scormSequence[nextIndex];
//         const manifestData = await fetchManifest(`/scorms/${nextScorm}/imsmanifest.xml`);
        
//         setCurrentIndex(nextIndex);
//         setScormData(manifestData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     }
//   };

//   const saveScormResults = async (results) => {
//     try {
//       const response = await fetch('/api/scorm-results', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           scormId: scormSequence[currentIndex],
//           results,
//           timestamp: new Date().toISOString(),
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error('Error al guardar resultados');
//       }
      
//       return await response.json();
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   return (
//     <ScormContext.Provider
//       value={{
//         currentScorm: scormSequence[currentIndex],
//         scormData,
//         loading,
//         error,
//         moveToNextScorm,
//         saveScormResults,
//         progress: {
//           current: currentIndex,
//           total: scormSequence.length,
//         },
//       }}
//     >
//       {children}
//     </ScormContext.Provider>
//   );
// };