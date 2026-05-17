import React, { useState } from 'react';
import styles from './EditRightSidebar.module.scss';
import EditCategories from './EditCategories/EditCategories';
import EditReferences from './EditReferences/EditReferences';
import EditContributors from '@/components/Article/ArticleRightSidebar/EditContributors';
import useEditArticleStore from '@/store/useEditArticleStore';

// 👇 Додаємо імпорти для історії
import useSingleArticleStore from '@/store/useSingleArticleStore'; 
import ArticleHistoryModal from '@/components/Common/ArticleHistoryModal/ArticleHistoryModal'; // Перевір правильність шляху до модалки
import { FiTerminal } from 'react-icons/fi'; // Термінальна іконка

const EditRightSidebar = () => {
  // Витягуємо дані та функції прямо з "мозку" редагування
  const { categories, setCategories, references, setReferences } = useEditArticleStore();

  // 👇 Стейт для модалки та витягування історії з головного "мозку" статті
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { article } = useSingleArticleStore();
  const history = article?.history || [];

  return (
    <aside className={styles.sidebar}>
    
      <button 
        className={styles.historyBtn}
        onClick={() => setIsHistoryOpen(true)}
      >
        <FiTerminal size={16} className={styles.historyIcon} />
         [ VIEW_HISTORY ]
      </button>

      <EditContributors />
      
      <EditCategories 
        categories={categories} 
        setCategories={setCategories} 
      />
      
      <EditReferences 
        references={references} 
        setReferences={setReferences} 
      />

      {/* 👇 Сама модалка */}
      <ArticleHistoryModal 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        history={history} 
      />
    </aside>
  );
};

export default EditRightSidebar;