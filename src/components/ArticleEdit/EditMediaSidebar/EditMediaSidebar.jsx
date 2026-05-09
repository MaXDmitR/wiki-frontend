import React, { useState, useEffect } from "react";
import styles from "./EditMediaSidebar.module.scss";
import EditArticleInitialMedia from "./EditArticleInitialMedia";
import EditArticleMedia from "./EditArticleMedia";

const EditMediaSideBar = ({ title, content = [], onChange }) => {
  const [blocks, setBlocks] = useState([]);

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
            label:
              img.label || img.title || img.description || "",
          })),
        };
      }

      return {
        ...block,
        id: block.id || crypto.randomUUID(),
      };
    });

    const sliders = normalized.filter((b) => b.type === "slider");

    const hasEmpty = sliders.some((s) => s.images.length === 0);

    if (!hasEmpty) {
      normalized.push({
        id: crypto.randomUUID(),
        type: "slider",
        images: [],
      });
    }

    setBlocks(normalized);
  }, [content]);

  useEffect(() => {
    if (onChange && blocks.length > 0) {
      onChange(blocks);
    }
  }, [blocks, onChange]);

  const imageBlocks = blocks.filter((b) => b.type === "image");
  const sliderBlocks = blocks.filter((b) => b.type === "slider");

  const handleSliderChange = (sliderId, updatedImages) => {
    setBlocks((prev) => {
      let updated = prev.map((block) =>
        block.id === sliderId
          ? { ...block, images: updatedImages }
          : block
      );

      const sliders = updated.filter((b) => b.type === "slider");
      const lastSlider = sliders[sliders.length - 1];

      if (lastSlider && lastSlider.images.length > 0) {
        updated.push({
          id: crypto.randomUUID(),
          type: "slider",
          images: [],
        });
      }

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
          onChange={(updated) =>
            handleSliderChange(slider.id, updated)
          }
        />
      ))}
    </div>
  );
};

export default EditMediaSideBar;