// Section1.tsx
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

import cardImg1 from "/public/images/word4.jpg"
import cardImg2 from "/public/images/home2.jpg"
import cardImg3 from "/public/images/rank1.jpg"



const Section2: React.FC = () => (
  <div className={`${styles.bg} ${styles.section2}}`}>
    <div className={styles.container}>
      
      <div className={styles.textContainer2}>
        <div className={styles.text1}>
          <span className={styles.mark}>어려운 부동산</span>
        </div>
        <div className={styles.text1}>
          <span className={styles.mark}>게임으로 쉽고 재밌게</span>
        </div>
      </div>

      <div className={styles.cardContainer}>

        <div className={styles.card}>
          <div className={styles.cardImg}>
            <Image src={cardImg1} alt="cardImg1" className={styles.cardImg} />
          </div>
          <div className={styles.cardText}>
            <div className={styles.cardTextBold}>부동산 용어</div>
            <div>생소한 단어들의 의미를 게임 진행 중 자연스럽게 습득할 수 있습니다.</div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardImg}>
            <Image src={cardImg2} alt="cardImg2" className={styles.cardImg} />
          </div>
          <div className={styles.cardText}>
            <div className={styles.cardTextBold}>실제 뉴스와 가격 정보</div>
            <div>약 천만 건의 뉴스 데이터와 아파트 매매 데이터를 바탕으로 제작되었습니다.</div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardImg}>
            <Image src={cardImg3} alt="cardImg3" className={styles.cardImg} />
          </div>
          <div className={styles.cardText}>
            <div className={styles.cardTextBold}>랭킹 시스템</div>
            <div>높은 수익률을 달성하여 다른 사용자와 경쟁해보세요.</div>
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default Section2;