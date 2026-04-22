import React from 'react';
import ArticleParagraph from './ArticleParagraph';
import styles from './ArticleBody.module.scss';

const ArticleBody = ({ date, content = [] }) => {
  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/')
    : '';

  return (
    <div className={styles.card}>
      <div className={styles.dateWrapper}>
        <button className={styles.editButton}></button>
        <small className={styles.date}>{formattedDate}</small>
      </div>

      {content.map((block, index) => {
        
        if (block.type === 'section') {
          return (
            <ArticleParagraph 
              key={index} 
              title={block.sectionHeader} 
              paragraphs={block.sectionTexts} 
            />
          );
        }
        
        
        if (block.type === 'header') {
          return (
            <div key={index} className={styles.section}> 
              <h2 className={styles.subHeading}>{block.value}</h2>
              <span className={styles.horizontalLine}></span>
            </div>
          );
        }

        
        return null;
      })}
    </div>
  );
};

export default ArticleBody;