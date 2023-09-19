'use client';
import React from 'react';
import StartBar from '@/containers/main/startBar';
import WordPage from '@/containers/main/words';
import RankingPage from '@/containers/main/ranking';
import styles from "./page.module.css";

const MainPage = () => {
  return (
  <div className={styles.gridContainer}>
    <div className={styles.leftContent}>
        <WordPage/>
        <RankingPage/>
    </div>
    <div className={styles.rightContent}>
        <StartBar/>
    </div>
  </div>
  );
};

export default MainPage;