import React, { useState, useEffect } from "react";
import styles from "./EditMediaSidebar.module.scss";
import EditArticleInitialMedia from "./EditArticleInitialMedia";
import EditArticleMedia from "./EditArticleMedia";

const EditMediaSideBar = ({ title, content = [] }) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const normalized = content.map((block) => {
      if (block.type === "slider") {
        return {
          ...block,
          id: block.id || crypto.randomUUID(),
          images: block.images || [],
        };
      }

      return {
        ...block,
        id: block.id || crypto.randomUUID(),
      };
    });

    setBlocks(normalized);
  }, [content]);

  const imageBlocks = blocks.filter((b) => b.type === "image");
  const sliderBlocks = blocks.filter((b) => b.type === "slider");

  const handleSliderChange = (sliderId, updatedImages) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === sliderId
          ? { ...block, images: updatedImages }
          : block
      )
    );
  };

  const handleAddSlider = () => {
    setBlocks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "slider",
        images: [],
      },
    ]);
  };

  return (
    <div className={styles.Sidebar}>
      {/* IMAGES */}
      {imageBlocks.length > 0 ? (
        imageBlocks.map((block) => (
          <EditArticleInitialMedia
            key={block.id}
            img={block.url}
            upperLabel={block.description}
            lowerLabel={block.title}
          />
        ))
      ) : (
        <h3 className={styles.DefaultTitle}>{title}</h3>
      )}

      {sliderBlocks.map((slider) => {
        const slides = slider.images.map((img) => ({
          id: img.id || crypto.randomUUID(),
          img: img.url || img.img,
          label: img.label || img.title || img.description || title,
        }));

        return (
          <EditArticleMedia
            key={slider.id}
            slides={slides}
            onChange={(updated) =>
              handleSliderChange(slider.id, updated)
            }
          />
        );
      })}

      <button className={styles.AddSlider} onClick={handleAddSlider}><span></span></button>
    </div>
  );
};

export default EditMediaSideBar;