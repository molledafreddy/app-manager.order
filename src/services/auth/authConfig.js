
// const BASE_URL: string | undefined = process.env.REACT_APP_ENDPOINT_AUXILIARES_SISTEMAS;
// const API_KEY: any = process.env.REACT_APP_API_KEY

import axios from 'axios';

const BASE_URL = "";
// const API_KEY: any = process.env.REACT_APP_API_KEY

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
    // 'x-api-key': API_KEY
  },
});