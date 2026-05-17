import React from 'react';
import useSingleArticleStore from '@/store/useSingleArticleStore';
import styles from './ArticleRightSidebar.module.scss';

const ArticleContributors = () => {
  const { article } = useSingleArticleStore();
  const contributors = article?.contributors || [];

  if (contributors.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Recent Contributors</h3>

      <section className={styles.block}>
        <div className={styles.avatarGroup}>
          {contributors.map((user) => {
            const avatarUrl = user.avatar?.url || 'https://ui-avatars.com/api/?name=' + (user.name || 'U') + '&background=00e676&color=0a0a0a';

            return (
              // 👇 Обгорнули картинку в div, як ми це робили з Link
              <div
                key={user.id}
                className={styles.avatarItem} // Новий клас обгортки
                data-title={user.name}        // Тултип тепер тут
              >
                <img
                  src={avatarUrl}
                  alt={user.name || "contributor"}
                  className={styles.avatarImg} // Клас самої картинки
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ArticleContributors;