import React from 'react';
import styles from './ArticleParagraph.module.scss';

const ArticleParagraph = ({ title, paragraphs = [] }) => {
  return (
    <div className={styles.section}>
      
      {title && <h2>{title}</h2>}
      {title && <span className={styles.horizontalLine}></span>}

      <div className={styles.centerText}>
        
        {paragraphs.map((text, i) => (
          // 👇 Ось тут магія, яка змушує React рендерити HTML, а не текст
          <p 
            key={i} 
            dangerouslySetInnerHTML={{ __html: text }} 
          />
        ))}
        
      </div>
    </div>
  );
};

export default ArticleParagraph;