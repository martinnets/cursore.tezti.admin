/* eslint-disable no-unused-vars */
import { useState, useEffect,useRef } from 'react';
import { CognifitSdk } from '@cognifit/launcher-js-sdk';
import { CognifitSdkConfig } from '@cognifit/launcher-js-sdk/lib/lib/cognifit.sdk.config';
import { Link, useNavigate } from "react-router-dom";
import EvaluacionDataService from "../utils/evaluacion";
import { createuser,getaccesstoken } from '../utils/cognifit';

export default function CognifitPage  () {
  const [accesstoken, setAccessToken] = useState([]);
  const [evaluado, setEvaluado] = useState({});
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const rawDataRef = useRef({}); // Aquí guardamos la respuesta sin renderizar
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const positionid = queryParams.get('position_id');
  const userid = queryParams.get('user_id');
  const token = queryParams.get('access_token');
  const fetchCreateUser = async () => {
      try {
        console.log(rawDataRef.current)
        const data = await createuser(rawDataRef.current);
        if (data) {
          setUser(data);
          console.log(data)
          const datauser ={
            "position_id":positionid,
            "user_id":userid,
            "token": data.user_token
          }
          setTimeout(() => {
            fetchAccessTolen(data.user_token)
          }, 1000);
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
      
    };
  const fetchAccessTolen = async (token) => {
      try {
        const data = await getaccesstoken(token);
        if (data) {
          setAccessToken(data);
          console.log(data)
        } else {
          setError('No se pudo obtener los datos');
        }
      } catch (err) {
        setError('Error');
      } 
       
    };
  useEffect(() => {
    //Otbtener Evaluado
    EvaluacionDataService.getevaluado(token, userid,positionid)
          .then((response) => response.json())
          .then((result) => {
            setEvaluado(result[0])
            console.log(result[0])
            if (result[0].user_token === '') {
              //console.log('User token is empty');
              rawDataRef.current = result[0];
              setTimeout(() => {
                fetchCreateUser();
              }, 1000);
            } else {
              //console.log('User token is not empty');
              setTimeout(() => {
                fetchAccessTolen(result[0].user_token)
              }, 1000);
            }
            
           
          })
          .catch(e => {
            console.log(e);
          });
  
  }, []);
  //EVALUACION COGNIFIT
  const userToken = "DU1QT3kNlTW1yFznxC3S61spbJDXVOGLeeapXksh"//'JklJFywgpmyiPiYBf52g81E39bTIVy6ri7MptyGe';
  //console.log(Math.random());
  const containerId = 'cognifitContainer';
  const clientId = 'e452c70e88d804d2396b06a78f3da0ce';
  const clientToken='sXvLZnqhoi9hkhFzmrXyF1hdONf9W1Bktty7RnDSmb9TfjSoWNrz/svP6tfygY3eSWadE4XU4hctUL9HNdSZWg=='
  const callbackUrl=''
  const typeValue='ASSESSMENT'//: string;
  const keyValue='MINI_CAB_ASSESSMENT'//: string;
  const cognifitSdkConfig = new CognifitSdkConfig(
  containerId,
  clientId,
  accesstoken.access_token,
    {
    sandbox: false,            // Default false.
    appType: 'web',           // 'web' or 'app'.
    theme: 'light',           // 'light' or 'dark'.
    showResults: false,
    height:'500',
    customCss: `
    #cognifit-html5-iframe {
            height: 750px !important;
            
          }
          .cognifit-launcher {
            height: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        `,
    isFullscreenEnabled: false, 
    screensNotToShow: [],     // List of screens not to show after the session.
    scale: 100,               // Default 800. Maximum value used to display values.
    listenEvents: true        // Default false. If true, events will be triggered during session life.
    }
    );
    const cognifitSdk = new CognifitSdk();
    cognifitSdk.init(cognifitSdkConfig).then(response => {
      cognifitSdk.start(
        typeValue,
        keyValue
        ).subscribe({
                next: (cognifitSdkResponse) => {
                  if (cognifitSdkResponse.isSessionCompleted()) {
                    cognifitSdkResponse.typeValue;
                    cognifitSdkResponse.keyValue;
                  }
                  
                },
                complete: () => {
                  console.log("Cognifit session process complete.");
                  navigate('/gracias');
                },
                error: (reason) => {
                  console.log(reason)
                }
              });

            }).catch(error => {
              console.log(error);
            });
  //FIN EVALUACION COGNIFIT
  return (
    <>
      <div className="w-full">
        <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
          <div
            className="relative min-h-screen min-w-screen flex flex-col items-center justify-center
           selection:bg-[#000082] selection:text-white">
            <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
              <main>
                <div id="cognifitContainer" style={{ height:'750px'}}     >

                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
