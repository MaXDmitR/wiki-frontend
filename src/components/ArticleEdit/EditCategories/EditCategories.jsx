import React, { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import styles from '../EditRightSidebar.module.scss';

// 1. Словник категорій (ключі мають точно збігатися з тим, що чекає Артем на бекенді)
const CATEGORY_MAP = {
  webDevelopment: 'Web Development',
  mobileApps: 'Mobile Apps',
  dataScience: 'Data Science',
  uxUiDesign: 'UX/UI Design',
  cyberSecurity: 'Cyber Security',
  devOps: 'DevOps'
};

const AVAILABLE_CATEGORIES = Object.keys(CATEGORY_MAP);

const EditCategories = ({ categories = [], setCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAdd = () => {
    // Перевіряємо, чи вибрана категорія і чи її ще немає в списку
    if (selectedCategory && !categories.includes(selectedCategory)) {
      setCategories([...categories, selectedCategory]);
      setSelectedCategory(''); // Скидаємо вибір
    }
  };

  const handleRemove = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Categories</h3>
      <div className={styles.block}>
        
        {/* Список обраних категорій */}
        <div className={styles.itemList}>
          {categories.map((cat, index) => (
            <div key={index} className={styles.item}>
              {/* Показуємо "гарну" назву зі словника, або саму категорію */}
              <span>{CATEGORY_MAP[cat] || cat}</span>
              <button className={styles.removeBtn} onClick={() => handleRemove(index)}>
                <FiX />
              </button>
            </div>
          ))}
        </div>

        {/* Вибір нової категорії */}
        <div className={styles.addRow}>
          <select
            className={styles.input} // Використовуємо твій існуючий клас для стилів
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ appearance: 'auto', paddingRight: '10px' }} // Невеличкий фікс для стрілочки
          >
            <option value="" disabled>Select category...</option>
            {AVAILABLE_CATEGORIES.map((key) => (
              <option 
                key={key} 
                value={key}
                disabled={categories.includes(key)} // Не даємо вибрати те, що вже додано
              >
                {CATEGORY_MAP[key]}
              </option>
            ))}
          </select>
          
          <button 
            className={styles.addBtn} 
            onClick={handleAdd}
            disabled={!selectedCategory} // Кнопка неактивна, якщо нічого не вибрано
          >
            <FiPlus />
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditCategories;