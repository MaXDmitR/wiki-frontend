import React from 'react';
import styles from './ArticleText.module.scss';

const ArticleText = () => {
  return (
    <div className={styles.centerTest}>
      <h3>Центральний Текст</h3>
      <p>Максим виводить абзаци з бекенду тут. Цей блок найдовший.</p>
    </div>
  );
};

export default ArticleText;