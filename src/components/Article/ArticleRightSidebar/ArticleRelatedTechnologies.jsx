import { Link } from 'react-router-dom';
import styles from './ArticleRightSidebar.module.scss';

const ArticleRelatedTechnologies = ({ relatedArticles = [] }) => {
  if (!relatedArticles || relatedArticles.length === 0) return null;

  const getImage = (content) => {
    if (!content) return "/js.svg";
    const imgBlock = content.find(block => block.type === 'image');
    return imgBlock ? imgBlock.url : "/js.svg";
  };

  return (
    <div className={styles.section}>
      {/* Змінили заголовок */}
      <h3 className={styles.sectionTitle}>Related Articles</h3>

      <section className={styles.block}>
        <div className={styles.techGroup}>
          {relatedArticles.map((relArticle) => (
            <Link
              to={`/article/${relArticle.slug}`}
              key={relArticle.id}
              className={styles.techItem}
              data-title={relArticle.title} // 👈 Змінили title на data-title
            >
              <img
                src={getImage(relArticle.content)}
                alt={relArticle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticleRelatedTechnologies;