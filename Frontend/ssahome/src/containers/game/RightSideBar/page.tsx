import React from 'react';
import styles from './page.module.css'

import Purchase from './Purchase/page';

// seedMoney 및 setSeedMoney prop을 타입으로 정의
type RightSideBarProps = {
  seedMoney: number;
  setSeedMoney: (value: number) => void;
};

const RightSideBar: React.FC<RightSideBarProps> = ({ seedMoney, setSeedMoney }) => {
  return (
    <div className={styles.RightSideBar}>
      <div>
        <Purchase/>
      </div>
      <div>
      </div>
    </div>
  );
};

export default RightSideBar;