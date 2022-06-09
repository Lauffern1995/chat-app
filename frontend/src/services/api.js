import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  }
})