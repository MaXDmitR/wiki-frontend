import { create } from 'zustand';
import axios from 'axios'; // Переконайся, що axios встановлено (npm install axios), або заміни на fetch, якщо юзаєте його

const useSingleArticleStore = create((set) => ({
  // Початковий стан
  article: null,
  isLoading: false,
  error: null,

  // Екшен для завантаження статті
  fetchArticleBySlug: async (slug) => {
    // Перед початком запиту скидаємо старі дані і вмикаємо лоадер
    set({ isLoading: true, error: null, article: null }); 
    
    try {
      // Робимо запит на бекенд, підставляючи slug з URL
      const response = await axios.get(`https://wikipedianestjsbackend.onrender.com/article/${slug}`);
      
      // Зберігаємо отриману статтю в стейт і вимикаємо лоадер
      set({ article: response.data, isLoading: false });
    } catch (error) {
      console.error('Помилка при завантаженні статті:', error);
      // Якщо стаття не знайдена (404) або впав сервер
      set({ error: 'На жаль, статтю не знайдено або сталася помилка сервера.', isLoading: false });
    }
  },
}));

export default useSingleArticleStore;