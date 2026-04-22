import { FaSearch } from 'react-icons/fa';
import { MdOutlineTranslate } from "react-icons/md";
import { FaDice } from "react-icons/fa";
import styles from './HeroSection.module.scss';


const HeroSection = () => {
  return (

    <section className={`${styles.heroSection} position-relative d-flex flex-column align-items-center justify-content-center`}>
      <div className={`${styles.heroContent} text-center mt-5`}>
        <div className={`${styles.logoBox} mb-3`}>
          <h1 className={styles.wLogo}>W</h1>
        </div>
        <h2 className={styles.mainTitle}>Wikipédia</h2>
        <p className={styles.subtitle}>The Free IT Encyclopedia</p>
      </div>

      {/* Пошук */}
      <div className={`${styles.searchContainer} mt-4 d-flex align-items-center`}>
        <FaSearch className={styles.searchIcon} size={18} />
        <div className={styles.divider}></div>
        <input 
          type="text" 
          className={styles.searchInput} 
          placeholder="Search IT Wikipedia..." 
        />
      </div>

      
      <img src="/globe.png" alt="Wikipedia Globe" className={styles.bgGlobe} />

    </section>
  );
};

export default HeroSection;