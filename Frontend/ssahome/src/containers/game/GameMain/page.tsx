import React from 'react';
import styles from './page.module.css'

import Timer from './Timer/page';
import Turn from './Turn/page';
import Seed from './Seed/page';
import Map from './Map/page';

const GameMain = () => {
  return (
    <div className={styles.GameMain}>
      <div className={styles.GameHeader}>
        <Timer />
        <Turn />
        <Seed />
      </div>
      <div className={styles.GameMap}>
        <Map />
      </div>
    </div>
  );
};

export default GameMain;
