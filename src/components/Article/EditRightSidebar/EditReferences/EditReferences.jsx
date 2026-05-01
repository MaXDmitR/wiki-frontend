import React, { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import styles from '../EditRightSidebar.module.scss';

const EditReferences = ({ references = [], setReferences }) => {
  const [inputValue, setInputValue] = useState('');

  const formatTitle = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleAdd = () => {
    if (inputValue.trim()) {
      setReferences([...references, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>References</h3>
      <div className={styles.block}>
        <div className={styles.itemList}>
          {references.map((ref, index) => (
            <div key={index} className={styles.item}>
              <a href={ref.startsWith('http') ? ref : `https://${ref}`} target="_blank" rel="noreferrer">
                {formatTitle(ref)}
              </a>
              <button className={styles.removeBtn} onClick={() => setReferences(references.filter((_, i) => i !== index))}>
                <FiX />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.addRow}>
          <input
            className={styles.input}
            placeholder="Add link..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button className={styles.addBtn} onClick={handleAdd}>
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReferences;