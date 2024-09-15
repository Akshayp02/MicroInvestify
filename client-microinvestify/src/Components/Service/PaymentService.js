import axios from "axios";

const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;
const FUND_URL = process.env.REACT_APP_FUND_URL;
const PAYMENT_HISTORY_URL = process.env.REACT_APP_PAYMENT_HISTORY_URL;

class PaymentService {
  getuser = (username) => {
    return axios.get(PAYMENT_URL+ username);
  };

  getFunds = (username)=>{
    return axios.get(FUND_URL + username)
  }

  getPaymenthistory = (username) => {
    return axios.get(PAYMENT_HISTORY_URL + username );
  };

}

export default new PaymentService();