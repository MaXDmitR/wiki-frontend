import styles from './ArticleRightSidebar.module.scss';
import { FaRegCopy } from 'react-icons/fa';

const references = [
  { id: 1, title: 'React Docs', url: 'https://react.dev' },
  { id: 2, title: 'Vite Docs', url: 'https://vitejs.dev' },
  { id: 3, title: 'SCSS Guide', url: 'https://sass-lang.com' },
];

const ArticleReferences = () => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>References</h3>

      <section className={styles.block}>
        <ul className={styles.refList}>
          {references.map((ref) => (
            <li key={ref.id} className={styles.refItem}>
              <a href={ref.url} target="_blank" rel="noreferrer">
                {ref.title}
              </a>

              <button className={styles.copyBtn}>
                <FaRegCopy />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ArticleReferences;