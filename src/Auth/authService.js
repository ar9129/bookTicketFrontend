import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:5459/api/auth/';

const username1 = "user";
const password1 = "sa";

const credentials = btoa(`${username1}:${password1}`);

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}login`, { username, password }, {withCredentials:true}, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getDecodedToken = () => {
    const token = getToken();
    return token ? jwtDecode(token) : null;
};

export const logout = () => {
    localStorage.removeItem('token');
};
