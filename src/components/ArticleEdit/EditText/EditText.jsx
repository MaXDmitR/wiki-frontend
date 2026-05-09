import React from 'react';
import EditArticleBody from './EditArticleBody';
import styles from './EditText.module.scss';

const EditText = ({ title, date, content, onChange }) => {
  return (
    <div className={styles.centerTest}>
      <div className={styles.articleWrapper}>

        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.subTitle}>// Edit mode</h3>

        <EditArticleBody
          date={date}
          content={content}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default EditText;