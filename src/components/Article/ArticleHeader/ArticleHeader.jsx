import React from "react";
import styles from "./ArticleHeader.module.scss";
import Logo from "../../Logo/Logo";
import { FaDiceFive, FaSearch } from "react-icons/fa";
import ArticleSearch from "./ArticleSearch";
import ArticleRightButtons from "./ArticleRightButtons";

const ArticleHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`container d-flex gap-3 align-items-center justify-content-between`}>
        <Logo size="md" expand />

        <ArticleSearch />

        <ArticleRightButtons />
      </div>
    </header>
  );
};

export default ArticleHeader;
