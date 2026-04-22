import { FaDiceFive } from "react-icons/fa";
import styles from "./ArticleRightButtons.module.scss"
import { Link } from 'react-router-dom';

const ArticleRightButtons = () => {
  return (
    <div className={`${styles.topNav} d-flex align-items-center gap-3`}>
      <button className={styles.iconBtn}>
        <FaDiceFive size={20} />
      </button>
      <Link to="/auth">
      <div className={styles.avatar}>
        <img src="https://i.pravatar.cc/150?img=47" alt="User Avatar" />
      </div>
      </Link>
    </div>
  );
}

export default ArticleRightButtons;