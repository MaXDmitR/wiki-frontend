import styles from './ArticleRightSidebar.module.scss';

const contributors = [
  { id: 1, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { id: 2, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
  { id: 3, avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100' },
  { id: 4, avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100' },
];

const ArticleContributors = () => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Recent Contributors</h3>

      <section className={styles.block}>
        <div className={styles.avatarGroup}>
          {contributors.map((user) => (
            <img
              key={user.id}
              src={user.avatar}
              alt="contributor"
              className={styles.avatar}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticleContributors;