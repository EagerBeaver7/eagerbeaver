import React from 'react';
import styles from "./page.module.css";
import  {Button}  from "@mui/material";


const wordPage = () => {
  return (
    <div>
      <div className={styles.word}>
        <div className={styles.centeredContent}>
            <div style={{ fontSize: '20px' }} >오늘의 단어</div>
            <br></br>
            <div style={{ fontSize: '40px' }} >민석</div>
            <br></br>
            <div style={{ fontSize: '25px', margin: '3%'}} >본명 구민석 1997년 경상북도 포항 출신 연일초 영일중 영일고를 졸업하며 연일의 자랑으로 떠올랐다</div>
        </div>
      </div>
    </div>
  );
};

export default wordPage;