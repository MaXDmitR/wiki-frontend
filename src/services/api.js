// src/services/api.js
import axios from 'axios';

export const api = axios.create({
  // Беремо базовий URL з Request URL на твоєму скріні (без /article/count)
  baseURL: 'https://wikipedianestjsbackend.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});