import React from 'react';
import styles from './ArticleParagraph.module.scss';

const ArticleParagraph = ({ title, paragraphs = [] }) => {
  return (
    <div className={styles.section}>
      
      
      {title && <h2>{title}</h2>}
      {title && <span className={styles.horizontalLine}></span>}

      <div className={styles.centerText}>
        
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default ArticleParagraph;