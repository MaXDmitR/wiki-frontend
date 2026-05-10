import React, { useState, useEffect } from "react";
import styles from "./EditMediaSidebar.module.scss";
import EditArticleInitialMedia from "./EditArticleInitialMedia";
import EditArticleMedia from "./EditArticleMedia";

const EditMediaSideBar = ({ title, content = [], onChange }) => {
  const [blocks, setBlocks] = useState([]);

  // --- 1. ІНІЦІАЛІЗАЦІЯ ---
  useEffect(() => {
    const mediaOnly = content.filter(
      (block) => block.type === "image" || block.type === "slider"
    );

    const normalized = mediaOnly.map((block) => {
      if (block.type === "slider") {
        return {
          ...block,
          id: block.id || crypto.randomUUID(),
          images: (block.images || []).map((img) => ({
            id: img.id || crypto.randomUUID(),
            url: img.url || img.img,
            label: img.label || img.title || img.description || "",
          })),
        };
      }
      return {
        ...block,
        id: block.id || crypto.randomUUID(),
      };
    });

    // Одразу відсікаємо всі порожні слайдери (щоб не було "дірок" з минулих збережень)
    const withoutEmptySliders = normalized.filter(
      (b) => !(b.type === "slider" && b.images.length === 0)
    );

    // Гарантовано додаємо один порожній слот у самий кінець
    withoutEmptySliders.push({
      id: crypto.randomUUID(),
      type: "slider",
      images: [],
    });

    setBlocks(withoutEmptySliders);
  }, [content]);

  // --- 2. СИНХРОНІЗАЦІЯ НАВЕРХ ---
  useEffect(() => {
    if (onChange && blocks.length > 0) {
      onChange(blocks);
    }
  }, [blocks, onChange]);

  const imageBlocks = blocks.filter((b) => b.type === "image");
  const sliderBlocks = blocks.filter((b) => b.type === "slider");

  // --- 3. ОНОВЛЕННЯ СЛАЙДЕРІВ (Нова логіка) ---
  const handleSliderChange = (sliderId, updatedImages) => {
    setBlocks((prev) => {
      // Крок А: Оновлюємо картинки в конкретному слайдері
      let updated = prev.map((block) =>
        block.id === sliderId ? { ...block, images: updatedImages } : block
      );

      // Крок Б: Жорстко видаляємо ВСІ порожні слайдери (схлопуємо дірки)
      updated = updated.filter(
        (block) => !(block.type === "slider" && block.images.length === 0)
      );

      // Крок В: Завжди додаємо рівно ОДИН порожній слайдер у самий кінець
      updated.push({
        id: crypto.randomUUID(),
        type: "slider",
        images: [],
      });

      return updated;
    });
  };

  const handleImageChange = (imageId, updatedData) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === imageId ? { ...block, ...updatedData } : block
      )
    );
  };

  return (
    <div className={styles.Sidebar}>
      {/* IMAGE BLOCKS */}
      {imageBlocks.length > 0 ? (
        imageBlocks.map((block) => (
          <EditArticleInitialMedia
            key={block.id}
            img={block.url}
            upperLabel={block.description}
            lowerLabel={block.title}
            onChange={(newData) => handleImageChange(block.id, newData)}
          />
        ))
      ) : (
        <h3 className={styles.DefaultTitle}>{title}</h3>
      )}

      {/* SLIDERS */}
      {sliderBlocks.map((slider) => (
        <EditArticleMedia
          key={slider.id}
          slides={slider.images}
          onChange={(updated) => handleSliderChange(slider.id, updated)}
        />
      ))}
    </div>
  );
};

export default EditMediaSideBar;