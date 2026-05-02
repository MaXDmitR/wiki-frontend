import React, { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import styles from '../EditRightSidebar.module.scss';

const EditCategories = ({ categories = [], setCategories }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      setCategories([...categories, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Categories</h3>
      <div className={styles.block}>
        <div className={styles.itemList}>
          {categories.map((cat, index) => (
            <div key={index} className={styles.item}>
              <span>{cat}</span>
              <button className={styles.removeBtn} onClick={() => handleRemove(index)}>
                <FiX />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.addRow}>
          <input
            className={styles.input}
            placeholder="New category..."
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

export default EditCategories;