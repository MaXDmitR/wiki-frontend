import React from 'react';
import styles from './EditCategories.module.scss';

const EditCategories = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Related Technologies</h3>
      <div className={styles.tagsContainer}>
        <span>React</span>
        <span>+ Add</span>
      </div>
    </div>
  );
};

export default EditCategories;