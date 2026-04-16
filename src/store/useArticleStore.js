// src/store/useArticleStore.js
import { create } from 'zustand';
import { api } from '../services/api';

const useArticleStore = create((set) => ({
  featuredArticle: null, 
  isLoading: false,

  fetchRandomArticle: async (total) => {
    set({ isLoading: true });
    try {
      if (!total || total === 0) return;

      const randomPage = Math.floor(Math.random() * total) + 1;

      const response = await api.get(`/article?page=${randomPage}&limit=1`);
      
      // ГОЛОВНА ЗМІНА ТУТ:
      // Axios повертає response.data, а бекенд загортає масив ще в один "data"
      const articles = response.data.data; 
      
      if (articles && articles.length > 0) {
        set({ featuredArticle: articles[0], isLoading: false });
      } else {
        // Якщо раптом бек нічого не повернув
        set({ isLoading: false }); 
      }
    } catch (error) {
      console.error('Помилка завантаження рандомної статті:', error);
      set({ isLoading: false });
    }
  },
}));

export default useArticleStore;