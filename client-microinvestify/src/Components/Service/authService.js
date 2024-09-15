import axios from "axios";

const REGISTER_API_BASE_URL = process.env.REACT_APP_REGISTER_API_BASE_URL;
const LOGIN_API_BASE_URL = process.env.REACT_APP_LOGIN_API_BASE_URL;
class Authservice {
    registerUser(user) {
        return axios.post(REGISTER_API_BASE_URL, user);
    }

    login(logUser){
        return axios.post(LOGIN_API_BASE_URL, logUser);
        
    }
}

export default new Authservice();