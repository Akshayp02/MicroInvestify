import axios from "axios";

const URL = process.env.REACT_APP_STOCK_API_URL;
const HISTORICAL_OPTIONS_URL = process.env.REACT_APP_HISTORICAL_OPTIONS_URL;

const API_KEY = process.env.REACT_APP_STOCK_API_KEY;

class Stockservice {
  // get top performers from the API
  getTopGAINERS_LOSERS = () => {
    return axios.get(URL + API_KEY);
  };

  // Fetch historical options data
  getHistoricalOptions = (symbol) => {
    return axios.get(`${HISTORICAL_OPTIONS_URL}${symbol}&apikey=${API_KEY}`);
  };

  // Calculate total returns
  calculateTotalReturns = (
    meanReturns,
    daysInWeek = 5,
    daysInMonth = 22,
    daysInYear = 252
  ) => {
    const results = {};
    for (const symbol in meanReturns) {
      const dailyReturn = meanReturns[symbol];
      const weeklyReturn = (Math.pow(1 + dailyReturn, daysInWeek) - 1) * 100;
      const monthlyReturn = (Math.pow(1 + dailyReturn, daysInMonth) - 1) * 100;
      const yearlyReturn = (Math.pow(1 + dailyReturn, daysInYear) - 1) * 100;

      results[symbol] = {
        weeklyReturn,
        monthlyReturn,
        yearlyReturn,
      };
    }
    return results;
  };
}

export default new Stockservice();
