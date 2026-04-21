import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Хук для витягування slug з URL
import useSingleArticleStore from '../store/useSingleArticleStore'; // Перевір шлях до стора!

import Footer from '../components/Footer/Footer';
import ArticleHeader from '../components/Article/ArticleHeader/ArticleHeader';
import ArticleLeftSidebar from '../components/Article/ArticleLeftSidebar/ArticleLeftSidebar';
import ArticleText from '../components/Article/ArticleText/ArticleText';
import ArticleRightSidebar from '../components/Article/ArticleRightSidebar/ArticleRightSidebar';

import styles from './Article.module.scss';

const Article = () => {
  // 1. Ловимо slug з адресного рядка
  const { slug } = useParams(); 
  
  // 2. Дістаємо стан і функцію завантаження зі стора (відновили fetchArticleBySlug)
  const { article, isLoading, error, fetchArticleBySlug } = useSingleArticleStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    // 3. Якщо є slug, робимо запит на бекенд (відновили перевірку і передачу slug)
    if (slug) {
      fetchArticleBySlug(slug);
    }
  }, [slug, fetchArticleBySlug]);

  // --- ОБРОБКА СТАНІВ ---
  
  if (isLoading) {
    return (
      <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}>
        <h2 className="text-white">Завантаження статті...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}>
        <h2 className="text-danger">{error}</h2>
      </div>
    );
  }

  if (!article) return null; // Якщо статті ще немає, нічого не рендеримо

  // --- РЕНДЕР СТОРІНКИ ---
  return (
    <div className={styles.pageWrapper}>
      
      {/* Прокидаємо реальні дані в Хедер */}
      <ArticleHeader 
        title={article.title} 
        date={article.date} 
      />

      <main className={`container px-4 position-relative z-3 ${styles.articleContainer}`}>
        <div className={styles.articleGrid}>

          <aside className={styles.leftColumn}>
            {/* Максиму потрібен тайтл і контент (для картинок) */}
            <ArticleLeftSidebar 
              title={article.title} 
              content={article.content} 
            />
          </aside>

          <article className={styles.centerColumn}>
            {/* Валєрі потрібен тайтл, дата і контент (для тексту) */}
            <ArticleText 
              title={article.title} 
              date={article.date} 
              content={article.content} 
            />
          </article>

          <aside className={styles.rightColumn}>
            {/* Славі потрібні автори, категорії та лінки */}
            <ArticleRightSidebar 
              contributors={article.contributors} 
              categories={article.categories} 
              references={article.references} 
            />
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Article;