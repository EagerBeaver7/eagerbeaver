'use client'

import React, { useState } from 'react';
import styles from '@/containers/game/page.module.css';
import LeftSideBar from '@/containers/game/LeftSideBar/page';
import GameMain from '@/containers/game/GameMain/page';



const Game = () => {
  const [seedMoney, setSeedMoney] = useState(9999999);
  return (
    <div className={styles.game}>
      <LeftSideBar seedMoney={seedMoney} setSeedMoney={setSeedMoney}/>
      <GameMain seedMoney={seedMoney} setSeedMoney={setSeedMoney} />
    </div>
  );
};

export default Game;
