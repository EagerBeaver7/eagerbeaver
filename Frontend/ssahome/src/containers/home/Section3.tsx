import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";


import slide1 from "../../../public/images/card_img3.png"; // Update with the actual file path
import slide2 from "../../../public/images/card_img2.png"; // Update with the actual file path




const Section3 = () => {
  const slideElementList = [slide1, slide2, slide1, slide2, slide1]; // Updated with your slide images
  const slideElementList2 = ["slide1", "slide2"]; // Updated with your slide images
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const showBtnSlide = (idx: number) => {
    setCurrentSlide(idx);
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
      <div >
        <div className={`${styles.centerText3} `}>
          게임 설명
        </div>
        <div className={`${styles.centerText4} `}>
          옆으로 넘기면서 게임 방법을 알아보세요.
        </div>
        <div className="PlayUI">
          <div className={`${styles.ButtonWrap} `}>
            <div
              className={`${currentSlide === 0 ? styles.buttonOnclickStyle : styles.buttonStyle
                }`}
              onClick={() => {
                showBtnSlide(0);
              }}
            >
              1번(임시)
            </div>
            <div
              className={`${currentSlide === 1 ? styles.buttonOnclickStyle : styles.buttonStyle
                }`}
              onClick={() => {
                showBtnSlide(1);
              }}
            >
              2번(임시)
            </div>
            <div
              className={`${currentSlide === 2 ? styles.buttonOnclickStyle : styles.buttonStyle
                }`}
              onClick={() => {
                showBtnSlide(2);
              }}
            >
              3번(임시)
            </div>
            <div
              className={`${currentSlide === 3 ? styles.buttonOnclickStyle : styles.buttonStyle
                }`}
              onClick={() => {
                showBtnSlide(3);
              }}
            >
              4번(임시)
            </div>
            <div
              className={`${currentSlide === 4 ? styles.buttonOnclickStyle : styles.buttonStyle
                }`}
              onClick={() => {
                showBtnSlide(4);
              }}
            >
              5번(임시)
            </div>
          </div>
          <div className={`${styles.SlideShowWrap} `}>
            <div></div>
            <div style={{ zIndex: 1 }}>
              <button className={`${styles.bnt} `} onClick={onPrev} > &lt; </button>
            </div>

            <div className={`${styles.SlideWrap} `}>
              <Image
                src={slideElementList[currentSlide]}
                alt="slide"
                width={720}
                height={350}
              ></Image>
            </div >

            <div style={{ zIndex: 1 }}>
              <button className={`${styles.bnt} `} onClick={onNext} > &gt; </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
