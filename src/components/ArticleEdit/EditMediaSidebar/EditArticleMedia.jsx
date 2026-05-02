import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./EditArticleMedia.module.scss";
import { createPortal } from "react-dom";

const EditArticleMedia = ({ slides = [], onChange }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [navReady, setNavReady] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const [media, setMedia] = useState(() =>
    slides.map((s) => ({
      id: s.id || crypto.randomUUID(),
      img: s.img,
      label: s.label,
    }))
  );

  useEffect(() => {
    setMedia(
      slides.map((s) => ({
        id: s.id || crypto.randomUUID(),
        img: s.img,
        label: s.label,
      }))
    );
  }, [slides]);

  useEffect(() => {
    setNavReady(true);
  }, []);

  const handleDelete = (id) => {
    const updated = media.filter((item) => item.id !== id);
    setMedia(updated);
    onChange(updated);
  };

  const handleAddMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const updated = [
      ...media,
      {
        id: crypto.randomUUID(),
        img: url,
        label: file.name,
      },
    ];

    setMedia(updated);
    onChange(updated);
  };

  return (
    <>
      {activeImage &&
        createPortal(
          <div
            className={styles.overlay}
            onClick={() => setActiveImage(null)}
          >
            <img className={styles.fullImage} src={activeImage} />
          </div>,
          document.body
        )}

      <div className={styles.wrapper}>
        <h3 className={styles.title}>Media</h3>

        <div className={styles.sliderWrapper}>
          <button
            ref={prevRef}
            className={`${styles.NavBtn} ${styles.prevBtn}`}
          />

          <Swiper
            className={styles.Slider}
            spaceBetween={10}
            slidesPerView={1}
            loop={false}
            modules={[Navigation]}
            navigation={
              navReady
                ? {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }
                : false
            }
            autoHeight
          >
            {media.map((item) => (
              <SwiperSlide key={item.id} className={styles.Slide}>
                <div className={styles.ImageWrapper}>
                  <button
                    className={styles.Delete}
                    onClick={() => handleDelete(item.id)}
                  />

                  <img
                    className={styles.Picture}
                    src={item.img}
                    onClick={() => setActiveImage(item.img)}
                  />
                </div>

                <p className={styles.label}>{item.label}</p>
              </SwiperSlide>
            ))}

            <SwiperSlide className={styles.Slide}>
              <label className={styles.AddSlide}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddMedia}
                />
              </label>
            </SwiperSlide>
          </Swiper>

          <button
            ref={nextRef}
            className={`${styles.NavBtn} ${styles.nextBtn}`}
          />
        </div>
      </div>
    </>
  );
};

export default EditArticleMedia;