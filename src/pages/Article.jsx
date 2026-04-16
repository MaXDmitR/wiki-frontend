import { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import ArticleHeader from '../components/Article/ArticleHeader/ArticleHeader';
import ArticleLeftSidebar from '../components/Article/ArticleLeftSidebar/ArticleLeftSidebar';
import ArticleText from '../components/Article/ArticleText/ArticleText';
import ArticleRightSidebar from '../components/Article/ArticleRightSidebar/ArticleRightSidebar';

import styles from './Article.module.scss';

const Article = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>

      
      <ArticleHeader />

      
      <main className={`container px-4 position-relative z-3 ${styles.articleContainer}`}>

        <div className={styles.articleGrid}>

          <aside className={styles.leftColumn}>
            <ArticleLeftSidebar />
          </aside>

          <article className={styles.centerColumn}>
            <ArticleText />
          </article>

          <aside className={styles.rightColumn}>
            <ArticleRightSidebar />
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Article;