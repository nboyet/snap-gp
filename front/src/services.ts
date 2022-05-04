import axios from "axios";
import urlJoin from "url-join";
import { API_URL, RoutesAPI } from "./constants";

export const getTopology = () => {
  return new Promise((resolve, reject) => {
    const url = API_URL + RoutesAPI.TOPOLOGY;
    IAxios.get(url)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getHosts = () => {
  return new Promise((resolve, reject) => {
    const url = API_URL + RoutesAPI.HOSTS;
    IAxios.get(url)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export const switchPoller = (poller: string, host: string) => {
  return new Promise((resolve, reject) => {
    const url = urlJoin(API_URL, RoutesAPI.SWITCH, poller, host);
    IAxios.post(url)
      .then(async (response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const IAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    'Content-Type': 'application/json'
  },
});
