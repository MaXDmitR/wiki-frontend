import React, { useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import CategoriesSection from '../components/CategoriesSection/CategoriesSection';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import useArticleStore from '../store/useArticleStore';
import useCategoryStore from '../store/useCategoryStore';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const { featuredArticle, fetchRandomArticle } = useArticleStore();
  const { counts, fetchCounts } = useCategoryStore();
  
  // Створюємо "прапорець", щоб запам'ятати, чи ми вже вантажили статтю
  const hasFetchedRandom = useRef(false);

  useEffect(() => {
    fetchCounts();
    // Порожній масив означає: викликати СУВОРО 1 раз при старті
  }, []);

  useEffect(() => {
    // Витягуємо конкретну цифру, а не весь об'єкт
    const total = counts?.totalCount;

    // Якщо цифра є, І ми ще не робили запит (прапорець false)
    if (total > 0 && !hasFetchedRandom.current) {
      fetchRandomArticle(total);
      
      // Піднімаємо прапорець! Більше цей if ніколи не спрацює, 
      // навіть якщо сторінка перемалюється 10 разів
      hasFetchedRandom.current = true; 
    }
    // Слухаємо тільки цифру total
  }, [counts?.totalCount, fetchRandomArticle]);

  const formattedDate = featuredArticle 
    ? new Date(featuredArticle.date).toLocaleDateString('uk-UA') 
    : '';

  const getArticleDescription = () => {
    if (!featuredArticle?.content) return "";
    return featuredArticle.content[0]?.value;
  };

  return (
    <div> 
      <HeroSection />
      <main className="container position-relative z-3 my-5">
        <div className="mb-5">
          {featuredArticle ? (
            <ArticleCard 
              title={featuredArticle.title}
              paragraphs={[getArticleDescription()]} 
              date={`Was pupliced: ${formattedDate}`}
              logoSrc="/js.svg" 
            />
          ) : (
            <p style={{ color: 'white', textAlign: 'center' }}>Завантаження статті...</p>
          )}
        </div>

        <div className="mb-5">
          <CategoriesSection />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;