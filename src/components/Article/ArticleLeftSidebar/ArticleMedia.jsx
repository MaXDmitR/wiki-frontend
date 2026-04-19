import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./ArticleMedia.module.scss";
import { createPortal } from "react-dom";

const ArticleMedia = ({ slides }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [navReady, setNavReady] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  useEffect(() => {
    setNavReady(true);
  }, []);

  return (
    <>
      {activeImage &&
        createPortal(
          <div className={styles.overlay} onClick={() => setActiveImage(null)}>
            <img
              className={styles.fullImage}
              src={activeImage}
              alt=""
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Media</h3>
        <div className={styles.sliderWrapper}>
          <button ref={prevRef} className={`${styles.NavBtn} ${styles.prevBtn}`}></button>

          <Swiper
            className={styles.Slider}
            spaceBetween={10}
            slidesPerView={1}
            loop
            modules={[Navigation]}
            navigation={
              navReady
                ? {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }
                : false
            }
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            autoHeight
          >
            {slides.map((slide, index) => (
              <SwiperSlide className={styles.Slide} key={index}>
                <img
                  className={styles.Picture}
                  src={slide.img}
                  alt={slide.label}
                  onClick={() => setActiveImage(slide.img)}
                />
                <p className={styles.label}>{slide.label}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          <button ref={nextRef} className={`${styles.NavBtn} ${styles.nextBtn}`}></button>
        </div>
      </div>
    </>
  );
};

export default ArticleMedia;
