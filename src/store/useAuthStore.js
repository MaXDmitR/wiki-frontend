import { create } from 'zustand';
import { api } from '@/services/api'; // Твій налаштований axios

const useAuthStore = create((set, get) => ({
  isAuthenticated: false, 
  user: null, 
  isLoading: false,
  error: null,

  // 1. ЛОГІН
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


  // 2. РЕЄСТРАЦІЯ (Фінальний флоу: Об'єкт аватарки)
  registerUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const { email, password, nickname, avatar } = userData;
      let uploadedAvatarData = null; // Тепер будемо зберігати весь об'єкт

      // КРОК 1: Якщо є файл аватарки, завантажуємо його на Cloudinary
      if (avatar) {
        const formData = new FormData();
        formData.append('file', avatar); 

        const mediaResponse = await api.post('/media/upload-temp', formData);
        
        // Зберігаємо і url, і publicId, які повернув Артем з /media/upload-temp
        uploadedAvatarData = mediaResponse.data?.data || mediaResponse.data;
      }

      // КРОК 2: Формуємо дані для реєстрації
      const registerPayload = {
        email,
        password,
        name: nickname,
      };

      // Додаємо аватарку ЯК ОБ'ЄКТ, рівно як у схемі Swagger
      if (uploadedAvatarData && uploadedAvatarData.url) {
        registerPayload.avatar = {
          url: uploadedAvatarData.url,
          publicId: uploadedAvatarData.publicId
        };
      }

      // Відправляємо все одним махом
      await api.post('/users/register', registerPayload);

      // КРОК 3: Автоматично логінимо юзера (щоб отримати його дані в стейт)
      const isLogged = await get().loginUser({ email, password });

      // Оновлюємо стейт, дістаючи url з нашого об'єкта
      if (isLogged && uploadedAvatarData?.url) {
        set((state) => ({
          user: { ...state.user, avatar: uploadedAvatarData.url }
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
    localStorage.removeItem('token'); // Видаляємо токен
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
}));

export default useAuthStore;