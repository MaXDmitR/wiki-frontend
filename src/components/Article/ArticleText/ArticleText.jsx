import React from 'react';
import ArticleBody from './ArticleBody';
import styles from './ArticleText.module.scss';

const data = {
  date: '23/05/21',
  title: 'React.js',
  sections: [
    {
      title: 'React (JavaScript library)',
      paragraphs: [
        'React is a free and open-source front-end JavaScript library for building user interfaces based on components.',
        'It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.',
        'React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js.',
      ],
    },
    {
      title: 'Core Concepts',
      paragraphs: [
        'React code is made of entities called components.',
        'These components are modular and reusable. React uses a virtual DOM to optimize updates.',
        'Instead of manipulating the browser’s DOM directly, it creates a virtual representation in memory, compares it with the previous state, and only updates the changed elements.',
        'Another key feature is the use of JSX, a syntax extension that allows HTML-like markup to be written directly within JavaScript code.',
      ],
    },
    {
      title: 'React Hooks',
      paragraphs: [
        'Introduced in React version 16.8, Hooks are functions that let developers "hook into" React state and lifecycle features from function components.',
        'They allow you to use state and other React features without writing a class.',
        'The most commonly used built-in hooks are useState for managing local state, and useEffect for handling side effects like data fetching, subscriptions, or direct DOM manipulation.',
      ],
    },
  ],
};

const ArticleText = () => {
  return (
    <div className={styles.articleWrapper}>
      <h2 className={styles.title}>{data.title}</h2>
      <h3 className={styles.subTitle}>Details</h3>

      <ArticleBody date={data.date} sections={data.sections} />
    </div>
  );
};

export default ArticleText;