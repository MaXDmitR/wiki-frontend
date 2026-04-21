import React from "react";
import styles from "./ArticleLeftSidebar.module.scss";
import ArticleInitialMedia from "./ArticleInitialMedia";
import ArticleMedia from "./ArticleMedia";

const ArticleLeftSidebar = ({ title, content = [] }) => {
  // 1. Знаходимо всі одиночні картинки
  const imageBlocks = content.filter((item) => item.type === "image");
  
  // 2. Знаходимо всі слайдери
  const sliderBlocks = content.filter((item) => item.type === "slider");

  return (
    <div className={styles.Sidebar}>
      
      {/* Рендеримо всі одиночні картинки одна під одною */}
      {imageBlocks.length > 0 ? (
        imageBlocks.map((block, index) => (
          <ArticleInitialMedia 
            key={index}
            img={block.url} 
            upperLabel={block.description} // "Феліс Навідад [Felis Navidad]"
            lowerLabel={block.title}       // "Master programmer..."
          />
        ))
      ) : (
        /* Якщо картинок немає, виводимо заголовок статті */
        <h3 className={styles.DefaultTitle}>{title}</h3>
      )}

      {/* Рендеримо слайдер (або навіть кілька слайдерів, якщо Артем додасть) */}
      {sliderBlocks.map((slider, index) => {
        // Форматуємо картинки слайдера під формат, який розуміє компонент Максима
        const slides = slider.images.map((img) => ({
          img: img.url,
          label: img.title || img.description || title,
        }));

        return <ArticleMedia key={`slider-${index}`} slides={slides} />;
      })}

    </div>
  );
};

export default ArticleLeftSidebar;