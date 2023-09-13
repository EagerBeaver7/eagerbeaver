// Section1.tsx
import React from "react";
import styles from "./page.module.css";

const Section3: React.FC = () => (
  <div className={`${styles.bg} ${styles.section3} ${styles.background3}`}>
    <div >
      <div className={`${styles.centerText3} `}>
        게임 설명
      </div>
      <div className={`${styles.centerText4} `}>
        옆으로 넘기면서 게임 방법을 알아보세요.
      </div>
      <div className={`${styles.centerText5} `}>
      </div>

    </div>
  </div>
);

export default Section3;