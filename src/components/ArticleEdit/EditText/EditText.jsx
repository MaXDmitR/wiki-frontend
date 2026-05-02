import React from 'react';
import styles from './EditText.module.scss';

const EditText = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Edit Article Name</h2>
      <div className={styles.editorPlaceholder}>
        <p>WYSIWYG Editor will be here...</p>
      </div>
    </div>
  );
};

export default EditText;