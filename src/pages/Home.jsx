import React, { useEffect, useRef } from 'react';
import HeroSection from '@/components/Home/HeroSection/HeroSection';
import CategoriesSection from '@/components/Home/CategoriesSection/CategoriesSection';
import ArticleCard from '@/components/Home/ArticleCard/ArticleCard';
import useArticleStore from '@/store/useArticleStore';
import useCategoryStore from '@/store/useCategoryStore';
import Footer from "@/components/Common/Footer/Footer";
import ArticleHeader from '@/components/Common/ArticleHeader/ArticleHeader';

const Home = () => {
  const { featuredArticle, fetchRandomArticle } = useArticleStore();
  const { counts, fetchCounts } = useCategoryStore();
  
  const hasFetchedRandom = useRef(false);

  useEffect(() => {
    fetchCounts();
    
  }, []);

  useEffect(() => {
    
    const total = counts?.totalCount;

  
    if (total > 0 && !hasFetchedRandom.current) {
      fetchRandomArticle(total);

      hasFetchedRandom.current = true; 
    }

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
      <ArticleHeader hasSearch={false} />
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