"use client"

import React , { useState, useEffect, useContext }from 'react';
import styles from './page.module.css'
import axios from 'axios';

const Map = () => {
  const [turn, setTurn] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('turn') || 1;
    } else {
      
    }
  });

  const handleNextTurn = () => {
    if (Number(turn) < 10) {
      const newTurn = Number(turn) + 1;
      localStorage.setItem('turn', newTurn.toString()); 
      setTurn(newTurn);
    }
    else {
      localStorage.removeItem('turn')
    }
    console.log(turn);
    location.reload();
  };

  useEffect(() =>{
    axios.get('http://localhost:9000/api/word')
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  },)

  return (
    
    <div className={styles.Map}>
      <div className={styles.wrapper}>
      <div className={styles.cards}>
        <div className={styles.card}>속초시</div>
        <div className={styles.card}>음성군</div>
        <div className={styles.card}>순천시</div>
        <div className={styles.card}>광산구</div>
        <div className={styles.card}>제천시</div>
        <div className={styles.card}>노원구</div>
        <div className={styles.card}>영등포구</div>
        <div className={styles.card}>강남구</div>
        <div className={styles.card}>성남분당구</div>
        <div className={styles.card}>의정부시</div>
        <div className={styles.card}>포항남구</div>
        <div className={styles.card}>해운대구</div>
        <div className={styles.card}>연수구</div>
        <div className={styles.card}>거제시</div>
        <div className={styles.card}>파주시</div>
      </div>
      </div>
      <div className={styles.button_location}>
        <button className={styles.btn} onClick={handleNextTurn}>
          넘어가기
        </button>
      </div>
    </div>
  );
};

export default Map;
