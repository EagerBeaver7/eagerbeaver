import React from 'react';
import styles from './page.module.css'
interface TurnProps {
  currentTurn: number;
}

function Turn({ currentTurn }: TurnProps) {

  return (
    <div className={styles.TurnWrap}>
      <button type="button" className={styles.button}>
        3 / 10
      </button>
    </div>
  );
};

export default Turn;
