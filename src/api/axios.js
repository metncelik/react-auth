import axios from "axios";

export default axios.create({
    //auth server
    baseURL: "http://localhost:5002"
});

export const axiosPrivate = axios.create({
    //core server
    baseURL: "http://localhost:5000",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});