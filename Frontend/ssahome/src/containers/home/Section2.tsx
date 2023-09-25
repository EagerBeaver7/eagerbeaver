// Section1.tsx
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

import cardimg2 from "../../../public/images/card_img2.png"
import cardimg3 from "../../../public/images/card_img3.png"



const Section2: React.FC = () => (
  <div className={`${styles.bg} ${styles.section2} ${styles.background2}`}>
    <div className={styles.centerText1}>
      <div className={styles.center}>
        어려운 부동산
      </div>
      <div className={styles.center}>
        게임으로 쉽고 재밌게
      </div>
    </div>

    <div className={styles.bottomWrap}>

      <div className={styles.cards}>
        
      </div>

      <div className={styles.cards}>
        <div className={styles.cards_img}>
          <div className={styles.imgWrap}>
            <Image
              src={cardimg2}
              alt="CardImg2"
              width={320}
              height={202}
            />
          </div>
        </div>
        <div className={styles.cards_text}>
          <div className={styles.text_title}>
            부동산 용어
          </div>
          <div className={styles.text_content}>
            생소한 단어들의 의미를 게임 진행 중 자연스럽게 습득할 수 있습니다.
          </div>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.cards_img}>
          <div className={styles.imgWrap}>
            <Image
              src={cardimg3}
              alt="CardImg3"
              width={320}
              height={202}
            />
          </div>
        </div>
        <div className={styles.cards_text}>
          <div className={styles.text_title}>
            실제 뉴스와 가격 정보
          </div>
          <div className={styles.text_content}>
            약 0천만 건의 뉴스 데이터와 아파트 매매 데이터를 바탕으로 제작되었습니다.
          </div>
        </div>
      </div>

      <div className={styles.cards}>
        
      </div>

    </div>
  </div>
);

export default Section2;