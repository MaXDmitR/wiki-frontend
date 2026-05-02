import React from 'react';
import styles from './EditMediaSidebar.module.scss';

const EditMediaSidebar = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Media</h3>
      <div className={styles.placeholderBox}>+ Upload Image</div>
    </div>
  );
};

export default EditMediaSidebar;