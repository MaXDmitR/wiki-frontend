import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProfileStore from '@/store/useProfileStore';
import useAuthStore from '@/store/useAuthStore';
import ArticleHeader from '@/components/Common/ArticleHeader/ArticleHeader';
import Footer from '@/components/Common/Footer/Footer';
import styles from './UserProfile.module.scss';
import { FiUser, FiMail, FiShield, FiArrowLeft, FiEdit3, FiFolder, FiCheck, FiX, FiCamera } from 'react-icons/fi';

const UserProfile = () => {
  const { email } = useParams();
  const { profileData, userArticles, isLoading, error, fetchProfileByEmail, updateProfile, clearProfile } = useProfileStore();
  const currentUser = useAuthStore((state) => state.user);

  // Стейти для режиму редагування
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (email) fetchProfileByEmail(email);
    return () => clearProfile();
  }, [email, fetchProfileByEmail, clearProfile]);

  if (isLoading && !isEditing) return <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center`}><h2 className="text-white font-monospace">[ LOADING... ]</h2></div>;
  if (error || !profileData) return <div className={`${styles.pageWrapper} d-flex justify-content-center align-items-center flex-column gap-3`}><h2 className="text-danger font-monospace">[ ERROR ]</h2><Link to="/" className="btn btn-outline-light btn-sm">На головну</Link></div>;

  const isOwnProfile = currentUser?.id === profileData.id;

  const getArticleImage = (content) => {
    if (!content) return "/js.svg";
    const imgBlock = content.find(block => block.type === 'image');
    return imgBlock ? imgBlock.url : "/js.svg";
  };

  // === ЛОГІКА РЕДАГУВАННЯ ===
  const startEditing = () => {
    setEditName(profileData.name);
    setPreviewUrl(profileData.avatar?.url || `https://ui-avatars.com/api/?name=${profileData.name}`);
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Тимчасове прев'ю
    }
  };

  const handleSave = async () => {
    const updatedUser = await updateProfile(email, editName, editFile, profileData.avatar);
    
    if (updatedUser) {
      // Оновлюємо глобальний стор, щоб у хедері теж змінилась аватарка/ім'я!
      useAuthStore.setState({ 
        user: { ...currentUser, name: updatedUser.name, avatar: updatedUser.avatar } 
      });
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <ArticleHeader title={`Профіль: ${profileData.name}`} hasSearch={true} />

      <main className={`container px-4 ${styles.mainGridContainer}`}>
        
        <aside className={styles.leftColumn}>
          <div className={`${styles.profileCard} ${isEditing ? styles.editingMode : ''}`}>
            <div className={styles.cardTerminalHeader}>
              <span>{isEditing ? 'EDIT_MODE_ACTIVE' : 'DEV_CARD v1.0.4'}</span>
              <div className={styles.dots}>
                <span className={styles.dot}></span><span className={styles.dot}></span>
              </div>
            </div>

            <div className={styles.cardBody}>
              
              {/* АВАТАРКА */}
              <div className={styles.avatarSection}>
                <div className={styles.avatarWrapperRelative}>
                  <img 
                    src={isEditing ? previewUrl : (profileData.avatar?.url || `https://ui-avatars.com/api/?name=${profileData.name}&background=00e87a&color=111114`)} 
                    alt={profileData.name} 
                    className={`${styles.profileAvatar} ${isEditing ? styles.avatarEditable : ''}`}
                    onClick={() => isEditing && fileInputRef.current?.click()}
                  />
                  {isEditing && (
                    <div className={styles.avatarOverlay} onClick={() => fileInputRef.current?.click()}>
                      <FiCamera size={24} />
                    </div>
                  )}
                </div>
                <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                
                {!isEditing && (
                  <span className={`${styles.roleBadge} ${profileData.role === 'admin' ? styles.admin : styles.user}`}>
                    <FiShield size={12} /> {profileData.role?.toUpperCase()}
                  </span>
                )}
              </div>

              {/* ІНФОРМАЦІЯ */}
              <div className={styles.infoSection}>
                {isEditing ? (
                  <div className={styles.editInputGroup}>
                    <label>NICKNAME</label>
                    <input 
                      type="text" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)} 
                      className={styles.terminalInput}
                    />
                  </div>
                ) : (
                  <h2 className={styles.username}>
                    <FiUser size={18} className={styles.inputIcon} /> {profileData.name}
                  </h2>
                )}
                
                {(isOwnProfile || profileData.email) && (
                  <div className={styles.infoRow}>
                    <FiMail className={styles.icon} />
                    <div><label>EMAIL_ADDRESS</label><p>{profileData.email}</p></div>
                  </div>
                )}

                

                {/* КНОПКИ ДІЙ */}
                {isOwnProfile && !isEditing && (
                  <button className={styles.editBtn} onClick={startEditing}>
                    <FiEdit3 size={12} /> EDIT_PROFILE
                  </button>
                )}

                {isEditing && (
                  <div className={styles.actionButtons}>
                    <button className={styles.saveBtn} onClick={handleSave} disabled={isLoading}>
                      {isLoading ? 'SAVING...' : <><FiCheck /> SAVE_CHANGES</>}
                    </button>
                    <button className={styles.cancelBtn} onClick={() => setIsEditing(false)} disabled={isLoading}>
                      <FiX /> CANCEL
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </aside>

        {/* ПРАВА КОЛОНКА ЗІ СТАТТЯМИ (Без змін) */}
        <section className={styles.rightColumn}>
          <div className={styles.contributionsWrapper}>
            <h3 className={styles.sectionTitle}>
              <FiFolder size={16} /> [ CONTRIBUTED_ARTICLES ] ({userArticles.length})
            </h3>
            {/* ... Твій код виводу масиву userArticles залишається таким самим ... */}
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