import styles from './ArticleRightSidebar.module.scss';
import { FaDocker, FaJs, FaNodeJs, FaPhp } from 'react-icons/fa';
import { SiDotnet } from 'react-icons/si';

const technologies = [
  { id: 1, icon: <SiDotnet />, name: '.NET', color: '#512BD4' },
  { id: 2, icon: <FaDocker />, name: 'Docker', color: '#2496ED' },
  { id: 3, icon: <FaJs />, name: 'JavaScript', color: '#F7DF1E' },
  { id: 4, icon: <FaPhp />, name: 'PHP', color: '#777BB4' },
  { id: 5, icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
];

const ArticleRelatedTechnologies = () => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Related Technologies</h3>

      <section className={styles.block}>
        <div className={styles.techGroup}>
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className={styles.techItem}
              style={{ backgroundColor: tech.color }}
            >
              <span
                className={styles.techIcon}
                style={{ color: tech.name === 'JavaScript' ? '#000' : '#fff' }}
              >
                {tech.icon}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticleRelatedTechnologies;