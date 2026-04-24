import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { api } from '@/services/api'; // Твій налаштований axios
import { useOnClickOutside } from '@/hooks/useOnClickOutside'; // Хук Максима
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Закриваємо результати при кліку поза пошуком
  useOnClickOutside(searchRef, () => setIsOpen(false));

  // Магія живого пошуку (Debounce)
  useEffect(() => {
    // Встановлюємо таймер
    const timer = setTimeout(async () => {
      // Шукаємо тільки якщо введено більше 2 символів
      if (query.trim().length >= 2) {
        try {
          const response = await api.get(`/article/search/live?q=${query}`);
          const data = response.data.data || response.data; // Залежить від того, як Артем пакує відповідь
          setResults(data || []);
          setIsOpen(true);
        } catch (error) {
          console.error("Помилка пошуку:", error);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 400); // Чекаємо 400мс після останнього натискання клавіші

    // Очищаємо таймер, якщо юзер продовжує друкувати
    return () => clearTimeout(timer);
  }, [query]);


const getThumbnail = (content) => {
    if (!content) return "/js.svg";
    const imageBlock = content.find(block => block.type === 'image');
    return imageBlock ? imageBlock.url : "/js.svg";
  };

  // Дістаємо уривок тексту (максимум 70 символів, щоб красиво влізло)
  const getSnippet = (content) => {
    if (!content) return "";
    const section = content.find(block => block.type === 'section');
    if (section && section.sectionTexts?.length > 0) {
      const text = section.sectionTexts[0];
      return text.length > 70 ? text.substring(0, 70) + '...' : text;
    }
    return "Опис відсутній";
  };

  return (
    <section className={`${styles.heroSection} position-relative d-flex flex-column align-items-center justify-content-center`}>
      <div className={`${styles.heroContent} text-center mt-5`}>
        <div className={`${styles.logoBox} mb-3`}>
          <h1 className={styles.wLogo}>W</h1>
        </div>
        <h2 className={styles.mainTitle}>Wikipédia</h2>
        <p className={styles.subtitle}>The Free IT Encyclopedia</p>
      </div>

      {/* Контейнер пошуку */}
      <div 
        ref={searchRef}
        className={`${styles.searchContainer} mt-4 d-flex align-items-center position-relative`}
      >
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
            setQuery('');
          }} 
        >
          {/* Зліва: Міні-картинка */}
          <div className={styles.resultThumbnail}>
            <img src={getThumbnail(article.content)} alt={article.title} />
          </div>

          {/* Справа: Текст */}
          <div className={styles.resultInfo}>
            <div className={styles.resultTitle}>{article.title}</div>
            <div className={styles.resultSnippet}>{getSnippet(article.content)}</div>
          </div>
        </Link>
      ))
    ) : (
      <div className={styles.noResults}>Нічого не знайдено</div>
    )}
  </div>
)}
      </div>

      <img src="/globe.png" alt="Wikipedia Globe" className={styles.bgGlobe} />
    </section>
  );
};

export default HeroSection;