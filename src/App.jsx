import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import Auth from './pages/Auth';


function App() {
  return (
    <BrowserRouter>
      <div>
        <main style={{ flex: 1 }}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<Article />} />

            <Route path="/auth" element={<Auth mode="choice" />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/register" element={<Auth mode="register" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;