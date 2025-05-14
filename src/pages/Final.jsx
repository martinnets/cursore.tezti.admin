/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import EvaluacionDataService from "../utils/evaluacion";
function Gracias() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [evaluacion, setEvaluacion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [urlParams, setUrlParams] = useState({ id: null, token: null });


  useEffect(() => {
    //navigate('/cognifit');
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('position_id');
    const userid = queryParams.get('uid');
    const token = queryParams.get('access_token');
    setUrlParams({ id, token,userid });
   
    // console.log(id)
    // console.log(token)
    // const loadPackages = async () => {
    //   try {
    //     const availablePackages = await fetchAvailableScorms();
    //     setPackages(availablePackages);
    //     setLoading(false);
    //   } catch (err) {
    //     setError('Error al cargar los paquetes SCORM');
    //     setLoading(false);
    //   }
    // };

    // loadPackages();
  }, []);

  // if (loading) return <div>Cargando paquetes SCORM...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="w-full">
      <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <div
          className="relative min-h-screen min-w-screen flex flex-col items-center justify-center selection:bg-[#000082] selection:text-white">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header className="w-full">
              <div className="flex lg:justify-center">
                <img width="400" src="img/logo.png" alt="Tezti Logo App"></img>
              </div>
            </header>
            <main className="mt-3 w-full">
              <form  >
                
                
                <div className="grid py-10 mx-auto min-w-700  ">
                  <h1 className="text-center">Gracias.</h1>
                  {/* <div className="w-50 flex gap-6 mx-auto py-2 grid-cols-2">
                    <div className="w-50">
                      <p className="label">Nombres:</p>
                      <p className="value rounded-lg">{evaluacion.name}</p>
                    </div>
                    <div className="w-50">
                      <p className="label">Apellidos:</p>
                      <p className="value rounded-lg">{evaluacion.lastname}</p>
                    </div>
                  </div> */}
                   
                  <div className="w-100 flex gap-6 mx-auto py-2 grid-cols-1">
                  
                      <h3 className="text-center">Hemos guardado todas tus respuestas y, a partir de aquí, nosotros continuaremos con este
                      proceso.</h3>                      
                    
                  </div>
                 
                 
                </div>
 
              </form>
            </main>
            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
              COPYRIGHT ©  -v.1.0.2
            </footer>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Gracias;