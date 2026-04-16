// src/store/useCategoryStore.js
import { create } from 'zustand';
import { api } from '../services/api';

const useCategoryStore = create((set) => ({
  // Тут будуть лежати наші цифри з бекенду
  counts: null, 
  isLoading: false,
  error: null,

  // Функція, яка робить запит на сервер
  fetchCounts: async () => {
    set({ isLoading: true, error: null });
    try {
      // Робимо GET запит на ендпоінт, який ти скинув
      const response = await api.get('/article/count');
      
      // Зберігаємо отриманий JSON в стейт counts
      set({ counts: response.data, isLoading: false });
    } catch (error) {
      console.error('Помилка завантаження категорій:', error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCategoryStore;