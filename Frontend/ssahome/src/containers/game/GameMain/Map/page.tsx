import React from 'react';
import styles from './page.module.css'

const Map = () => {
  return (
    <div className={styles.Map}>
      <div className={styles.wrapper}>
      <div className={styles.cards}>
        <div className={styles.card}>ONE</div>
        <div className={styles.card}>TWO</div>
        <div className={styles.card}>THREE</div>
        <div className={styles.card}>FOUR</div>
        <div className={styles.card}>FIVE</div>
        <div className={styles.card}>SIX</div>
        <div className={styles.card}>SEVEN</div>
        <div className={styles.card}>EIGHT</div>
        <div className={styles.card}>NINE</div>
        <div className={styles.card}>TEN</div>
        <div className={styles.card}>ELEVEN</div>
        <div className={styles.card}>TWELVE</div>
        <div className={styles.card}>THIRTEEN</div>
        <div className={styles.card}>FOURTEEN</div>
        <div className={styles.card}>FIFTEEN</div>
      </div>
      </div>
      <div className={styles.button_location}>
        <button className={styles.btn}>
          넘어가기
        </button>
      </div>
    </div>
  );
};

export default Map;
