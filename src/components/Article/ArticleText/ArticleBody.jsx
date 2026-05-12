import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 👈 Додаємо імпорти
import ArticleParagraph from './ArticleParagraph';
import styles from './ArticleBody.module.scss';

const ArticleBody = ({ date, content = [] }) => {
  const navigate = useNavigate(); // 👈 Ініціалізуємо навігацію
  const { slug } = useParams(); // 👈 Дістаємо slug статті з URL (наприклад, "react-js")

  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/')
    : '';

  return (
    <div className={styles.card}>
      <div className={styles.dateWrapper}>
        {/* 👇 Вішаємо onClick на кнопку. Маршрут залежить від твого App.jsx */}
        <button 
          className={styles.editButton}
          onClick={() => navigate(`/article/${slug}/edit`)} 
        >
        </button>
        <small className={styles.date}>{formattedDate}</small>
      </div>

      {content.map((block, index) => {
        if (block.type === 'section') {
          return (
            <ArticleParagraph 
              key={index} 
              title={block.sectionHeader} 
              paragraphs={block.sectionTexts} 
              
            />
          );
        }
        
        if (block.type === 'header') {
          return (
            <div key={index} className={styles.section}> 
              <span className={styles.horizontalLine}></span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default ArticleBody;