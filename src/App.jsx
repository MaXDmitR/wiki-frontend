import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';

function App() {
  return (
    <BrowserRouter>
      <div>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            
            <Route path="/article/:slug" element={<Article />} />
            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;