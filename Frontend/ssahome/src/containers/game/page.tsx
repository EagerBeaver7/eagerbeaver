import React from 'react';
import styles from '@/containers/game/page.module.css';
import LeftSideBar from '@/containers/game/LeftSideBar/page';
import RightSideBar from '@/containers/game/RightSideBar/page';

const GamePage = () => {
  return (
    <div className={styles.game}>
      <LeftSideBar />
      <RightSideBar />
    </div>
  );
};

export default GamePage;
