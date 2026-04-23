import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Додали useNavigate
import { FaDiceFive } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import styles from "./ArticleRightButtons.module.scss";
import useAuthStore from "@/store/useAuthStore";
import useArticleStore from "@/store/useArticleStore"; // Імпортуємо стор статей
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const ArticleRightButtons = () => {
  const { isAuthenticated, toggleDevAuth, user } = useAuthStore();
  const { fetchRandomArticle } = useArticleStore(); // Дістаємо функцію пошуку
  const navigate = useNavigate(); // Для перенаправлення
  
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  // ФУНКЦІЯ ДЛЯ ДАЙСА
  const handleRandomClick = async () => {
    const article = await fetchRandomArticle();
    if (article?.slug) {
      navigate(`/article/${article.slug}`); // Перекидаємо на сторінку статті
    }
  };

  return (
    <div className={`${styles.topNav} d-flex align-items-center gap-3 position-relative`}>
      
      <button 
        onClick={toggleDevAuth} 
        className="btn btn-sm btn-danger position-absolute" 
        style={{ top: '-40px', right: '0', fontSize: '10px', whiteSpace: 'nowrap' }}
      >
        DEV: Змінити статус
      </button>

      {/* Кнопка з кубиком тепер має onClick */}
      <button className={styles.iconBtn} onClick={handleRandomClick} title="Випадкова стаття">
        <FaDiceFive size={20} />
      </button>

      {/* ЛОГІКА АВТОРИЗАЦІЇ (без змін) */}
      {!isAuthenticated ? (
        <Link to="/auth">
          <div className={styles.avatarMini}>
            <FaRegUser />
          </div>
        </Link>
      ) : (
        <div className={styles.userWrapper} ref={dropdownRef}>
          <div className={styles.avatarMini} onClick={() => setOpen((prev) => !prev)}>
            <img src={user.avatar} alt={user.name} />
          </div>

          <div className={`${styles.dropdown} ${open ? styles.open : styles.closed}`}>
            <div className={styles.avatar}>
              <img src={user.avatar} alt={user.name} />
            </div>
            <p className={styles.name}>{user.name}</p>
            <button className={styles.btn}>
              Подивитися профіль
            </button>
            <button className={`${styles.btn} ${styles.btnDanger}`} onClick={toggleDevAuth}>
              Вийти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleRightButtons;