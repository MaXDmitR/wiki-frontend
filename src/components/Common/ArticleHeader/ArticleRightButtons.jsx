import { FaDiceFive } from "react-icons/fa";
import styles from "./ArticleRightButtons.module.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { FaRegUser } from "react-icons/fa6";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";


const ArticleRightButtons = () => {
  const { isAuthenticated, toggleDevAuth, user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div className={`${styles.topNav} d-flex align-items-center gap-3`}>
      <button className={styles.iconBtn}>
        <FaDiceFive size={20} />
      </button>

      {!isAuthenticated && (
        <Link to="/auth">
          <div className={styles.avatarMini} onClick={toggleDevAuth}>
            <FaRegUser />
          </div>
        </Link>
      )}

      {isAuthenticated && (
        <div className={styles.userWrapper} ref={dropdownRef}>
          <div className={styles.avatarMini} onClick={() => setOpen((prev) => !prev)} >
            <img src={user.avatar} alt={user.name} />
          </div>

          <div
            className={`${styles.dropdown} ${open ? styles.open : styles.closed}`}
          >
            <div className={styles.avatar}>
              <img src={user.avatar} alt={user.name} />
            </div>

            <p className={styles.name}>{user.name}</p>

            <button className={styles.btn}>
              Подивитися профіль
            </button>

            <button
              className={`${styles.btn} ${styles.btnDanger}`}
              onClick={toggleDevAuth}
            >
              Вийти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleRightButtons;