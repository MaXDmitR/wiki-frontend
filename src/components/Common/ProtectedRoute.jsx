import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  // Якщо юзер не авторизований, мовчки кидаємо його на сторінку логіну
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Якщо все ок — рендеримо те, що всередині (нашу сторінку редагування)
  return children;
};

export default ProtectedRoute;