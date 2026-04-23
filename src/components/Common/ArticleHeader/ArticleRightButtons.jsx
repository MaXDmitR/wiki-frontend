import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaDiceFive } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import styles from "./ArticleRightButtons.module.scss";
import useAuthStore from "@/store/useAuthStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const ArticleRightButtons = () => {
  const { isAuthenticated, toggleDevAuth, user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закриваємо меню при кліку поза ним
  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div className={`${styles.topNav} d-flex align-items-center gap-3 position-relative`}>
      
      {/* 🛠 DEV КНОПКА (винесли окремо, щоб не ламала Link) */}
      <button 
        onClick={toggleDevAuth} 
        className="btn btn-sm btn-danger position-absolute" 
        style={{ top: '-40px', right: '0', fontSize: '10px', whiteSpace: 'nowrap' }}
      >
        DEV: Змінити статус
      </button>

      {/* Кнопка з кубиком */}
      <button className={styles.iconBtn}>
        <FaDiceFive size={20} />
      </button>

      {/* ЛОГІКА АВТОРИЗАЦІЇ */}
      {!isAuthenticated ? (
        /* Якщо гість -> ведемо на форму реєстрації/логіна */
        <Link to="/auth">
          <div className={styles.avatarMini}>
            <FaRegUser />
          </div>
        </Link>
      ) : (
        /* Якщо юзер -> показуємо аватар і випадашку */
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