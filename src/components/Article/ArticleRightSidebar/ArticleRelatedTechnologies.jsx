import { Link } from 'react-router-dom';
import styles from './ArticleRightSidebar.module.scss';

const ArticleRelatedTechnologies = ({ relatedArticles = [] }) => {
  // Якщо схожих статей немає, ховаємо весь блок
  if (!relatedArticles || relatedArticles.length === 0) return null;

  // Функція для пошуку першої картинки в статті
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
              title={relArticle.title} // Показує назву статті при наведенні мишкою
            >
              <img
                src={getImage(relArticle.content)}
                alt={relArticle.title}
                // Стилі, щоб картинка ідеально заповнювала кружечок
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