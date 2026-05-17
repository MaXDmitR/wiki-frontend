import { create } from 'zustand';

const useProfileStore = create((set) => ({
  profileData: null,
  userArticles: [], 
  isLoading: false,
  error: null,

  fetchProfileByEmail: async (email) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Завантажуємо дані профілю за email
      const userRes = await fetch(`https://wikipedianestjsbackend.onrender.com/users/${email}`);
      const userData = await userRes.json();

      if (!userRes.ok) throw new Error(userData.message || "Не вдалося знайти користувача");

      // 2. Завантажуємо статті з бекенду (підлаштовуємося під об'єкт з пагінацією { data: [...] })
      const articlesRes = await fetch(`https://wikipedianestjsbackend.onrender.com/article?limit=100`); // Просимо ліміт побільше для тесту
      const articlesData = await articlesRes.json();

      // Витягуємо чистий масив статей із поля data
      const allArticles = articlesData.data || [];

      // 🔥 РОЗШИРЕНА ФІЛЬТРАЦІЯ: Шукаємо і серед авторів, і в логах історії зміни
      const filteredArticles = allArticles.filter(article => {
        // Перевірка 1: Чи є користувач в масиві contributors статті
        const isOriginalContributor = article.contributors?.some(
          (c) => c.id === userData.id
        );

        // Перевірка 2: Чи є користувач в масиві history цієї статті (як redactedBy)
        const isHistoryEditor = article.history?.some(
          (edit) => edit.redactedBy?.id === userData.id
        );

        // Якщо хоча б одна умова виконується — стаття йде в профіль!
        return isOriginalContributor || isHistoryEditor;
      });

      set({ 
        profileData: userData, 
        userArticles: filteredArticles, 
        isLoading: false 
      });

    } catch (err) {
      console.error("PROFILE FETCH ERROR:", err);
      set({ error: err.message, isLoading: false, profileData: null, userArticles: [] });
    }
  },

  clearProfile: () => set({ profileData: null, userArticles: [], error: null })
}));

export default useProfileStore;