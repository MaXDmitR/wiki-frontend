import { FaDiceFive } from "react-icons/fa";
import styles from "./ArticleRightButtons.module.scss"

const ArticleRightButtons = () => {
  return (
    <div className={`${styles.topNav} d-flex align-items-center gap-3`}>
      <button className={styles.iconBtn}>
        <FaDiceFive size={20} />
      </button>
      <div className={styles.avatar}>
        <img src="https://i.pravatar.cc/150?img=47" alt="User Avatar" />
      </div>
    </div>
  );
}

export default ArticleRightButtons;