import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import styles from "./page.module.css";

// Import your slide images here
import slide1 from "../../../public/images/word.jpg"; // Update with the actual file path


const Section3 = () => {
  const slideElementList = [slide1, slide1, slide1, slide1, slide1]; // Updated with your slide images
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideTexts = [
    "뉴스를 읽고 집 값을 예측하세요!",
    "지역을 선택하고 집을 매매하세요!",
    "모르는 용어는 검색해보세요!",
    "아이템을 구매해 수익률을 높여보세요!",
    "매매내역으로 게임 내용을 확인해보세요!",
  ];

  const showSlide = (idx: number) => {
    const listLength = slideElementList.length - 1;

    if (idx < 0) {
      setCurrentSlide(listLength);
    } else if (idx > listLength) {
      setCurrentSlide(0);
    } else if (idx <= listLength) {
      setCurrentSlide(idx);
    }
  };

  const onPrev = () => {
    showSlide(currentSlide - 1);
    console.log(currentSlide);
  };

  const onNext = () => {
    showSlide(currentSlide + 1);
    console.log(currentSlide);
  };

  return (
    <div className={`${styles.bg} ${styles.section3} ${styles.background3}`}>
      <div className={styles.textContainer3}>
        <div className={`${styles.centerText3} `}>
          게임 설명
        </div>
        <div className={`${styles.centerText4} `}>
          옆으로 넘기면서 게임 방법을 알아보세요.
        </div>

      </div>

      <div className={styles.slideContainer}>
        <div>
          <div className={`${styles.SlideShowWrap} `}>
            <div></div>
            <div style={{ zIndex: 1 }}>
              <button className={`${styles.bnt} `} onClick={onPrev} > &lt; </button>
            </div>

            <div className={`${styles.SlideWrap} `}>
              <Image
                src={slideElementList[currentSlide]}
                alt="slide"
                width={600}
                height={400}
              ></Image>
            </div >

            <div style={{ zIndex: 1 }}>
              <button className={`${styles.bnt} `} onClick={onNext} > &gt; </button>
            </div>
            <div></div>
          </div>
        </div>

        {/* 현재 슬라이드에 해당하는 텍스트 표시 */}
        <div className={`${styles.slideTexts} `}>
          {slideTexts[currentSlide]}
        </div>

      </div>

    </div>
  );
};

export default Section3;
