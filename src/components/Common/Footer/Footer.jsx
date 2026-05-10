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
            <Link to="https://gzpt.com.ua/catalog/podarunkovi-nabori/dlia-prohramistiv/?srsltid=AfmBOorqC9RmOLVOl208sNM1rTG_wCmRb7JDP_mPcyJ1MpHH2UvgJOFH">Make a donation</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="https://github.com/MaXDmitR/wiki-frontend">About us</Link>
          </li>
          
          <li className={styles.navItem}>
            <Link to="https://t.me/Max_Dmitrenko">Contact us</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
