import axios from 'axios';

const BASE_URLB = process.env.REACT_APP_BASE_URLB;
const BASE_URL =process.env.REACT_APP_BASE_URL;

const marketService = {
  getSensexData: () => axios.get(`${BASE_URL}/sensex`),
  getBitcoinData: () => axios.get(`${BASE_URLB}/bitcoin`)
};

export default marketService;
