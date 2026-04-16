import React from 'react';
import styles from './ArticleHeader.module.scss';

const ArticleHeader = () => {
  return (
    <div className={styles.headerTest}>
      <h2>Article Header (React.js)</h2>
      <p>Тут буде логотип та дата</p>
    </div>
  );
};

export default ArticleHeader;