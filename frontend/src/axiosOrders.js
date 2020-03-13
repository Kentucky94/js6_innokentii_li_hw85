import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'http://localhost:8080'
});

export default axiosOrders;