import React from 'react';
import styles from './page.module.css'

import Purchase from './Purchase/page';
import PurchaseList from './PurchaseList/page';

const RightSideBar = () => {
  return (
    <div className={styles.RightSideBar}>
      <div>
        <Purchase/>
      </div>
      <div>
        <PurchaseList/>
      </div>
    </div>
  );
};

export default RightSideBar;