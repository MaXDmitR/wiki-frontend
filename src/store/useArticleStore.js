import { create } from 'zustand';
import { api } from '../services/api';

const useArticleStore = create((set) => ({
  featuredArticle: null, 
  isLoading: false,

  fetchRandomArticle: async () => {
    set({ isLoading: true });
    try {
      
      const response = await api.get('/article/randArticle');
      
     
      const article = response.data.data || response.data; 
      
      if (article) {
        set({ featuredArticle: article, isLoading: false });
      } else {
        set({ isLoading: false }); 
      }
    } catch (error) {
      console.error('Помилка завантаження рандомної статті:', error);
      set({ isLoading: false });
    }
  },
}));

export default useArticleStore;