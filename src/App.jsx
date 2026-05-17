import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import EditArticle from './pages/EditArticle';
import Auth from './pages/Auth';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import UserProfile from '@/pages/UserProfile';


function App() {
  return (
    <BrowserRouter>
      <div>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<Article />} />

            <Route
              path="/article/:slug/edit"
              element={
                <ProtectedRoute>
                  <EditArticle />
                </ProtectedRoute>
              }
            />


            <Route path="/auth" element={<Auth mode="choice" />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/register" element={<Auth mode="register" />} />
            <Route path="/user/:email" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;