'use client'

import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from '@/containers/game/page.module.css';
import GameMain from '@/containers/game/GameMain/page';



const Game = () => {
  const [seedMoney, setSeedMoney]: [number, Dispatch<SetStateAction<number>>] = useState<number>(5000);
  return (
    <div className={styles.game}>
      <GameMain seedMoney={seedMoney} setSeedMoney={setSeedMoney} />
    </div>
  );
};

export default Game;
