// Section4.tsx
import React from "react";
import styles from "./page.module.css";

const Section4: React.FC = () => (
  <div className={`${styles.bg} ${styles.section4} ${styles.background4}`}>
    <div >
      <div className={`${styles.centerText6} `}>
        여러 지역의 집들을 직접 사고 팔며
      </div>
      <div className={`${styles.centerText7} `}>
        내 집 마련의 꿈을 이루어 보세요
      </div>
    </div>
  </div>
);
export default Section4;