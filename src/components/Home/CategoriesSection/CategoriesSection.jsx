import { useEffect } from 'react';
import CategoriesCard from "../CategoriesCard/CategoriesCard";
import styles from "./CategoriesSection.module.scss";
// Імпортуємо наш Store (перевір, щоб шлях відповідав твоїй структурі папок)
import useCategoryStore from '../../../store/useCategoryStore'; 

// Створюємо конфіг наших карток. 
// Ключ 'id' МАЄ точно збігатися з ключами з JSON Тьоми!
const categoriesConfig = [
  { id: 'webDevelopment', name: 'Web Development', icon: 'icons/tech.svg', path: '/development' },
  { id: 'dataScience', name: 'Data Science', icon: 'icons/science.svg', path: '/data-science' },
  { id: 'cyberSecurity', name: 'Cyber Security', icon: 'icons/medicine.svg', path: '/cyber-security' },
  { id: 'mobileApps', name: 'Mobile Apps', icon: 'icons/football.svg', path: '/mobile-apps' },
  { id: 'uxUiDesign', name: 'UI/UX Design', icon: 'icons/art.svg', path: '/ui-ux-design' },
  { id: 'devOps', name: 'DevOps & Cloud', icon: 'icons/politic.svg', path: '/devops-cloud' },
];

const CategoriesSection = () => {
  // Витягуємо дані та функцію запиту зі Store
  const { counts, isLoading, fetchCounts } = useCategoryStore();

  // useEffect спрацює один раз при завантаженні сторінки і зробить запит на бекенд
  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return (
    <section className="section container">
      <h2 className={styles.title}>IT Categories</h2>
      
      <div className={styles.cardsList}>
        {/* Проходимося по нашому масиву і рендеримо картки */}
        {categoriesConfig.map((cat) => (
          <CategoriesCard
            key={cat.id}
            icon={cat.icon}
            nameCategory={cat.name}
            path={cat.path}
            
            countArticles={counts ? counts[cat.id] : "..."} 
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;