import React, { useState } from 'react';
import styles from './EditRightSidebar.module.scss';
import EditCategories from './EditCategories/EditCategories';
import EditReferences from './EditReferences/EditReferences';
import ArticleContributors from '@/components/Article/ArticleRightSidebar/ArticleContributors';
import useEditArticleStore from '@/store/useEditArticleStore';


const EditRightSidebar = () => {
  // Витягуємо дані та функції прямо з "мозку"
  const { categories, setCategories, references, setReferences } = useEditArticleStore();

  return (
    <aside className={styles.sidebar}>
      <ArticleContributors />
      
      <EditCategories 
        categories={categories} 
        setCategories={setCategories} 
      />
      
      <EditReferences 
        references={references} 
        setReferences={setReferences} 
      />
    </aside>
  );
};

export default EditRightSidebar;