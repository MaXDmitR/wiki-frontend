import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSingleArticleStore from '@/store/useSingleArticleStore';
import useEditArticleStore from '@/store/useEditArticleStore';

import Footer from "@/components/Common/Footer/Footer";
import ArticleHeader from '@/components/Common/ArticleHeader/ArticleHeader';
import EditMediaSidebar from '@/components/ArticleEdit/EditMediaSidebar/EditMediaSidebar';
import EditRightSidebar from '@/components/ArticleEdit/EditRightSidebar';

import styles from './EditArticle.module.scss';
import EditText from '@/components/ArticleEdit/EditText/EditText';




const EditArticle = () => {
  const { slug } = useParams();
  const { article, isLoading, error, fetchArticleBySlug } = useSingleArticleStore();



  // 👇 ТЯГНЕМО ТІЛЬКИ ТЕ, ЩО ТРЕБА, З НОВОГО СТОРА
  const {
    initArticleData,
    setTextBlocks,
    setMediaBlocks,
    saveArticle
  } = useEditArticleStore();

  // 1. Хук для завантаження: просто кажемо бекенду "Дай статтю"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      fetchArticleBySlug(slug);
    }
  }, [slug, fetchArticleBySlug]);

  // 2. Хук-синхронізатор: щойно стаття завантажилась у перший стор, 
  // ми миттєво копіюємо її дані в наш стор для редагування
  useEffect(() => {
    if (article) {
      initArticleData(article); 
    }
  }, [article, initArticleData]);

  if (isLoading) return <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}><h2 className="text-white">Завантаження...</h2></div>;
  if (error || !article) return <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}><h2 className="text-danger">{error || "Статтю не знайдено"}</h2></div>;

  return (
    <div className={styles.pageWrapper}>
      <ArticleHeader title={article.title} date={article.date} hasSearch={true} />

      <main className={`container px-4 position-relative z-3 ${styles.articleContainer}`}>
        <div className={styles.articleGrid}>

          <aside className={styles.leftColumn}>
            <EditMediaSidebar
              title={article.title}
              content={article.content}
              onChange={setMediaBlocks} // 👈 Одразу кидаємо в стор
            />
          </aside>

          <article className={styles.centerColumn}>
            <EditText
              title={article.title}
              date={article.date}
              content={article.content}
              onChange={setTextBlocks} // 👈 Одразу кидаємо в стор
            />
          </article>

          <aside className={styles.rightColumn}>
            {/* Сайдбар сам підключений до стора всередині! */}
            <EditRightSidebar />
          </aside>

        </div>


      </main>
      <div className={styles.globalActions}>
        <button className={styles.publishButton} onClick={saveArticle}> {/* 👈 Викликаємо зі стора */}
          💾 Зберегти зміни
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default EditArticle;