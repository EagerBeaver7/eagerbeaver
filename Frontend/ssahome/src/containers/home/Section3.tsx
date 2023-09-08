// Section1.tsx
import React from "react";
import styles from "./page.module.css";

const Section3: React.FC = () => (
  <div className={`${styles.bg} ${styles.section3} ${styles.background3}`}>
    <div >
      <div className={`${styles.centerText3} `}>
        다양한 사회 이슈들이
      </div>
      <div className={`${styles.centerText4} `}>
        부동산 가격에 어떻게 
      </div>
      <div className={`${styles.centerText5} `}>
        영향을 끼치고 있는지
      </div>
    </div>
  </div>
);

export default Section3;