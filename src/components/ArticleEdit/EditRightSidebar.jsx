import React, { useState } from 'react';
import styles from './EditRightSidebar.module.scss';
import EditCategories from './EditCategories/EditCategories';
import EditReferences from './EditReferences/EditReferences';
import EditContributors from '@/components/Article/ArticleRightSidebar/EditContributors';

const EditRightSidebar = () => {
  const [categories, setCategories] = useState(['Web Development', 'React']);
  const [references, setReferences] = useState(['https://react.dev', 'https://vitejs.dev']);

  return (
    <aside className={styles.sidebar}>
      <EditContributors />
      
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