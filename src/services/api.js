import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://wikipedianestjsbackend.onrender.com', 
});