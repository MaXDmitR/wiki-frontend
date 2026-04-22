import { create } from 'zustand';

const useAuthStore = create((set) => ({

  isAuthenticated: false, 
  

  user: null, 

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