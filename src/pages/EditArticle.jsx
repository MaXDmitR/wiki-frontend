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
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'; // 👈 Іконки для банера

const EditArticle = () => {
  const { slug } = useParams();
  const { article, isLoading, error, fetchArticleBySlug } = useSingleArticleStore();

  const {
    initArticleData,
    setTextBlocks,
    setMediaBlocks,
    saveArticle
  } = useEditArticleStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      fetchArticleBySlug(slug);
    }
  }, [slug, fetchArticleBySlug]);

  useEffect(() => {
    if (article) {
      initArticleData(article); 
    }
  }, [article, initArticleData]);

  if (isLoading) return <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}><h2 className="text-white">Завантаження...</h2></div>;
  if (error || !article) return <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}><h2 className="text-danger">{error || "Статтю не знайдено"}</h2></div>;

// 🔥 ЛОГІКА ДЛЯ ВИЗНАЧЕННЯ РЕЖИМУ ВІДНОВЛЕННЯ ТА ВИВЕДЕННЯ ДАНИХ КОМІТУ
  const history = article.history || [];
  const sortedHistory = [...history].sort((a, b) => new Date(b.dataRedaction) - new Date(a.dataRedaction));
  
  const originalStateStr = sortedHistory.length > 0 
    ? JSON.stringify(sortedHistory[0].contentAfter?.content) 
    : JSON.stringify(article.content || []);

  const currentStateStr = JSON.stringify(article.content || []);

  const isRollbackMode = originalStateStr !== currentStateStr;

  // 🎯 ШУКАЄМО КОНКРЕТНИЙ КОМІТ, ЯКИЙ ЗАРАЗ ЗАВАНТАЖЕНИЙ В РЕДАКТОРІ
  const activeCommit = sortedHistory.find(
    (edit) => JSON.stringify(edit.contentAfter?.content) === currentStateStr
  );

  // Форматуємо дані для виводу в банер
  let commitInfoText = "попередню версію";
  if (activeCommit) {
    if (activeCommit.id === 'initial-commit') {
      commitInfoText = `ОРИГІНАЛЬНУ ВЕРСІЮ СТВОРЕННЯ СТАТТІ`;
    } else {
      const commitDate = new Date(activeCommit.dataRedaction);
      const fDate = commitDate.toLocaleDateString('uk-UA');
      const fTime = commitDate.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
      const author = activeCommit.redactedBy?.name || "Користувач";
      
      commitInfoText = `версію від [ ${author} ] від ${fDate} @ ${fTime}`;
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <ArticleHeader title={article.title} date={article.date} hasSearch={true} />

      {/* 👇 ОНОВЛЕНИЙ ІНФОРМАТИВНИЙ БАНЕР */}
      {isRollbackMode && (
        <div className={styles.rollbackBanner}>
          <div className={styles.bannerContent}>
            <FiAlertTriangle className={styles.bannerIcon} size={18} />
            <p className={styles.bannerText}>
              <strong>[ ROLLBACK_MODE ]</strong> Ви завантажили <span className={styles.commitHighlight}>{commitInfoText}</span>. 
              Ці зміни є тимчасовими в редакторі. Натисніть <span>"Зберегти зміни"</span> внизу, щоб застосувати їх, або 
              <button onClick={() => window.location.reload()} className={styles.reloadBtn}>
                <FiRefreshCw size={12} /> скасувати відкат
              </button>
            </p>
          </div>
        </div>
      )}

      <main className={`container px-4 position-relative z-3 ${styles.articleContainer}`}>
        <div className={styles.articleGrid}>

          <aside className={styles.leftColumn}>
            <EditMediaSidebar
              title={article.title}
              content={article.content}
              onChange={setMediaBlocks} 
            />
          </aside>

          <article className={styles.centerColumn}>
            <EditText
              title={article.title}
              date={article.date}
              content={article.content}
              onChange={setTextBlocks} 
            />
          </article>

          <aside className={styles.rightColumn}>
            <EditRightSidebar />
          </aside>

        </div>
      </main>
      
      <div className={styles.globalActions}>
        <button className={styles.publishButton} onClick={saveArticle}> 
          💾 Зберегти зміни
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default EditArticle;