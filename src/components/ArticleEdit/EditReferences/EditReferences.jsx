import React from 'react';
import styles from './EditReferences.module.scss';

const EditReferences = () => {
  return (
    <div className={styles.wrapper}>
      <h3>References</h3>
      <input type="text" placeholder="Add link..." />
    </div>
  );
};

export default EditReferences;