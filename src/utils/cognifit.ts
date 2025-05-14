

import React, {Component} from 'react';
//const API_BASE_URL = "/api-cognifit/";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const client_id  ="e452c70e88d804d2396b06a78f3da0ce"
const client_secret= "953a5b98beb97a7d130093cf6a7d93dc" 

export const getUserList = async () => {
  try {
    const raw =  JSON.stringify({
      'client_id': client_id,
      'client_secret': client_secret,
      'initial_value': 0,
      'total_points': 50
    });
    const requestOptions = {
    method: "POST",
    headers: {Accept: 'application/json', 'Content-Type': 'application/json',},  
    body: raw}
    const response = await  fetch(API_BASE_URL+'get-users-list',requestOptions)
    if (!response.ok) throw new Error('Error ');
    return await response.json();
  } catch (error) {
  console.error('Error :', error);
  return null;
  }
};
export const getAssessmentList = async () => {
    try {
      const response = await  fetch(API_BASE_URL+'programs/assessments?client_id='+client_id+'&locales[]=es')
      if (!response.ok) throw new Error('Error al obtener la lista de evaluaciones');
      return await response.json();
    } catch (error) {
      console.error('Error en getAssessmentList:', error);
      return null;
    }
};
export const getaccesstoken = async (usertoken) => {
  try {
    const myHeaders = new Headers();
    
    const raw = JSON.stringify({
        "client_id": client_id,
        "client_secret": client_secret,
        "user_token": usertoken
    });
    //sXvLZnqhoi9hkhFzmrXyF1hdONf9W1Bktty7RnDSmb9TfjSoWNrz/svP6tfygY3eSWadE4XU4hctUL9HNdSZWg==
    const requestOptions = {method: "POST", headers: myHeaders, body: raw };
    const response = await  fetch(API_BASE_URL+'issue-access-token',requestOptions)
    if (!response.ok) throw new Error('Error al obtener la lista de evaluaciones');
    return await response.json();
  } catch (error) {
    console.error('Error en getAssessmentList:', error);
    return null;
  }
};
export const gethistoricalscorskills = async (usertoken) => {
  try {
    console.log(decodeURIComponent(usertoken))
    const raw = JSON.stringify({
        "client_id": client_id,
        "client_secret": client_secret,
        "user_token": usertoken
    });
    console.log(raw)
    const requestOptions = {method: "POST", headers:  {Accept: 'application/json', 'Content-Type': 'application/json'}, body: raw };
    const response = await  fetch(API_BASE_URL+'get-historical-score-and-skills',requestOptions)
    if (!response.ok) throw new Error('Error ');
    return await response.json();
  } catch (error) {
    console.error('Error :', error);
    return null;
  }
};
export const createuser = async (user) => {
  try {
    const raw =  JSON.stringify({
                  "user_name":user.user_name,
                  "user_lastname":user.user_lastname,
                  "user_email":user.user_email,
                  "user_password":"1235679",
                  "user_birthday":"2000-01-01",
                  "user_sex":1,
                  "user_locale":"es",
                  "client_id":client_id,
                  "client_secret":client_secret
              });
   // user.client_id=client_id;
    //user.client_secret=client_secret;
   // const raw =  JSON.stringify(user);
  //console.log(raw)
  const requestOptions = {
      method: "POST",
      headers: {Accept: 'application/json', 'Content-Type': 'application/json',},  
      body: raw}
  const response = await  fetch(API_BASE_URL+'registration',requestOptions)
  if (!response.ok) throw new Error('Error al crear usuario');
  return await response.json();
  } catch (error) {
    console.error('Error :', error);
    return null;
  }
};