import axios from "axios";

const INVEST_URL = "http://localhost:8080/api/investments/invest-funds";
const SELL_URL = "http://localhost:8080/api/investments/sell-funds";
const PORTFOLIO_URL = "http://localhost:8080/api/investments/investmented/";


class InvestmentService {
    invest = (username, amount, asset, price) => {
        return axios.post(INVEST_URL, {
          username: username,
          investmentAmount: amount,
          investmentAsset: asset,
          investmentPrice: price,
        });
      };
      async sell(username, assetsToSell) {
        try {
          const response = await axios.post(SELL_URL, {
            username: username,
            assetsToSell: assetsToSell
          });
          return response.data;
        } catch (error) {
          if (error.response) {
            const { status, data } = error.response;
            console.error(`HTTP Error ${status}:`, data.message);
            throw new Error(data.message || 'An error occurred while processing your request.');
          } else {
            console.error('Network Error:', error.message);
            throw new Error('Error connecting to the server. Please try again.');
          }
        }
      }


      portfolio = (username) => {
        return axios.get(PORTFOLIO_URL + username);
      };
}

export default new InvestmentService();
