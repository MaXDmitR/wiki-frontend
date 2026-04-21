import { Link } from "react-router";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logoBox}>
          <Link to="/">
            <img className={styles.logo} src="/imgs/logo.png" alt="Wiki UA" />
          </Link>
        </div>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link to="/">Faire un don</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/">A propos</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/">Politique de confidentialité</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/">Nous contacter</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
