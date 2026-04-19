import React from 'react';
import styles from './ArticleRightSidebar.module.scss';
import ArticleContributors from './ArticleContributors';
import ArticleRelatedTechnologies from './ArticleRelatedTechnologies';
import ArticleReferences from './ArticleReferences';

const ArticleRightSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ArticleContributors />
      <ArticleRelatedTechnologies />
      <ArticleReferences />
    </aside>
  );
};

export default ArticleRightSidebar;