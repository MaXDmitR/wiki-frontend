import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProfileStore from '@/store/useProfileStore';
import useAuthStore from '@/store/useAuthStore';
import ArticleHeader from '@/components/Common/ArticleHeader/ArticleHeader';
import Footer from '@/components/Common/Footer/Footer';
import styles from './UserProfile.module.scss';
import { FiUser, FiMail, FiShield, FiArrowLeft, FiEdit3, FiFolder } from 'react-icons/fi';

const UserProfile = () => {
  const { email } = useParams();
  const { profileData, userArticles, isLoading, error, fetchProfileByEmail, clearProfile } = useProfileStore();
  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (email) {
      fetchProfileByEmail(email);
    }
    return () => clearProfile();
  }, [email, fetchProfileByEmail, clearProfile]);

  if (isLoading) {
    return (
      <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}>
        <h2 className="text-white font-monospace">[ LOADING_PROFILE... ]</h2>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center flex-column gap-3`}>
        <h2 className="text-danger font-monospace">[ ERROR: {error || "User not found"} ]</h2>
        <Link to="/" className="btn btn-outline-light btn-sm"><FiArrowLeft /> На головну</Link>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileData.id;

  const getArticleImage = (content) => {
    if (!content) return "/js.svg";
    const imgBlock = content.find(block => block.type === 'image');
    return imgBlock ? imgBlock.url : "/js.svg";
  };

  return (
    <div className={styles.pageWrapper}>
      <ArticleHeader title={`Профіль: ${profileData.name}`} hasSearch={true} />

      {/* Двоколонковий контейнер в нашому стилі */}
      <main className={`container px-4 ${styles.mainGridContainer}`}>
        
        {/* ЛІВА КОЛОНКА: Твоя термінальна картка профілю (а-ля Sidebar) */}
        <aside className={styles.leftColumn}>
          <div className={styles.profileCard}>
            <div className={styles.cardTerminalHeader}>
              <span>DEV_CARD v1.0.4</span>
              <div className={styles.dots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.avatarSection}>
                <img 
                  src={profileData.avatar?.url || `https://ui-avatars.com/api/?name=${profileData.name}&background=00e87a&color=111114`} 
                  alt={profileData.name} 
                  className={styles.profileAvatar}
                />
                <span className={`${styles.roleBadge} ${profileData.role === 'admin' ? styles.admin : styles.user}`}>
                  <FiShield size={12} /> {profileData.role?.toUpperCase()}
                </span>
              </div>

              <div className={styles.infoSection}>
                <h2 className={styles.username}>
                  <FiUser size={18} className={styles.inputIcon} /> {profileData.name}
                </h2>
                
                {(isOwnProfile || profileData.email) && (
                  <div className={styles.infoRow}>
                    <FiMail className={styles.icon} />
                    <div>
                      <label>EMAIL_ADDRESS</label>
                      <p>{profileData.email}</p>
                    </div>
                  </div>
                )}

                
                {isOwnProfile && (
                  <button className={styles.editBtn} onClick={() => alert("Редагування буде доступне в наступному патчі!")}>
                    <FiEdit3 size={12} /> EDIT_LINKS
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* ПРАВА КОЛОНКА: Твої фірмові квадратні статті */}
        <section className={styles.rightColumn}>
          <div className={styles.contributionsWrapper}>
            <h3 className={styles.sectionTitle}>
              <FiFolder size={16} /> [ CONTRIBUTED_ARTICLES ] ({userArticles.length})
            </h3>
            
            {userArticles.length === 0 ? (
              <div className={styles.emptyArticles}>
                // Користувач ще не брав участі в написанні статей.
              </div>
            ) : (
              <div className={styles.articlesGrid}>
                {userArticles.map((article) => (
                  <Link 
                    to={`/article/${article.slug}`} 
                    key={article.id} 
                    className={styles.articleSquareCard}
                  >
                    <div className={styles.squareImageWrapper}>
                      <img 
                        src={getArticleImage(article.content)} 
                        alt={article.title} 
                        className={styles.squareImg}
                      />
                    </div>
                    <div className={styles.squareMeta}>
                      <h4 className={styles.articleTitle} title={article.title}>
                        {article.title}
                      </h4>
                      <span className={styles.articleDate}>
                        {new Date(article.date).toLocaleDateString('uk-UA')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;