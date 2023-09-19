import React from 'react';
import styles from './Session.module.css';

const Session = () => {
  return (
    <div className={styles.session}>
      <button type='button' className={styles.button}>
        로그인
      </button>
    </div>
  );
};

export default Session;