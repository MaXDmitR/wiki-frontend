import React from "react";
import styles from "./ArticleLeftSidebar.module.scss";
import ArticleInitialMedia from "./ArticleInitialMedia";
import ArticleMedia from "./ArticleMedia";

const ArticleLeftSidebar = () => {
  const data = {
    title: "React.js",
    img: "imgs/reactJs.png",
    label: "Initial release: 2013",

    mediaData: [
      {
        slides: [
          {
            img: "imgs/reactjs-example.jpg",
            label: "React Component Example",
          },
          {
            img: "imgs/reactjs-example.jpg",
            label: "React Component Example",
          },
          {
            img: "imgs/react-native.jpg",
            label: "React Component Example",
          },
          {
            img: "imgs/react-native.jpg",
            label: "React Component Example",
          },
        ],
      },
      {
        slides: [
          {
            img: "imgs/react-native.jpg",
            label: "React Component Example",
          },
          {
            img: "imgs/reactjs-example.jpg",
            label: "React Component Example",
          },
          {
            img: "imgs/reactjs-example.jpg",
            label: "React Component Example",
          },
          {
            img: "imgs/react-native.jpg",
            label: "React Component Example",
          },
        ],
      },
    ],
  };
  const mediaData = data.mediaData;

  return (
    <div className={styles.Sidebar}>
      <ArticleInitialMedia title={data.title} img={data.img} label={data.label} />

      {mediaData &&
        mediaData.map((slider, index) => <ArticleMedia key={index} slides={slider.slides} />)}
    </div>
  );
};

export default ArticleLeftSidebar;
