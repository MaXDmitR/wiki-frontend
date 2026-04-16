import { Link } from "react-router";
import styles from "./CategoriesCard.module.scss";

const CategoriesCard = ({ icon, nameCategory, path, countArticles }) => {
  return (
    <div className={styles.card}>
      <Link to={path}>
        <div className={styles.info}>
          <div className={styles.iconBox}>
            <img className={styles.icon} src={icon} alt={nameCategory} />
          </div>
          <h3 className={styles.name}>{nameCategory}</h3>
        </div>
        <div className={styles.detail}>
          <p className={styles.count}>{countArticles}</p>
          <span>articles</span>
        </div>
      </Link>
    </div>
  );
};

export default CategoriesCard;
