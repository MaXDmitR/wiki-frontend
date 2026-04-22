import { FaSearch } from "react-icons/fa";
import styles from "./ArticleSearch.module.scss";

const ArticleSearch = () => {
  return (
    <div className={`${styles.searchContainer} d-flex align-items-center`}>
      <FaSearch className={styles.searchIcon} size={18} />
      <div className={styles.divider}></div>
      <input type="text" className={styles.searchInput} placeholder="Search IT Wikipedia..." />
    </div>
  );
}

export default ArticleSearch;