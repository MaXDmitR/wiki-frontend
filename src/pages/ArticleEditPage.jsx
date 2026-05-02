// src/pages/ArticleEditPage.jsx
import React from 'react';
import EditMediaSidebar from '../components/ArticleEdit/EditMediaSidebar/EditMediaSidebar';
import EditText from '../components/ArticleEdit/EditText/EditText';
import EditCategories from '../components/ArticleEdit/EditCategories/EditCategories';
import EditReferences from '../components/ArticleEdit/EditReferences/EditReferences';
import styles from './ArticleEditPage.module.scss';

const ArticleEditPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.articleContainer}>
        <div className={styles.articleGrid}>
          
          {/* Ліва колонка */}
          <aside className={styles.leftColumn}>
            <EditMediaSidebar />
          </aside>

          {/* Центральна колонка */}
          <main className={styles.centerColumn}>
            <EditText />
          </main>

          {/* Права колонка */}
          <aside className={styles.rightColumn}>
            <EditCategories />
            <EditReferences />
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ArticleEditPage;