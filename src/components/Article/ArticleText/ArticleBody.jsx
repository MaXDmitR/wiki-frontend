import React from 'react';
import ArticleParagraph from './ArticleParagraph';
import styles from './ArticleBody.module.scss';

const ArticleBody = ({ date, sections = [] }) => {
  return (
    <div className={styles.card}>
      <div className={styles.dateWrapper}>
        <button className={styles.editButton}></button>
        <small className={styles.date}>{date}</small>
      </div>

      {sections.map((section, index) => (
        <ArticleParagraph
          key={index}
          title={section.title}
          paragraphs={section.paragraphs}
        />
      ))}
    </div>
  );
};

export default ArticleBody;