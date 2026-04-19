import { Link } from "react-router";
import styles from "./Logo.module.scss";

const Logo = ({ size = "md", expand = false }) => {
  return (
    <div className={styles.logoBox}>
      <Link to="/">
        <img className={`${styles.logo} ${styles[size]}`} src="imgs/logo.png" alt="Wiki UA" />
        {expand && <span className={`${styles.label} ${styles[size]}`}>Wikipédia</span>}
      </Link>
    </div>
  );
};

export default Logo;
