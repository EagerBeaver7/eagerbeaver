'use client'

import React, { useState } from 'react';
import styles from '@/containers/game/page.module.css';
import GameMain from '@/containers/game/GameMain/page';



const Game = () => {
  const [seedMoney, setSeedMoney] = useState(10000);
  return (
    <div className={styles.game}>
      <GameMain seedMoney={seedMoney} setSeedMoney={setSeedMoney} />
    </div>
  );
};

export default Game;
