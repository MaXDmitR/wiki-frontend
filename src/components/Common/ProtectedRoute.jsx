import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation(); // 👈 Дістаємо поточний шлях (напр. "/article/minecraft.../edit")

  if (!isAuthenticated) {
    // 1. Перевіряємо, чи ми знаходимося саме на сторінці редагування статті
    const match = location.pathname.match(/\/article\/([^\/]+)\/edit/);
    
    if (match) {
      // 2. Витягуємо slug з URL (він буде в match[1])
      const slug = match[1]; 
      
      // 3. Показуємо повідомлення (можеш замінити alert на ваш красивий toast, якщо він у вас є)
      alert("Ви не ввійшли в систему. Доступ до редагування закрито.");
      
      // 4. Викидаємо користувача на сторінку читання цієї ж статті
      return <Navigate to={`/article/${slug}`} replace />;
    }

    // 5. Фолбек: якщо це якась інша закрита сторінка (наприклад, налаштування профілю), кидаємо на логін
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;