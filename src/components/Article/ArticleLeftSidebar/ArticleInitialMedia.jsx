import styles from "./ArticleInitialMedia.module.scss";

const ArticleInitialMedia = ({ title, img, label }) => {
  return (
    <div>
      <h3 className={styles.Title}>{title}</h3>
      <figure>
        <img className={styles.Picture} src={img} alt={label} />
        <figcaption className={styles.Label}>{label}</figcaption>
      </figure>
    </div>
  );
};

export default ArticleInitialMedia;
