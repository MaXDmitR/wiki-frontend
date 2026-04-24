import { create } from 'zustand';
import { api } from '@/services/api'; 

const useSingleArticleStore = create((set) => ({
  article: null,
  relatedArticles: [], // 👈 НОВЕ: додаємо місце для зберігання подібних статей
  isLoading: false,
  error: null,

  fetchArticleBySlug: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/article/${slug}`);
      
      // Дістаємо дані (враховуємо, якщо NestJS загортає все у поле data)
      const data = response.data.data || response.data;

      // Тепер розпаковуємо матрьошку Артема:
      if (data && data.article) {
        set({ 
          article: data.article,         // 👈 Кладемо саму статтю
          relatedArticles: data.related, // 👈 Зберігаємо масив подібних статей
          isLoading: false 
        });
      } else {
        // Fallback на випадок якщо структура інша
        set({ article: data, isLoading: false }); 
      }
    } catch (error) {
      console.error('Помилка завантаження статті:', error);
      set({ error: 'Не вдалося завантажити статтю', isLoading: false });
    }
  },
}));

export default useSingleArticleStore;