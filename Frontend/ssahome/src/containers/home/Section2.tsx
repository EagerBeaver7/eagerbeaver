// Section1.tsx
import React from "react";
import styles from "./page.module.css";

const Section2: React.FC = () => (
  <div className={`${styles.bg} ${styles.section2} ${styles.background2}`}>
    <div >
      <div className={`${styles.centerText1} `}>
        어려운 부동산
      </div>
      <div className={`${styles.centerText2} `}>
        게임으로 쉽고 재밌게
      </div>
    </div>
  </div>
);

export default Section2;