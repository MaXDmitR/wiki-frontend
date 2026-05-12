import React from 'react';
import useSingleArticleStore from '@/store/useSingleArticleStore'; // 👈 Підключаємо стор
import styles from './ArticleRightSidebar.module.scss';

const ArticleContributors = () => {
  // 1. Дістаємо поточну статтю з "мозку"
  const { article } = useSingleArticleStore();

  // 2. Беремо контриб'юторів (або порожній масив, якщо дані ще вантажаться)
  const contributors = article?.contributors || [];

  // Якщо контриб'юторів немає, просто не малюємо цей блок, щоб не було порожніх дірок
  if (contributors.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Recent Contributors</h3>

      <section className={styles.block}>
        <div className={styles.avatarGroup}>
          {contributors.map((user) => {
            // Перевіряємо, чи є в користувача аватар. Якщо ні - ставимо красиву заглушку
            const avatarUrl = user.avatar?.url || 'https://ui-avatars.com/api/?name=' + (user.name || 'U') + '&background=00e676&color=0a0a0a';

            return (
              <img
                key={user.id}
                src={avatarUrl}
                alt={user.name || "contributor"}
                title={user.name} 
                className={styles.avatar}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ArticleContributors;