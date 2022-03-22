import axios from 'axios';
import {API_URL, RoutesAPI} from "./constants";

export const getTopology = () => {
  return new Promise((resolve, reject) => {
    const url = API_URL + '/' + RoutesAPI.TOPOLOGY;
    IAxios.get(url)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const IAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },

  // headers: { 'Content-Type': 'application/json' },
});