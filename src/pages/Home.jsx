import React, { useEffect, useRef } from 'react';
import HeroSection from '@/components/Home/HeroSection/HeroSection';
import CategoriesSection from '@/components/Home/CategoriesSection/CategoriesSection';
import ArticleCard from '@/components/Home/ArticleCard/ArticleCard';
import useArticleStore from '@/store/useArticleStore';

import Footer from "@/components/Common/Footer/Footer";
import ArticleHeader from '@/components/Common/ArticleHeader/ArticleHeader';

const Home = () => {
  const { featuredArticle, fetchRandomArticle } = useArticleStore();
  const hasFetchedRandom = useRef(false);

  useEffect(() => {

    if (!hasFetchedRandom.current) {
      fetchRandomArticle();
      hasFetchedRandom.current = true; 
    }
  }, [fetchRandomArticle]);

  const formattedDate = featuredArticle 
    ? new Date(featuredArticle.date).toLocaleDateString('uk-UA') 
    : '';


  const getArticleDescription = () => {
    if (!featuredArticle?.content) return "Опис відсутній";
    

    const firstSection = featuredArticle.content.find(block => block.type === 'section');
    
    if (firstSection && firstSection.sectionTexts?.length > 0) {
      return firstSection.sectionTexts[0]; 
    }
    return "Опис відсутній";
  };


  const getArticleImage = () => {
    if (!featuredArticle?.content) return "/js.svg"; 
    

    const firstImage = featuredArticle.content.find(block => block.type === 'image');
    
    return firstImage ? firstImage.url : "/js.svg";
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
              date={`Was published: ${formattedDate}`}
              logoSrc={getArticleImage()} 
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