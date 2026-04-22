import React from "react";
import styles from "./ArticleLeftSidebar.module.scss";
import ArticleInitialMedia from "./ArticleInitialMedia";
import ArticleMedia from "./ArticleMedia";

const ArticleLeftSidebar = ({ title, content = [] }) => {
  
  const imageBlocks = content.filter((item) => item.type === "image");
  
  
  const sliderBlocks = content.filter((item) => item.type === "slider");

  return (
    <div className={styles.Sidebar}>
      
      
      {imageBlocks.length > 0 ? (
        imageBlocks.map((block, index) => (
          <ArticleInitialMedia 
            key={index}
            img={block.url} 
            upperLabel={block.description} 
            lowerLabel={block.title}       
          />
        ))
      ) : (
        
        <h3 className={styles.DefaultTitle}>{title}</h3>
      )}

      
      {sliderBlocks.map((slider, index) => {
        
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