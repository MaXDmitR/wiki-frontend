import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/services/api'; // Твій налаштований axios

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false, 
      user: null, 
      isLoading: false,
      error: null,

      // 1. ЛОГІН
      loginUser: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/users/login', credentials);
          const data = response.data.data || response.data;
        
          set({ 
            isAuthenticated: true, 
            user: data.user || data, 
            isLoading: false 
          });
          return true;
        } catch (error) {
          console.error('Помилка логіну:', error);
          set({ 
            error: error.response?.data?.message || 'Невірний логін або пароль', 
            isLoading: false 
          });
          return false;
        }
      },

      // 2. РЕЄСТРАЦІЯ
      registerUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const { email, password, nickname, avatar } = userData;
          let uploadedAvatarData = null; 

          // КРОК 1: Якщо є файл аватарки, завантажуємо його на Cloudinary
          if (avatar) {
            const formData = new FormData();
            formData.append('file', avatar); 

            const mediaResponse = await api.post('/media/upload-temp', formData);
            
            uploadedAvatarData = mediaResponse.data?.data || mediaResponse.data;
          }

          // КРОК 2: Формуємо дані для реєстрації
          const registerPayload = {
            email,
            password,
            name: nickname,
          };

          if (uploadedAvatarData && uploadedAvatarData.url) {
            registerPayload.avatar = {
              url: uploadedAvatarData.url,
              publicId: uploadedAvatarData.publicId
            };
          }

          // Відправляємо все одним махом
          await api.post('/users/register', registerPayload);

          // КРОК 3: Автоматично логінимо юзера 
          // КРОК 3: Автоматично логінимо юзера 
      const isLogged = await get().loginUser({ email, password });

      // Оновлюємо стейт ПРАВИЛЬНО (передаємо об'єкт)
      if (isLogged && uploadedAvatarData?.url) {
        set((state) => ({
          user: { 
            ...state.user, 
            avatar: { 
              url: uploadedAvatarData.url, 
              publicId: uploadedAvatarData.publicId 
            } 
          }
        }));
      }

          set({ isLoading: false });
          return isLogged;
          
        } catch (error) {
          console.error('Помилка реєстрації:', error);
          
          const errorMessage = error.response?.data?.message 
            || error.response?.data?.error 
            || 'Помилка при створенні акаунту';

          set({ 
            error: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage, 
            isLoading: false 
          });
          return false;
        }
      },

      // 3. ВИХІД
      logoutUser: () => {
        localStorage.removeItem('token'); 
        set({ isAuthenticated: false, user: null });
      },

      // 🛠 ТИМЧАСОВА ФУНКЦІЯ (Тільки для розробки!)
      toggleDevAuth: () => set((state) => {
        if (state.isAuthenticated) {
          return { isAuthenticated: false, user: null };
        } else {
          return { 
            isAuthenticated: true, 
            user: { name: 'Master Jedi', avatar: 'https://i.pravatar.cc/150?img=47' } 
          };
        }
      }),
    }),
    {
      name: 'auth-storage', // 👈 Zustand автоматично зберігатиме і братиме дані з localStorage під цим ключем
    }
  )
);

export default useAuthStore;