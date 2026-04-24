import React from 'react';
import styles from './ArticleRightSidebar.module.scss';
import ArticleContributors from './ArticleContributors';
import ArticleRelatedTechnologies from './ArticleRelatedTechnologies';
import ArticleReferences from './ArticleReferences';

// Приймаємо пропси
const ArticleRightSidebar = ({ contributors, categories, references, relatedArticles }) => {
  return (
    <aside className={styles.sidebar}>
      {/* Прокидаємо пропси у відповідні блоки */}
      <ArticleContributors contributors={contributors} />
      
      {/* Передаємо схожі статті */}
      <ArticleRelatedTechnologies relatedArticles={relatedArticles} />
      
      <ArticleReferences references={references} />
    </aside>
  );
};

export default ArticleRightSidebar;