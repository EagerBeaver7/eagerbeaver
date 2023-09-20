import React from 'react';
import styles from './page.module.css'

const Turn = () => {
  return (
    <div className={styles.TurnWrap}>
      <button type="button" className={styles.button}>
        1 / 10
      </button>
    </div>
  );
};

export default Turn;
