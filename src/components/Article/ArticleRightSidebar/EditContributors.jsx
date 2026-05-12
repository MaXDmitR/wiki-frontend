import React from 'react';
import useSingleArticleStore from '@/store/useSingleArticleStore'; // 👈 Підключаємо стор
import styles from './EditContributors.module.scss'; // 👈 Твій файл стилів для режиму редагування

const EditContributors = () => {
  // Дістаємо поточну статтю
  const { article } = useSingleArticleStore();

  // Беремо масив авторів (якщо він є)
  const contributors = article?.contributors || [];

  // Якщо список порожній, ховаємо блок
  if (contributors.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Recent Contributors</h3>
      <section className={styles.block}>
        <div className={styles.avatarGroup}>
          {contributors.map((user) => {
            // Генерація красивої заглушки, якщо Артем або ти не завантажили аватарку
            const avatarUrl = user.avatar?.url || 'https://ui-avatars.com/api/?name=' + (user.name || 'U') + '&background=00e676&color=0a0a0a';

            return (
              <img 
                key={user.id} 
                src={avatarUrl} 
                alt={user.name || "contributor"} 
                title={user.name} // Підказка з ім'ям при наведенні
                className={styles.avatar} 
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default EditContributors;