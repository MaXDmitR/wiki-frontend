import { useState } from "react";
import styles from "./ArticleInitialMedia.module.scss";
// Додали портал для рендеру повнорозмірної картинки
import { createPortal } from "react-dom";

const ArticleInitialMedia = ({ img, upperLabel, lowerLabel }) => {
  // НОВЕ: Стейт для активної картинки (URL або null)
  const [activeImage, setActiveImage] = useState(null);

  return (
    <>
      {/* ПОРТАЛ: Якщо картинка активна, малюємо overlay в кінці body */}
      {activeImage &&
        createPortal(
          // Закриваємо меню при кліку на overlay (фон)
          <div className={styles.overlay} onClick={() => setActiveImage(null)}>
            <img
              className={styles.fullImage}
              src={activeImage}
              alt={lowerLabel || "Full size image"}
              // e.stopPropagation() - щоб клік по картинці не закривав меню
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}

      <div className={styles.container}>
        {upperLabel && <h3 className={styles.Title}>{upperLabel}</h3>}
        <figure className={styles.Figure}>
          <img
            className={styles.Picture}
            src={img}
            alt={lowerLabel || "Article image"}
            // Змінюємо: клік на картинку робить її активною
            onClick={() => setActiveImage(img)}
            // Можна додати pointer, щоб користувач бачив, що клік можливий
            style={{ cursor: "pointer" }}
          />
          {lowerLabel && (
            <figcaption className={styles.Label}>{lowerLabel}</figcaption>
          )}
        </figure>
      </div>
    </>
  );
};

export default ArticleInitialMedia;