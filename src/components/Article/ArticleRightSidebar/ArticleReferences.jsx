import styles from './ArticleRightSidebar.module.scss';
import { FaRegCopy } from 'react-icons/fa';

// Тепер компонент приймає пропс references від батька (ArticleRightSidebar)
const ArticleReferences = ({ references = [] }) => {
  // Якщо посилань немає, просто ховаємо цей блок
  if (!references || references.length === 0) return null;

  // 1. Функція для красивого відображення (робить з https://www.react.dev -> react.dev)
  const formatTitle = (refString) => {
    try {
      // Пробуємо розпарсити як URL
      const domain = new URL(refString).hostname;
      return domain.replace('www.', ''); 
    } catch (e) {
      // Якщо це просто текст (не посилання), повертаємо як є
      return refString; 
    }
  };

  // 2. Функція для копіювання в буфер обміну
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Можна додати якусь красиву нотифікацію-тост у майбутньому
        console.log('Скопійовано:', text);
      })
      .catch(err => console.error('Помилка копіювання:', err));
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>References</h3>

      <section className={styles.block}>
        <ul className={styles.refList}>
          {/* Проходимося по масиву рядків від Артема */}
          {references.map((refString, index) => {
            // Перевіряємо, чи це посилання
            const isLink = refString.startsWith('http');

            return (
              <li key={index} className={styles.refItem}>
                {isLink ? (
                  <a href={refString} target="_blank" rel="noreferrer" title={refString}>
                    {formatTitle(refString)}
                  </a>
                ) : (
                  // Якщо це просто текст-посилання, виводимо як span
                  <span title={refString} style={{ fontSize: '13px', color: '#444', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                    {formatTitle(refString)}
                  </span>
                )}

                {/* Оживлена кнопка копіювання */}
                <button 
                  className={styles.copyBtn} 
                  onClick={() => handleCopy(refString)}
                  title="Скопіювати"
                >
                  <FaRegCopy />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default ArticleReferences;