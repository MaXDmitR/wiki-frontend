import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TopContributors.module.scss';

const TopContributors = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndCalculateTopContributors = async () => {
      try {
        const response = await fetch('https://wikipedianestjsbackend.onrender.com/article?limit=1000');
        const data = await response.json();
        const articles = data.data || [];

        // Словник для підрахунку загального внеску: { userId: { userObject, count } }
        const usersMap = new Map();

        articles.forEach((article) => {
          // 🔥 Створюємо тимчасовий словник для унікальних користувачів САМЕ В ЦІЙ статті
          const uniqueUsersInThisArticle = new Map();

          // 1. Додаємо оригінальних авторів
          article.contributors?.forEach((user) => {
            uniqueUsersInThisArticle.set(user.id, user);
          });

          // 2. Додаємо тих, хто редагував (історія)
          article.history?.forEach((edit) => {
            const user = edit.redactedBy;
            if (user) {
              uniqueUsersInThisArticle.set(user.id, user);
            }
          });

          // 3. Тепер кожному унікальному автору цієї статті додаємо +1 до його глобального лічильника
          uniqueUsersInThisArticle.forEach((user, userId) => {
            if (!usersMap.has(userId)) {
              usersMap.set(userId, { ...user, count: 0 });
            }
            usersMap.get(userId).count += 1;
          });
        });

        // Сортуємо від більшого до меншого та беремо ТОП-6
        const sortedUsers = Array.from(usersMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        setTopUsers(sortedUsers);
      } catch (error) {
        console.error("Помилка при завантаженні контриб'юторів:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndCalculateTopContributors();
  }, []);

  if (isLoading) return <p className="text-white text-center">Loading contributor rankings...</p>;
  if (topUsers.length === 0) return null;

  // Медальки для Топ-3
  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Top Contributors</h2>
      
      <div className={styles.grid}>
        {topUsers.map((user, index) => {
          const avatarUrl = user.avatar?.url || `https://ui-avatars.com/api/?name=${user.name}&background=f0f0f0&color=111`;
          const medal = getMedal(index);
          
          return (
            <Link to={`/user/${user.email}`} key={user.id} className={styles.card}>
              
              <div className={styles.avatarWrapper}>
                <img src={avatarUrl} alt={user.name} className={styles.avatar} />
                {medal && <span className={styles.medalBadge}>{medal}</span>}
              </div>

              <h3 className={styles.name} title={user.name}>{user.name}</h3>
              <p className={styles.role}>{user.role || 'Contributor'}</p>

              <div className={styles.statsPill}>
                {/* 👇 Замінили edits на articles */}
                <span className={styles.count}>{user.count}</span> articles
              </div>

            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopContributors;