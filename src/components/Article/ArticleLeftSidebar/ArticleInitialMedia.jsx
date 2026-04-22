import styles from "./ArticleInitialMedia.module.scss";

const ArticleInitialMedia = ({ img, upperLabel, lowerLabel }) => {
  return (
    <div className={styles.container}>
      
      {upperLabel && <h3 className={styles.Title}>{upperLabel}</h3>}
      
      <figure className={styles.Figure}>
        <img className={styles.Picture} src={img} alt={lowerLabel || "Article image"} />
        
       
        {lowerLabel && (
          <figcaption className={styles.Label}>{lowerLabel}</figcaption>
        )}
      </figure>
    </div>
  );
};

export default ArticleInitialMedia;