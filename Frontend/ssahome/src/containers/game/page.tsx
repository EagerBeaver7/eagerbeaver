import React from 'react';
import styles from '@/containers/game/page.module.css';
import LeftSideBar from '@/containers/game/LeftSideBar/page';
import GameMain from '@/containers/game/GameMain/page';
import RightSideBar from '@/containers/game/RightSideBar/page';


const Game = () => {
  return (
    <div className={styles.game}>
      <LeftSideBar />
      <GameMain />
      <RightSideBar />
    </div>
  );
};

export default Game;
