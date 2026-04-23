import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { api } from '@/services/api';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import styles from "./ArticleSearch.module.scss";

const ArticleSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Закриваємо результати при кліку поза пошуком
  useOnClickOutside(searchRef, () => setIsOpen(false));

  // Магія живого пошуку (Debounce)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        try {
          const response = await api.get(`/article/search/live?q=${query}`);
          const data = response.data.data || response.data;
          setResults(data || []);
          setIsOpen(true);
        } catch (error) {
          console.error("Помилка пошуку:", error);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    // Додали position-relative та ref для кліку зовні
    <div ref={searchRef} className={`${styles.searchContainer} d-flex align-items-center position-relative`}>
      <FaSearch className={styles.searchIcon} size={18} />
      <div className={styles.divider}></div>
      <input 
        type="text" 
        className={styles.searchInput} 
        placeholder="Search IT Wikipedia..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if (results.length > 0) setIsOpen(true) }}
      />

      {/* Випадашка з результатами */}
      {isOpen && (
        <div className={styles.searchResults}>
          {results.length > 0 ? (
            results.map((article) => (
              <Link 
                to={`/article/${article.slug}`} 
                key={article.id} 
                className={styles.searchResultItem}
                onClick={() => {
                  setIsOpen(false);
                  setQuery(''); // Очищаємо інпут після переходу на сторінку
                }} 
              >
                <FaSearch size={12} className={styles.resultIcon} />
                <span>{article.title}</span>
              </Link>
            ))
          ) : (
            <div className={styles.noResults}>Нічого не знайдено</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ArticleSearch;