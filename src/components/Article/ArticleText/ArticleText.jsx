import React from 'react';
import ArticleBody from './ArticleBody';
import styles from './ArticleText.module.scss';

const ArticleText = ({ title, date, content }) => {
  return (
    <div className={styles.centerTest}>
      <div className={styles.articleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.subTitle}>Details</h3>

        <ArticleBody date={date} content={content} />
      </div>
    </div>
  );
};

export default ArticleText;