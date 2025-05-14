/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import EvaluacionDataService from "../utils/evaluacion";
import { getaccesstoken, getAssessmentList,createuser } from '../utils/cognifit';
function ProcesosPage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [evaluacion, setEvaluacion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [urlParams, setUrlParams] = useState({ id: null, token: null });
  const [user_, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const assessmentList = await getAssessmentList();
      console.log(assessmentList);      
    };
    const fetchAccessTolen = async () => {
      const token = await getaccesstoken();
      console.log(token);    
    };
    const fetchCreateUser = async () => {
      try {
        const data = await createuser();
        if (data) {
          setUser(data);
          EvaluacionDataService.createevaluado(data)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
              console.log(error);
          });
        } else {
          setError('No se pudo obtener los datos');
        }
      } catch (err) {
        setError('Error');
      } 
      const user = await createuser();
      console.log(user);    
    };
  // fetchData();
  // fetchAccessTolen();
   fetchCreateUser();
    //  const datauser={
    //       user_name: 'Martin',
    //       user_lastname: 'Alonso',
    //       user_email:'demo2@hotmail.com',
    //       user_password:'1235679',
    //       user_birthday:'2000-01-01',
    //       user_sex:1,
    //       user_locale:'es'
    //   };
        //   CognifitDataService.createaccesstoken()
        //      .then(response => response.json())
        //      .then(result =>{
        //        console.log(result);
        //      })
        //      .catch(function (error) {
        //        console.log(error);
        //      });
            //  CognifitDataService.getassesments()
            //  .then(response => response.json())
            //  .then(result =>{
            //    console.log(result);
            //  })
            //  .catch(function (error) {
            //    console.log(error);
            //  });
    //   CognifitDataService.getusers( )
    //     .then(response => response.json())
    //     .then(result =>{
    //         console.log(result);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
        
    
    // loadPackages();
    // CognifitDataService.getusers()
    //    .then(response => response.json())
    //    .then(result =>{
    //      console.log(result);
    //    })
    //    .catch(function (error) {
    //      console.log(error);
    //    });
    // CognifitDataService.createaccesstoken()
    //     .then(response => response.json())
    //     .then(result =>{
    //          console.log(result);
    //     })
    //        .catch(function (error) {
    //          console.log(error);
    //     });
  }, [ ]);

  // if (loading) return <div>Cargando paquetes SCORM...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="w-full">
      <h1>Procesos</h1>
     
    </div>
  );
}

export default ProcesosPage;