import axios from "axios";

// n production, il n'y a pas de localhost donc nous devons le rendre dynamique

const BASE_URL = import.meta.nv.MODE === "development" ? "http://localhost:5001/api" : "/api"
const api = axios.create({
    baseURL : BASE_URL,
});

export default api;