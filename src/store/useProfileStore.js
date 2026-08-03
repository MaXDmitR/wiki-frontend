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

            if (!userRes.ok) throw new Error(userData.message || "Failed to fetch user profile");

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
    updateProfile: async (email, newName, avatarFile, currentAvatar) => {
    set({ isLoading: true, error: null });
    try {
      let avatarPayload = currentAvatar; // За замовчуванням залишаємо стару аватарку

      // 1. Якщо користувач вибрав нове фото — вантажимо на Cloudinary
      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);

        const mediaRes = await fetch('https://wikipedianestjsbackend.onrender.com/media/upload-temp', {
          method: 'POST',
          body: formData,
        });
        
        if (!mediaRes.ok) throw new Error("Failed to upload photo");
        
        const mediaData = await mediaRes.json();
        const uploadedAvatar = mediaData.data || mediaData;
        
        avatarPayload = { 
          url: uploadedAvatar.url, 
          publicId: uploadedAvatar.publicId 
        };
      }

      // 2. Відправляємо PATCH запит з новими даними
      const payload = {
        name: newName,
      };
      if (avatarPayload) {
        payload.avatar = avatarPayload;
      }

      const res = await fetch(`https://wikipedianestjsbackend.onrender.com/users/${email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to update profile data");
      
      const updatedUser = await res.json();

      // Оновлюємо дані на сторінці
      set({ profileData: updatedUser, isLoading: false });
      return updatedUser;

    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  clearProfile: () => set({ profileData: null, userArticles: [], error: null })
}));

export default useProfileStore;