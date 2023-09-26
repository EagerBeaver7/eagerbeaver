import React from 'react';
import styles from './page.module.css'

const PurchaseList = () => {
  return (
    <div className={styles.PurchaseList}>
      <div className={styles.wrap}>
        <div className={styles.Contents}>
          <div className={styles.RegionDetail}>
            지역1 상세정보
          </div>
          <div className={styles.ButtonWrap}>

          </div>
        </div>

        <div className={styles.Contents}>
          <div className={styles.RegionDetail}>
            지역2 상세정보
          </div>
          <div className={styles.ButtonWrap}>

          </div>
        </div>

        <div className={styles.Contents}>
          <div className={styles.RegionDetail}>
            지역3 상세정보
          </div>
          <div className={styles.ButtonWrap}>

          </div>
        </div>
      </div>
    </div>
    
  );
};

export default PurchaseList;
