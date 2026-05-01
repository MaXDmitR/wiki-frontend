import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSingleArticleStore from '@/store/useSingleArticleStore';

import Footer from "@/components/Common/Footer/Footer";
import ArticleHeader from '@/components/Common/ArticleHeader/ArticleHeader';
import ArticleLeftSidebar from '@/components/Article/ArticleLeftSidebar/ArticleLeftSidebar';
import ArticleText from '@/components/Article/ArticleText/ArticleText';
import EditRightSidebar from '@/components/Article/EditRightSidebar/EditRightSidebar';

import styles from './Article.module.scss';

const EditArticle = () => {
  const { slug } = useParams();
  const { article, isLoading, error, fetchArticleBySlug } = useSingleArticleStore();

  const [categories, setCategories] = useState([]);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      fetchArticleBySlug(slug).then((data) => {
        setCategories(data?.categories || []);
        setReferences(data?.references || []);
      });
    }
  }, [slug]);

  if (isLoading) return (
    <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}>
      <h2 className="text-white">Завантаження...</h2>
    </div>
  );

  if (error) return (
    <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}>
      <h2 className="text-danger">{error}</h2>
    </div>
  );

  if (!article) return null;

  return (
    <div className={styles.pageWrapper}>
      <ArticleHeader
        title={article.title}
        date={article.date}
        hasSearch={true}
      />

      <main className={`container px-4 position-relative z-3 ${styles.articleContainer}`}>
        <div className={styles.articleGrid}>

          <aside className={styles.leftColumn}>
            <ArticleLeftSidebar
              title={article.title}
              content={article.content}
            />
          </aside>

          <article className={styles.centerColumn}>
            <ArticleText
              title={article.title}
              date={article.date}
              content={article.content}
            />
          </article>

          <aside className={styles.rightColumn}>
            <EditRightSidebar
              categories={categories}
              setCategories={setCategories}
              references={references}
              setReferences={setReferences}
            />
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditArticle;