import React from 'react';
import styles from './page.module.css'

const Map = () => {
  return (
    <div className={styles.Map}>
      <div className={styles.wrapper}>
        <div className={styles.hex}>
          <div className={styles.hex_inner}>
            <div className={styles.hex_inner_in}>
              <p>HEX 1</p>
            </div>
          </div>
        </div>
        <div className={styles.hex}>
          <div className={styles.hex_inner}>
            <div className={styles.hex_inner_in}>
              <p>HEX 2</p>
            </div>
          </div>
        </div>
        <div className={styles.hex}>
          <div className={styles.hex_inner}>
            <div className={styles.hex_inner_in}>
              <p>HEX 3</p>
            </div>
          </div>
        </div>
        <div className={styles.hex}>
          <div className={styles.hex_inner}>
            <div className={styles.hex_inner_in}>
              <p>HEX 4</p>
            </div>
          </div>
        </div>
        <div className={styles.hex}>
          <div className={styles.hex_inner}>
            <div className={styles.hex_inner_in}>
              <p>HEX 5</p>
            </div>
          </div>
        </div>
        <div className={styles.hex}>
          <div className={styles.hex_inner}>
            <div className={styles.hex_inner_in}>
              <p>HEX 6</p>
            </div>
          </div>
        </div>
        <div className={styles.hex}>
          <div className={styles.hex_inner}>
            <div className={styles.hex_inner_in}>
              <p>HEX 7</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button_location}>
        <button className={styles.button}>
          넘어가기
        </button>
      </div>
    </div>
  );
};

export default Map;
